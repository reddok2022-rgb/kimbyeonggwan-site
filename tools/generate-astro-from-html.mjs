// tools/generate-astro-from-html.mjs
// src/pages/episodes 안의 episode_XX_inline_light_v3.html을 읽어
// XX.astro 파일을 자동 생성(레이아웃 + poem 섹션 적용)

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const EP_DIR = 'src/pages/episodes';

function pad2(n){ return n < 10 ? `0${n}` : `${n}`; }

// 대상 HTML 찾기
const htmlFiles = readdirSync(EP_DIR)
  .filter(f => /^episode_(\d{1,3})_inline_light_v3\.html$/i.test(f))
  .sort((a,b)=>a.localeCompare(b,'en',{numeric:true}));

if (!htmlFiles.length) {
  console.log('episode_XX_inline_light_v3.html 파일이 없습니다.');
  process.exit(0);
}

let created = 0, skipped = 0;

for (const f of htmlFiles) {
  const m = f.match(/^episode_(\d{1,3})_inline_light_v3\.html$/i);
  const num = Number(m[1]);
  const astroName = `${pad2(num)}.astro`;
  const astroPath = join(EP_DIR, astroName);

  // 이미 있으면 건너뛰기
  try {
    readFileSync(astroPath, 'utf8');
    console.log(`= skip (exists): ${astroName}`);
    skipped++;
    continue;
  } catch {}

  // HTML 본문 읽기
  const body = readFileSync(join(EP_DIR, f), 'utf8').trim();

  // 에피소드 제목
  const title = `에피소드 ${pad2(num)}`;
  const subtitle = '';

  // Astro 템플릿
  const content =
`---
import EpisodeLayout from '../../layouts/EpisodeLayout.astro';
const title = ${JSON.stringify(title)};
const subtitle = ${JSON.stringify(subtitle)};
---
<EpisodeLayout {title} {subtitle}>
  <section class="poem">
${body.split('\n').map(line=>'    '+line).join('\n')}
  </section>
</EpisodeLayout>
`;

  writeFileSync(astroPath, content, 'utf8');
  console.log(`✔ generated: ${astroName}  (from ${f})`);
  created++;
}

console.log(`\n완료: 생성 ${created}, 스킵 ${skipped}. 이제 /episodes/01, /episodes/02 ... 로 확인하세요.`);
