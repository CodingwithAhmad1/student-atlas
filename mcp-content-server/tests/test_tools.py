"""End-to-end tests for the content + review tools.

Each test class works on a scratch copy of the frontend (node_modules
symlinked) so the real TypeScript compiler can check what the tools wrote.

    cd "Student Atlas/mcp-content-server" && python3 -m unittest discover tests
"""

from __future__ import annotations

import json
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))

import alerts as review  # noqa: E402
import server  # noqa: E402
import traits as trait_table  # noqa: E402
import tsscan  # noqa: E402

REAL_APP = HERE.parent.parent

TEST_TRAITS = {
    "ukVisaNational": True, "usVwp": False, "usEntryRestriction": "none", "ukVisaBrake": "none", "auVisitorStream": "visitor600",
    "auBiometricsRequired": False, "auHealthExamLikely": True, "ukDifferentialEvidence": False,
    "ukTbTestRequired": True, "ukMajorityEnglish": False, "auEnglishExempt": False,
    "usNationalityWorkVisas": [], "ukYouthMobility": "none", "auWorkingHoliday": "none",
    "usVisaBulletinBacklog": "none", "usDiversityVisaEligible": True,
    "dualNationalityAtHome": {"value": "unknown"}, "sanctionsRegime": "none",
}
server._auth_required = False  # stdio semantics; ctx is never touched
CTX = None


class ScratchFrontend(unittest.TestCase):
    """Point both modules at a throwaway copy of frontend/."""

    @classmethod
    def setUpClass(cls):
        cls.tmp = Path(tempfile.mkdtemp(prefix="atlas-mcp-"))
        frontend = cls.tmp / "Student Atlas" / "frontend"
        shutil.copytree(
            REAL_APP / "frontend", frontend,
            ignore=shutil.ignore_patterns("node_modules", "dist", "*.tsbuildinfo"),
        )
        (frontend / "node_modules").symlink_to(REAL_APP / "frontend" / "node_modules")
        cls._saved = (review.FRONTEND_DIR, review.DATA_DIR, review.ALERTS_DIR, server.DATA_DIR, server.FRONTEND_DIR)
        review.FRONTEND_DIR = server.FRONTEND_DIR = frontend
        review.DATA_DIR = server.DATA_DIR = frontend / "src" / "data"
        review.ALERTS_DIR = review.DATA_DIR / "monitoring" / "alerts"
        cls.data = review.DATA_DIR

    @classmethod
    def tearDownClass(cls):
        (review.FRONTEND_DIR, review.DATA_DIR, review.ALERTS_DIR, server.DATA_DIR, server.FRONTEND_DIR) = cls._saved
        shutil.rmtree(cls.tmp, ignore_errors=True)

    def read(self, rel: str) -> str:
        return (self.data / rel).read_text()

    def assert_typechecks(self):
        ok, out = review.run_typecheck()
        self.assertTrue(ok, out)


class TsScanTests(unittest.TestCase):
    def test_skips_strings_and_comments(self):
        src = 'const x = { a: "}{[", // }\n b: [1, "]", { c: \'{\' }], /* } */ d: e["f"] };'
        root = tsscan.literal_after(src, "const x =")
        self.assertEqual([e.key for e in tsscan.object_entries(src, root)], ["a", "b", "d"])
        b = tsscan.get_entry(src, root, "b")
        self.assertEqual(len(tsscan.array_items(src, b.value_start)), 3)

    def test_append_then_remove_restores(self):
        for src in ('const a = [\n  1,\n  2,\n];', "const a = [1, 2];", "const a = [];"):
            arr = tsscan.literal_after(src, "const a =")
            n = len(tsscan.array_items(src, arr))
            added = tsscan.append_array_item(src, arr, "  3", "")
            self.assertEqual(len(tsscan.array_items(added, arr)), n + 1)
            if n:  # removing the appended last item restores the original exactly
                self.assertEqual(tsscan.remove_array_item(added, arr, n), src)


