#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$(dirname "$(dirname "$DIR")")")"

VERSION=$(node -p "require('$ROOT_DIR/package.json').version")
BASE_DIST_DIR="$ROOT_DIR/dist/neiro-libav-$VERSION"
rm -rf "$BASE_DIST_DIR"
mkdir -p "$BASE_DIST_DIR"

AUDIO_DECODE_DIST="$ROOT_DIR/../audio-decode-libav/dist"

echo "Locating audio-decode outputs at: $AUDIO_DECODE_DIST"

for ENGINE_PATH in "$AUDIO_DECODE_DIST"/*/; do
    if [ ! -d "$ENGINE_PATH" ]; then continue; fi
    ENGINE_NAME=$(basename "$ENGINE_PATH")
    echo "Building Neiro for engine: $ENGINE_NAME"

    VARIANT_DIST="$BASE_DIST_DIR/$ENGINE_NAME"
    mkdir -p "$VARIANT_DIST"

    # Copy Neiro JS source
    cp -a "$ROOT_DIR/src/" "$VARIANT_DIST/src/"

    # Copy the specific audio-decode-libav variant INTO Neiro's src/ directory
    # Because neiro expects it at ../audio-decode-libav/audio-decode.js (from codecs/mp3.js)
    # The relative path is: src/audio-decode-libav/
    mkdir -p "$VARIANT_DIST/src/audio-decode-libav"
    cp -a "$ENGINE_PATH"/* "$VARIANT_DIST/src/audio-decode-libav/"

    cp "$ROOT_DIR/package.json" "$VARIANT_DIST/"
    cp "$ROOT_DIR/README.md" "$VARIANT_DIST/" || true

    # Strip devDependencies from package.json for distribution
    node -e "
        const fs = require('fs');
        let pkg = JSON.parse(fs.readFileSync('$VARIANT_DIST/package.json', 'utf8'));
        delete pkg.devDependencies;
        delete pkg.scripts;
        fs.writeFileSync('$VARIANT_DIST/package.json', JSON.stringify(pkg, null, 2));
    "
done

echo "Successfully built variants inside $BASE_DIST_DIR!"
