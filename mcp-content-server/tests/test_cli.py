"""Tests for atlas_cli.py (the review routine's command-line access to the tools).

    cd "Student Atlas/mcp-content-server" && python3 -m unittest discover tests
"""

from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))
sys.path.insert(0, str(HERE))

import alerts as review  # noqa: E402
import atlas_cli  # noqa: E402
import server  # noqa: E402
from test_tools import ScratchFrontend  # noqa: E402


class ParseTests(unittest.TestCase):
    def test_converts_by_annotation_and_reads_files(self):
        with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as f:
            json.dump([{"file": "a", "old_text": 'say "hi"', "new_text": "x"}], f)
        kwargs = atlas_cli.parse_args(server.apply_edits, ["--edits", f"@{f.name}", "--alert_id", "a1"])
        self.assertEqual(kwargs["edits"][0]["old_text"], 'say "hi"')
        self.assertEqual(kwargs["alert_id"], "a1")
        self.assertEqual(atlas_cli.parse_args(server.get_alert, ["--alert_id", "x", "--context_lines", "3"])["context_lines"], 3)
        self.assertIs(atlas_cli.parse_args(server.validate_content, ["--full_build", "true"])["full_build"], True)

    def test_rejects_unknown_and_missing(self):
        with self.assertRaises(SystemExit):
            atlas_cli.parse_args(server.get_alert, ["--nope", "1"])
        with self.assertRaises(SystemExit):
            atlas_cli.parse_args(server.resolve_alert, ["--alert_id", "x"])
        with self.assertRaises(SystemExit):
            atlas_cli.run(["write_content_file"])  # not exposed

    def test_usage_lists_every_command(self):
        out = atlas_cli.run([])
        for name in atlas_cli.COMMANDS:
            self.assertIn(name, out)


class CliReviewTests(ScratchFrontend):
    def setUp(self):
        self._state = atlas_cli.STATE_FILE
        atlas_cli.STATE_FILE = Path(tempfile.mkdtemp()) / "state.json"
        server._review_edits.clear()
        review.ALERTS_DIR.mkdir(parents=True, exist_ok=True)
        self.aid = "20990101-0000--cli-test"
        alert = {
            "id": self.aid, "kind": "change", "sourceId": "gov.uk/standard-visitor-visa",
            "relatedSourceIds": [], "sourceLabel": "Test", "sourceUrl": "https://example.gov",
            "country": "UK", "category": "visitor", "detectedAt": "2099-01-01T00:00:00.000Z",
            "updatedAt": "2099-01-01T00:00:00.000Z", "oldHash": "a", "newHash": "b",
            "diff": "-x\n+y", "diffTruncated": False, "significance": None,
            "summary": None, "status": "pending", "resolution": None, "resolvedAt": None, "error": None,
        }
        (review.ALERTS_DIR / f"{self.aid}.json").write_text(json.dumps(alert))

    def tearDown(self):
        atlas_cli.STATE_FILE = self._state
        server._review_edits.clear()

    def test_edits_survive_between_processes(self):
        f = "sections/tourist-visa.ts"
        before = self.read(f)
        line = next(l for l in before.splitlines() if 'text: "' in l and "[CITE:" not in l and "\\u" not in l)
        old = line.split('text: "', 1)[1].rsplit('"', 1)[0][:40]
        self.assertEqual(before.count(old), 1, "fixture text must be unique")
        edits = Path(tempfile.mkdtemp()) / "edits.json"
        edits.write_text(json.dumps([{"file": f, "old_text": old, "new_text": old + " (edited)"}]))

        out = atlas_cli.run(["apply_edits", "--edits", f"@{edits}", "--alert_id", self.aid])
        self.assertIn("Applied 1 edit", out)
        self.assertTrue(atlas_cli.STATE_FILE.exists())

        server._review_edits.clear()  # a new process starts empty
        out = atlas_cli.run(["resolve_alert", "--alert_id", self.aid, "--outcome", "approved", "--note", "Fee updated."])
        self.assertIn("1 edit(s) recorded", out)
        saved = json.loads((review.ALERTS_DIR / f"{self.aid}.json").read_text())
        self.assertEqual(saved["status"], "approved")
        self.assertFalse(atlas_cli.STATE_FILE.exists())
        (self.data / f).write_text(before)


if __name__ == "__main__":
    unittest.main()