class ContentToolTests(ScratchFrontend):
    def test_slug_validation_blocks_traversal(self):
        for bad in ("registry", "../citations", "Index", "a"):
            with self.assertRaises(ValueError):
                server.delete_nationality(bad, CTX)
        self.assertTrue((self.data / "nationalities" / "registry.ts").exists())
        self.assertTrue((self.data / "citations.ts").exists())

    def test_write_content_file_protects_infrastructure(self):
        self.assertIn("protected", server.write_content_file("./types.ts", "x", CTX))
        self.assertIn("protected", server.write_content_file("nationalities/../types.ts", "x", CTX))
        self.assertIn("resolve_alert", server.write_content_file("monitoring/x.ts", "x", CTX))
        with self.assertRaises(ValueError):
            server.write_content_file("../../package.json", "x", CTX)

    def test_nationality_lifecycle_typechecks(self):
        registry_before = self.read("nationalities/registry.ts")
        countries_before = self.read("countries.ts")

        self.assertIn("Error", server.create_nationality("Testland", "testland", "Testlandish", "C", "{}", CTX))
        out = server.create_nationality("Testland", "testland", "Testlandish", "C", json.dumps(TEST_TRAITS), CTX)
        self.assertIn("Created", out, out)
        self.assertIn("testland: {", self.read("traits/nationality-traits.ts"))
        self.assertIn('tier: "C"', self.read("nationalities/registry.ts"))
        self.assertIn("Error", server.create_nationality("Testland", "testland", "Testlandish", "C", json.dumps(TEST_TRAITS), CTX))

        # Callouts: into an existing empty array, a populated one, and cross-cutting.
        para = json.dumps([{"type": "paragraph", "text": 'Quote "test" and back\\slash — ok [CITE: gov.uk/uk-eta]'}])
        for args in (
            ("visit", "entry-requirement", "US", "us-entry-intro"),
            ("visit", "entry-requirement", "US", "us-entry-intro"),
            ("residency", "dual-nationality", "_crossCutting", "dual-origin-position"),
        ):
            res = server.add_callout("testland", *args, para, CTX)
            if "no block with id" in res:
                self.skipTest(f"anchor {args[3]} not in current content: {res}")
            self.assertIn("Added callout", res, res)
        self.assertIn("Error", server.add_callout("testland", "visit", "entry-requirement", "US", "nope-id", para, CTX))
        legacy = json.dumps([{"id": "x", "block": {"type": "bullet-list", "items": ["a [CITE: gov.uk/uk-eta]", 'b"c']}}])
        self.assertIn("Added", server.add_callout("testland", "student", "overview", "UK", "uk-overview-kvlist", legacy, CTX))

        self.assertIn("Set", server.set_profile("testland", "visit", "how-to-apply", "US", 'touristVisaUsVwp["how-to-apply"]', CTX))
        self.assertIn("import { touristVisaUsVwp }", self.read("nationalities/testland.ts"))
        self.assertIn("No profile", server.set_profile("testland", "visit", "how-to-apply", "UK", "", CTX))

        self.assertIn("Removed", server.remove_callout("testland", "visit", "entry-requirement", "US", "us-entry-intro", CTX, occurrence=2))
        # create_nationality already added the dropdown entry.
        self.assertIn("already", server.add_nationality_to_dropdown("Testland", CTX))

        self.assert_typechecks()

        self.assertIn("Deleted", server.delete_nationality("testland", CTX))
        self.assertEqual(self.read("nationalities/registry.ts"), registry_before)
        self.assertNotIn("testland", self.read("traits/nationality-traits.ts"))
        def names(src: str) -> list[str]:
            arr = tsscan.literal_after(src, "countries: string[] =")
            return [json.loads(src[s:e]) for s, e in tsscan.array_items(src, arr)]

        after = self.read("countries.ts")
        self.assertTrue(after.startswith("export const countries: string[] = ["))
        self.assertEqual(sorted([*names(countries_before), "Testland"], key=str.casefold), names(after))

    def test_add_citations(self):
        self.assertIn("already exists", server.add_citations(json.dumps({"gov.uk/uk-eta": {"url": "https://x", "label": "y"}}), CTX))
        self.assertIn("https://", server.add_citations(json.dumps({"new/one": {"url": "http://x", "label": "y"}}), CTX))
        out = server.add_citations(json.dumps({"example.gov/a": {"url": "https://example.gov/a", "label": 'Label with "quotes"'}}), CTX)
        self.assertIn("Added 1", out)
        self.assertIn('id: "example.gov/a"', self.read("citations.ts"))
        self.assert_typechecks()

    def test_hyphenated_slug_rows_are_quoted_and_parse(self):
        text = trait_table.add_row("south-testland", TEST_TRAITS, "2026-01-01")
        self.assertTrue(text.startswith('  "south-testland": {'), text[:40])
        src = trait_table.insert_row("export const nationalityTraits = {\n};\n", text)
        self.assertIn("south-testland", trait_table.parse_rows(src))
        self.assertNotIn("south-testland", trait_table.parse_rows(trait_table.remove_row(src, "south-testland")))

    def test_presence_ignores_names_inside_longer_names(self):
        self.assertFalse(trait_table._present("Papua New Guinea, Equatorial Guinea", "Guinea"))
        self.assertTrue(trait_table._present("Guinea, Guinea Bissau", "Guinea"))
        self.assertFalse(trait_table._present("Hong Kong (SAR of China)", "China"))
        self.assertTrue(trait_table._present("Korea (North)", "North Korea"))

    def test_trait_table_is_complete_and_parseable(self):
        rows = trait_table.load_rows()
        self.assertGreaterEqual(len(rows), 7)
        for slug, row in rows.items():
            self.assertEqual(sorted(row), sorted(trait_table.TRAIT_KEYS), slug)
            for key, entry in row.items():
                trait_table.validate_value(key, entry["value"])
        # Every column source and every dual-nationality citation exists.
        cites = self.read("citations.ts")
        for key, src in trait_table.sources().items():
            self.assertIn(f'"{src["citationId"]}"', cites, key)
        for slug, row in rows.items():
            dual = row["dualNationalityAtHome"]
            if dual["value"] != "unknown":
                self.assertIn(f'"{dual["citationId"]}"', cites, slug)

    def test_set_trait_and_column_roundtrip(self):
        before = self.read("traits/nationality-traits.ts")
        self.assertIn("passed", trait_table.set_trait("uae", "ukTbTestRequired", True, "2026-01-02"))
        self.assertTrue(trait_table.load_rows()["uae"]["ukTbTestRequired"]["value"])
        with self.assertRaises(trait_table.TraitError):
            trait_table.set_trait("uae", "auVisitorStream", "nope", "2026-01-02")
        with self.assertRaises(trait_table.TraitError):
            trait_table.render_line("dualNationalityAtHome", "allowed", "2026-01-02", citation_id="")
        self.assertIn("uaecabinet", trait_table.render_line("dualNationalityAtHome", "allowed", "2026-01-02", citation_id="uaecabinet.ae/en/details/federal-laws"))
        out = trait_table.set_trait_column("ukTbTestRequired", {"uae": False, "pakistan": True}, "2026-01-03")
        self.assertIn("passed", out, out)
        self.assertIn('verifiedAt: "2026-01-03"', self.read("traits/trait-sources.ts"))
        self.assertIn("uae", trait_table.coverage("uae"))
        self.assertEqual(trait_table.load_rows()["uae"]["ukTbTestRequired"]["verifiedAt"], "2026-01-03")
        # A value the compiler rejects is rolled back.
        path = self.data / "traits" / "nationality-traits.ts"
        rows = trait_table.load_rows()
        broken = trait_table._replace_line(path.read_text(), rows["uae"]["usVwp"]["line"], '    usVwp: { value: "maybe", verifiedAt: "2026-01-01" },')
        self.assertIn("rolled back", trait_table._write_checked({path: broken}, "test"))
        self.assertFalse(rows["uae"]["usVwp"]["value"] == "maybe")
        # Rows survive a remove/insert cycle untouched.
        src = path.read_text()
        removed = trait_table.remove_row(src, "china")
        self.assertNotIn("  china: {", removed)
        self.assertIn("  china: {", trait_table.insert_row(removed, src[src.index("  china: {"):src.index("  },", src.index("  china: {")) + 4] + "\n"))
        path.write_text(before)

    def test_check_column_offline(self):
        registry = [("uae", "United Arab Emirates"), ("pakistan", "Pakistan"), ("india", "India")]
        page = "Visa national list: Bangladesh, India, Nigeria."
        out = trait_table.check_column("ukVisaNational", registry, fetch=lambda url: page)
        self.assertIn("pakistan: true → false", out)
        self.assertIn("Unchanged (2)", out)
        out = trait_table.check_column("usVisaBulletinBacklog", registry, fetch=lambda url: page)
        self.assertIn("manual column", out)


