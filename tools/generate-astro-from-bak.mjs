// tools/generate-astro-from-bak.mjs
// src/pages/episodes 안의 모든 episode_XX_inline_light_v3.html.bak 을 찾아
// XX.astro 파일을 "원본 .bak 주입 + 빈 줄 → 연갈이" 템플릿으로 생성/덮어쓴다.

import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const EP_DIR = 'src/pages/episodes';
const BAK_RE = /^episode_(\d{1,3})_inline_light_v3\.html\.bak$/i;
const pad2 = n => (n < 10 ? `0${n}` : `${n}`);

const baks = readdirSync(EP_DIR)
  .filter(f => BAK_RE.test(f))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

if (!baks.length) {
  console.log('No .bak files found in', EP_DIR);
  process.exit(0);
}

let created = 0;
for (const bak of baks) {
  const num = Number(bak.match(BAK_RE)[1]);
  const nn = pad2(num);
  const astroPath = join(EP_DIR, `${nn}.astro`);

  const content = `---
import EpisodeLayout from '../../layouts/EpisodeLayout.astro';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// .bak 원본 읽기
let raw = fs.readFileSync(join(__dirname, 'episode_${nn}_inline_light_v3.html.bak'), 'utf8');

// body 태그가 있으면 그 안쪽만 사용
if (/<body[\\s\\S]*?>/i.test(raw)) {
  raw = raw.replace(/^[\\s\\S]*?<body[^>]*>/i, '').replace(/<\\/body>[\\s\\S]*$/i, '');
}

// (안전) 완전 빈 <p>를 표준화
raw = raw.replace(/<p[^>]*>\\s*<\\/p>/gi, '<p></p>');

// ★ 핵심: .bak의 '빈 줄(엔터)'을 연갈이로 변환
raw = raw.replace(/<\\/p>\\s*\\n\\s*\\n\\s*<p/gi, '</p>\\n<p></p>\\n<p');

const html = \`<div class="ep-raw">\${raw}</div>\`;
const title = '에피소드 ${nn}';
const subtitle = '';
---
<EpisodeLayout {title} {subtitle}>
  <div set:html={html} />
</EpisodeLayout>
`;

  writeFileSync(astroPath, content, 'utf8');
  console.log(`✔ generated/updated: ${nn}.astro (from ${bak})`);
  created++;
}

console.log(`\n완료: ${created}개 .astro 생성/갱신. 브라우저에서 /episodes/01, /episodes/02 ... 확인하세요.`);
