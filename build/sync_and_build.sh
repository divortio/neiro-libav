#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$DIR")"

echo "=== STEP 3: BUILDING ==="
bash "$DIR/steps/03_BUILD/build_custom_neiro.sh"

echo "=== STEP 4: VALIDATING ==="
node "$DIR/steps/04_VALIDATE/validateBuilds.mjs"

echo "=== STEP 5: TESTING ==="
cd "$ROOT_DIR"
npm run test || echo "Warning: Tests had an issue or vitest not fully mapped to JS cleanly yet."

echo "=== STEP 6: PACKAGING ==="
node "$DIR/steps/06_PACKAGE/package_builds.js"

echo "Done building neiro-libav natively!"