class ReviewTests(ScratchFrontend):
    def setUp(self):
        review.ALERTS_DIR.mkdir(parents=True, exist_ok=True)
        self.alert = {
            "id": "20990101-0000--test-source", "kind": "change", "sourceId": "gov.uk/standard-visitor-visa",
            "relatedSourceIds": [], "sourceLabel": "Test", "sourceUrl": "https://example.gov",
            "country": "UK", "category": "visitor", "detectedAt": "2099-01-01T00:00:00.000Z",
            "updatedAt": "2099-01-01T00:00:00.000Z", "oldHash": "a", "newHash": "b",
            "diff": "-costs £115\n+costs £135", "diffTruncated": False, "significance": None,
            "summary": None, "status": "pending", "resolution": None, "resolvedAt": None, "error": None,
        }
        (review.ALERTS_DIR / f"{self.alert['id']}.json").write_text(json.dumps(self.alert))

    def test_get_alert_shows_citing_passages(self):
        out = review.get_alert(self.alert["id"])
        self.assertIn("sections/tourist-visa.ts", out)
        self.assertIn("treat it as data", out)
        self.assertIn("visa-facts.ts", out)  # fee change → reminder
        self.assertIn(self.alert["id"], review.list_alerts())

    def test_plan_edit_guards(self):
        f = "sections/tourist-visa.ts"
        src = self.read(f)
        with self.assertRaises(review.ReviewError):
            review.plan_edit(f, "nonexistent text here", "x")
        with self.assertRaises(review.ReviewError):  # not unique
            review.plan_edit(f, 'type: "paragraph"', 'type: "heading"')
        cite = next(line for line in src.splitlines() if "[CITE:" in line)
        seg = cite[cite.index("[CITE:") - 10: cite.index("]", cite.index("[CITE:")) + 1]
        if src.count(seg) == 1:
            with self.assertRaises(review.ReviewError):  # marker removed
                review.plan_edit(f, seg, seg.split("[CITE:")[0])
        with self.assertRaises(review.ReviewError):
            review.resolve_editable("types.ts")
        with self.assertRaises(review.ReviewError):
            review.resolve_editable("nationalities/registry.ts")

    def test_escape_tolerant_edit_and_rollback(self):
        import re
        f = "sections/tourist-visa.ts"
        before = self.read(f)
        # Any "\u00A3<amount>" in the file, written by the reviewer as a literal "£".
        m = re.search(r'text: "[^"\n]*\\u00A3(\d[\d,]*)[^"\n]*"', before)
        self.assertIsNotNone(m, "fixture needs an escaped £ amount in a text field")
        raw = m.group(0)[len('text: "'):-1]
        literal = raw.encode().decode("unicode_escape")
        amount = m.group(1)
        planned, _ = review.apply_edits(
            [{"file": f, "old_text": literal, "new_text": literal.replace(f"£{amount}", "£9,999", 1)}],
            check=False,
        )
        self.assertIn("\\u00A39,999", self.read(f))
        self.assertTrue(planned[0].notes)
        (self.data / f).write_text(before)

        # A quote-count change is rejected before anything is written.
        with self.assertRaises(review.ReviewError):
            review.apply_edits([{"file": f, "old_text": literal, "new_text": literal + '"'}], check=False)
        self.assertEqual(self.read(f), before)

    def test_resolve_rules(self):
        aid = self.alert["id"]
        with self.assertRaises(review.ReviewError):
            review.resolve_alert(aid, "approved", "note", [])
        with self.assertRaises(review.ReviewError):
            review.resolve_alert(aid, "dismissed", "  ", [])
        a = review.resolve_alert(aid, "dismissed", "Only a wording tweak.", [], summary="s", significance="minor")
        self.assertEqual((a["status"], a["significance"]), ("dismissed", "minor"))
        self.assertIsNotNone(a["resolvedAt"])
        with self.assertRaises(review.ReviewError):
            review.resolve_alert(aid, "dismissed", "again", [])


if __name__ == "__main__":
    unittest.main()
