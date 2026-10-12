#!/bin/bash
# Patches @opennextjs/cloudflare for Next.js 16.4 compatibility
# 1. Add preview-props.json to loadManifest glob
# 2. Add better-sqlite3 to optional dependencies (native addon exclusion)

ADAPTER_DIR="node_modules/@opennextjs/cloudflare/dist/cli/build"

if [ -f "$ADAPTER_DIR/patches/plugins/load-manifest.js" ]; then
  sed -i 's/required-server-files,prefetch-hints}/required-server-files,prefetch-hints,preview-props}/' \
    "$ADAPTER_DIR/patches/plugins/load-manifest.js"
  echo "Patched load-manifest.js: added preview-props.json"
fi

if [ -f "$ADAPTER_DIR/bundle-server.js" ]; then
  sed -i 's/"react-dom\/server.edge",/"react-dom\/server.edge",\n    "better-sqlite3",/' \
    "$ADAPTER_DIR/bundle-server.js"
  echo "Patched bundle-server.js: added better-sqlite3 to optionalDependencies"
fi
