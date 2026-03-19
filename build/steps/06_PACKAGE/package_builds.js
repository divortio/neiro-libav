import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../../../');

const pkgStr = fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8');
const VERSION = JSON.parse(pkgStr).version;

const distPath = path.resolve(ROOT, `dist/neiro-libav-${VERSION}`);

const variants = fs.readdirSync(distPath).filter(d => fs.statSync(path.join(distPath, d)).isDirectory() && !d.endsWith('.zip'));

for (const v of variants) {
    console.log(`Packaging ${v}.zip...`);
    execSync(`zip -rq ${v}.zip ${v}`, { cwd: distPath });
}
console.log('Packaging complete.');
