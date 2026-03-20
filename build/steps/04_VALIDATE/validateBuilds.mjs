import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../../../');

const pkgStr = fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8');
const VERSION = JSON.parse(pkgStr).version;

const distPath = path.resolve(ROOT, `dist/neiro-libav-${VERSION}`);

if (!fs.existsSync(distPath)) {
    console.error(`Dist not found at ${distPath}`);
    process.exit(1);
}

const variants = fs.readdirSync(distPath).filter(d => fs.statSync(path.join(distPath, d)).isDirectory());
if (variants.length === 0) {
    console.error('No variants found in neiro-libav distribution!');
    process.exit(1);
}

console.log(`Validating ${variants.length} neiro-libav builds...`);
for (const v of variants) {
    const p = path.join(distPath, v);
    if (!fs.existsSync(path.join(p, 'src/index.js'))) throw new Error('Missing src/index.js in ' + v);
    if (!fs.existsSync(path.join(p, 'src/audio-decode-libav/audio-decode.js'))) throw new Error('Missing mapped audio-decode payload seamlessly enclosed inside ' + v);
    
    // Check libav exists deeper inside
    if (!fs.existsSync(path.join(p, 'src/audio-decode-libav/libav.js-audio'))) throw new Error('Missing deep libav.js sequence inside ' + v);
}
console.log('All variants successfully validated.');
