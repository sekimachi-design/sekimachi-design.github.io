#!/usr/bin/env python3
"""既存の作品を消すコマンドや危険な git 操作を止める(exit 2 でブロック)。"""
import json, re, sys

try:
    cmd = json.load(sys.stdin).get("tool_input", {}).get("command", "")
except Exception:
    sys.exit(0)

rules = [
    (r"\brm\s+(-\w*\s+)*\S", "rm による削除は禁止です。削除が必要なら Rie さんに確認してください。"),
    (r"\bgit\s+rm\b", "git rm による削除は禁止です。"),
    (r"git\s+push\b.*(--force|\s-f\b|--force-with-lease)", "force push は禁止です。"),
    (r"git\s+reset\s+--hard", "git reset --hard は禁止です。"),
    (r"git\s+(clean|checkout\s+--|restore\s)", "未コミットの変更を消す操作は禁止です。"),
    (r"\bfind\b.*-delete", "find -delete は禁止です。"),
    (r"(^|[^>])>\s*(index\.html|apps/|manabi-note/|portfolio/)", "既存ファイルへの上書きリダイレクトは禁止です。Edit ツールを使ってください。"),
]
for pat, msg in rules:
    if re.search(pat, cmd):
        print(f"ブロック: {msg}", file=sys.stderr)
        sys.exit(2)
sys.exit(0)
