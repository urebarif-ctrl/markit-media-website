#!/usr/bin/env python3
"""Restore blog_posts.content and updated_at from a backup written by apply_blog_links.py --apply.
Usage: python3 rollback_blog_links.py backup_before_blog_links_<stamp>.json [--apply]  (dry run without --apply)"""
import json, subprocess, sys
rows = json.load(open(sys.argv[1])); APPLY = "--apply" in sys.argv
def q(s): return "'" + str(s).replace("'", "''") + "'"
for r in rows:
    sql = f"UPDATE blog_posts SET content = {q(r['content'])}, updated_at = {q(r['updated_at'])} WHERE id = {r['id']}"
    print(("RESTORE " if APPLY else "WOULD RESTORE ") + r["slug"])
    if APPLY:
        subprocess.run(["npx", "wrangler", "d1", "execute", "markit-media-db", "--remote", "--command", sql], check=True, capture_output=True)
