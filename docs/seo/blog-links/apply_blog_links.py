#!/usr/bin/env python3
"""Apply the APPROVED rows of blog_link_proposal.json to the live D1 table blog_posts.

SAFE BY DEFAULT: without --apply it only prints what would change. NOT RUN YET: owner approval required.

  python3 apply_blog_links.py                 # dry run: shows every edit
  python3 apply_blog_links.py --apply         # writes: first saves a full backup of the affected rows, then updates

Needs CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID in the environment and `npx wrangler`.
Only rows whose "approved" field is true (edit the JSON) are applied; if no row has that field, nothing is applied.
Rollback: python3 rollback_blog_links.py <backup file printed by --apply>
"""
import json, subprocess, sys, time, re, os
HERE = os.path.dirname(os.path.abspath(__file__))
DB = "markit-media-db"
rows = [r for r in json.load(open(os.path.join(HERE, "blog_link_proposal.json"))) if r.get("approved") is True]
APPLY = "--apply" in sys.argv

def d1(sql):
    r = subprocess.run(["npx", "wrangler", "d1", "execute", DB, "--remote", "--command", sql, "--json"], capture_output=True, text=True, timeout=300)
    t = r.stdout
    return json.loads(t[t.index("["):])[0]["results"]

def q(s): return "'" + s.replace("'", "''") + "'"

if not rows:
    print("No rows marked approved:true in blog_link_proposal.json. Nothing to do.")
    sys.exit(0)
edits = []
for r in rows:
    cur = d1(f"SELECT id, slug, content, updated_at FROM blog_posts WHERE slug = {q(r['post_slug'])}")
    if not cur: print("MISSING post", r["post_slug"]); continue
    row = cur[0]
    if f"/work/{r['target_case_study']}" in row["content"]:
        print("already linked, skip", r["post_slug"]); continue
    paras = list(re.finditer(r"<p[^>]*>.*?</p>", row["content"], re.S))
    i = r["insert_after_paragraph"] - 1
    if i >= len(paras): print("paragraph index out of range, skip", r["post_slug"]); continue
    m = paras[i]
    link = f'<a href="/en/work/{r["target_case_study"]}">{r["anchor_text"]}</a>'
    sentence = r["proposed_sentence"].replace(r["anchor_text"], link, 1)
    new_p = m.group(0)[: -len("</p>")] + " " + sentence + "</p>"
    new_content = row["content"][: m.start()] + new_p + row["content"][m.end():]
    edits.append((row, new_content, r))
    print(("WOULD EDIT " if not APPLY else "EDIT ") + r["post_slug"] + " -> " + r["target_case_study"] + "\n   " + sentence)
if APPLY and edits:
    stamp = time.strftime("%Y%m%d-%H%M%S")
    backup = os.path.join(HERE, f"backup_before_blog_links_{stamp}.json")
    json.dump([{"id": e[0]["id"], "slug": e[0]["slug"], "content": e[0]["content"], "updated_at": e[0]["updated_at"]} for e in edits], open(backup, "w"))
    print("BACKUP written:", backup)
    for row, new_content, r in edits:
        d1(f"UPDATE blog_posts SET content = {q(new_content)}, updated_at = CURRENT_TIMESTAMP WHERE id = {row['id']}")
        print("updated", row["slug"])
    print("Done. To undo: python3 rollback_blog_links.py", backup)
elif not APPLY:
    print("\nDry run only. Re-run with --apply after approval.")
