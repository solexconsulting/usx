#!/bin/sh
# Write runtime env vars into a JS file loaded by the Storybook iframe.
# This allows environment-specific config without rebuilding the image.
cat > /storybook-static/env-config.js <<EOF
window.USX_DJANGO_URL = "${USX_DJANGO_URL:-http://localhost:9090}";
EOF

exec serve /storybook-static -l 6006
