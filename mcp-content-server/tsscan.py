"""Minimal scanner for the TypeScript object/array literals in the content files.

The content tools edit TS data files in place. Regex alone cannot tell which
`callouts: [` belongs to which country, so these helpers walk the literal
structure — skipping strings and comments — to find exact spans.
"""

from __future__ import annotations

import re
from dataclasses import dataclass

_OPEN = {"{": "}", "[": "]", "(": ")"}
_CLOSE = {"}", "]", ")"}
_KEY_RE = re.compile(r'"((?:[^"\\]|\\.)*)"|\'((?:[^\'\\]|\\.)*)\'|([A-Za-z_$][\w$]*)')


class ScanError(ValueError):
    pass


def _skip_string(src: str, i: int) -> int:
    """`src[i]` is a quote; return the index just past the closing quote."""
    quote = src[i]
    i += 1
    while i < len(src):
        c = src[i]
        if c == "\\":
            i += 2
            continue
        if c == quote:
            return i + 1
        i += 1
    raise ScanError("unterminated string literal")


def _skip_comment(src: str, i: int) -> int:
    """If a comment starts at `i`, return the index past it; else `i`."""
    if src.startswith("//", i):
        end = src.find("\n", i)
        return len(src) if end == -1 else end + 1
    if src.startswith("/*", i):
        end = src.find("*/", i + 2)
        if end == -1:
            raise ScanError("unterminated block comment")
        return end + 2
    return i


def skip_ws(src: str, i: int) -> int:
    while i < len(src):
        j = _skip_comment(src, i)
        if j != i:
            i = j
        elif src[i].isspace():
            i += 1
        else:
            break
    return i


def find_matching(src: str, open_idx: int) -> int:
    """Index of the bracket closing the one at `open_idx`."""
    if src[open_idx] not in _OPEN:
        raise ScanError(f"expected an opening bracket at {open_idx}")
    stack = [_OPEN[src[open_idx]]]
    i = open_idx + 1
    while i < len(src):
        c = src[i]
        if c in "\"'`":
            i = _skip_string(src, i)
            continue
        j = _skip_comment(src, i)
        if j != i:
            i = j
            continue
        if c in _OPEN:
            stack.append(_OPEN[c])
        elif c in _CLOSE:
            if c != stack.pop():
                raise ScanError(f"mismatched bracket at {i}")
            if not stack:
                return i
        i += 1
    raise ScanError("unbalanced brackets")


def _value_end(src: str, i: int) -> int:
    """End (exclusive) of the expression starting at `i`, stopping at a
    top-level `,` or the parent's closing bracket."""
    while i < len(src):
        c = src[i]
        if c in "\"'`":
            i = _skip_string(src, i)
            continue
        j = _skip_comment(src, i)
        if j != i:
            i = j
            continue
        if c in _OPEN:
            i = find_matching(src, i) + 1
            continue
        if c == "," or c in _CLOSE:
            return i
        i += 1
    raise ScanError("unterminated value")


@dataclass
class Entry:
    key: str
    key_start: int
    value_start: int
    value_end: int  # exclusive, trailing whitespace trimmed


def object_entries(src: str, open_idx: int) -> list[Entry]:
    """Top-level `key: value` entries of the object literal at `open_idx`."""
    if src[open_idx] != "{":
        raise ScanError(f"expected '{{' at {open_idx}")
    close = find_matching(src, open_idx)
    entries: list[Entry] = []
    i = skip_ws(src, open_idx + 1)
    while i < close:
        m = _KEY_RE.match(src, i)
        if not m:
            raise ScanError(f"unexpected token at {i}: {src[i:i + 20]!r}")
        key = next(g for g in m.groups() if g is not None)
        j = skip_ws(src, m.end())
        if src[j] != ":":
            raise ScanError(f"expected ':' after key {key!r}")
        v_start = skip_ws(src, j + 1)
        v_end = _value_end(src, v_start)
        trimmed = v_end
        while trimmed > v_start and src[trimmed - 1].isspace():
            trimmed -= 1
        entries.append(Entry(key, m.start(), v_start, trimmed))
        i = v_end
        if i < close and src[i] == ",":
            i += 1
        i = skip_ws(src, i)
    return entries


def get_entry(src: str, open_idx: int, key: str) -> Entry | None:
    return next((e for e in object_entries(src, open_idx) if e.key == key), None)


def array_items(src: str, open_idx: int) -> list[tuple[int, int]]:
    """(start, end-exclusive) spans of each top-level item of the array at `open_idx`."""
    if src[open_idx] != "[":
        raise ScanError(f"expected '[' at {open_idx}")
    close = find_matching(src, open_idx)
    items: list[tuple[int, int]] = []
    i = skip_ws(src, open_idx + 1)
    while i < close:
        end = _value_end(src, i)
        trimmed = end
        while trimmed > i and src[trimmed - 1].isspace():
            trimmed -= 1
        items.append((i, trimmed))
        i = end
        if i < close and src[i] == ",":
            i += 1
        i = skip_ws(src, i)
    return items


def remove_array_item(src: str, open_idx: int, idx: int) -> str:
    """`src` with the idx-th top-level item (and its separating comma) removed."""
    items = array_items(src, open_idx)
    start, end = items[idx]
    if idx > 0:
        return src[: items[idx - 1][1]] + src[end:]
    if len(items) > 1:
        return src[:start] + src[items[1][0]:]
    return src[: open_idx + 1] + src[find_matching(src, open_idx):]


def append_array_item(src: str, open_idx: int, item: str, close_indent: str) -> str:
    """`src` with `item` (already indented, no trailing comma) appended to the array."""
    items = array_items(src, open_idx)
    close = find_matching(src, open_idx)
    if not items:
        return src[: open_idx + 1] + f"\n{item},\n{close_indent}" + src[close:]
    last_end = items[-1][1]
    return src[:last_end] + f",\n{item}" + src[last_end:]


def literal_after(src: str, marker: str) -> int:
    """Index of the first `{` or `[` following `marker` (e.g. 'const overlay: NationalityOverlay =')."""
    idx = src.find(marker)
    if idx == -1:
        raise ScanError(f"{marker!r} not found")
    i = skip_ws(src, idx + len(marker))
    if src[i] not in "{[":
        raise ScanError(f"no literal after {marker!r}")
    return i


def line_indent(src: str, idx: int) -> str:
    start = src.rfind("\n", 0, idx) + 1
    line = src[start:idx]
    return line[: len(line) - len(line.lstrip())]
