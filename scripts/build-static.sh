#!/usr/bin/env bash
# Static build for Netlify. This prototype is a plain client-side app
# (localStorage only), so "building" just means assembling the static publish
# directory — no bundler, no framework runtime.
#
# Everything is written to ./dist-static (gitignored); source files under
# public/ and app/ are never mutated, so running this locally is safe.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

OUT="dist-static"
rm -rf "$OUT"
mkdir -p "$OUT"

# 1. All static assets + the HTML shell (mango/app.js, fonts, icons, og.png,
#    favicon, index.html, ...).
cp -R public/. "$OUT"/

# 2. Ship the stylesheet next to the shell. app/mango.css stays the single
#    source of truth (it's what the local dev stack imports); we copy it in at
#    build time so the two can never drift apart.
cp app/mango.css "$OUT"/mango.css

# 3. Bake the deployed origin into the Open Graph tags so link previews
#    (iMessage, Slack, etc.) resolve /og.png absolutely. Netlify sets $URL to
#    the site's primary address; fall back to a relative path locally.
SITE_URL="${URL:-}"
sed -i.bak "s#__SITE_URL__#${SITE_URL}#g" "$OUT"/index.html
rm -f "$OUT"/index.html.bak

echo "Static site assembled in $OUT/ (SITE_URL='${SITE_URL:-<relative>}')"
