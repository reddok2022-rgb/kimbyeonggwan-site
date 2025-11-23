// scripts/reset_15_29_46.mjs
import fs from 'fs';
import path from 'path';

const EPISODES_DIR = path.resolve('src/pages/episodes');

const targets = [15, 29, 46];
for (const num of targets) {
  const html = path.join(EPISODES_DIR, `${num}.html`);
  const bak = path.join(EPISODES_DIR, `${num}.bak`);
  const astro = path.join(EPISODES_DIR, `${num}.astro`);

  [html, bak, astro].forEach(f => {
    if (fs.existsSync(f)) fs.rmSync(f);
  });

  console.log(`✅ cleared episode ${num}`);
}
