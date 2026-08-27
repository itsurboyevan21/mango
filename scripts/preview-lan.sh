#!/usr/bin/env bash
# Build the static site and serve it on the local network so you can open it
# on your phone. Mac and phone must be on the same Wi-Fi.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PORT="${PORT:-8080}"

# Assemble dist-static/ (same output Netlify publishes).
bash scripts/build-static.sh

# Find this machine's LAN IP (macOS: Wi-Fi is usually en0, sometimes en1).
IP="$(ipconfig getifaddr en0 2>/dev/null || true)"
[ -z "$IP" ] && IP="$(ipconfig getifaddr en1 2>/dev/null || true)"
[ -z "$IP" ] && IP="$(route get default 2>/dev/null | awk '/interface:/{print $2}' | xargs -I{} ipconfig getifaddr {} 2>/dev/null || true)"

echo
echo "  Serving dist-static/ on port ${PORT}"
if [ -n "$IP" ]; then
  echo "  On your phone (same Wi-Fi), open:  http://${IP}:${PORT}"
else
  echo "  Could not auto-detect your LAN IP. Find it with:  ipconfig getifaddr en0"
  echo "  Then open:  http://<that-ip>:${PORT}"
fi
echo "  On this Mac:  http://localhost:${PORT}"
echo "  Press Ctrl+C to stop."
echo

# --bind 0.0.0.0 exposes it to the LAN (not just localhost). If macOS prompts
# to "allow incoming network connections" for Python, click Allow.
exec python3 -m http.server "$PORT" --bind 0.0.0.0 --directory dist-static
