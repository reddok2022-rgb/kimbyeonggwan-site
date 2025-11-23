// tools/patch-episodes.mjs
// 대상 회차의 .bak를 읽어 본문 주입형 .astro로 강제 덮어쓰기.
// - 빈 줄(엔터) → 연갈이(<p></p>)로 변환
// - inline style에서 color / font-size / font-family 제거(47~55 이슈 해결)
// - body 없으면 전체 사용(46화 같은 누락 방지)

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const EP_DIR = 'src/pages/episodes';
const TARGETS = [26,27,28,29,46,47,48,49,50,51,52,53,54,55]; // <- 네가 말한 문제 화
const pad2 = n => (n < 10 ? `0${n}` : `${n}`);

function readBak(num) {
  const nn = pad2(num);
  const file = `episode_${nn}_inline_light_v3.html.bak`;
  const path = join(EP_DIR, file);
  try {
    let raw = readFileSync(path, 'utf8');

    // body가 있으면 그 안쪽만, 없으면 전체 사용
    if (/<body[\s\S]*?>/i.test(raw)) {
      raw = raw.replace(/^[\s\S]*?<body[^>]*>/i, '').replace(/<\/body>[\s\S]*$/i, '');
    }

    // (안전) 빈 <p> 표준화
    raw = raw.replace(/<p[^>]*>\s*<\/p>/gi, '<p></p>');

    // ★ 연갈이: 빈 줄(엔터) → <p></p>
    raw = raw.replace(/<\/p>\s*\n\s*\n\s*<p/gi, '</p>\n<p></p>\n<p');

    // ★ 스타일 정리: color / font-size / font-family 제거 (여백 등은 유지)
    //  - "..." 와 '...' 모두 처리
    raw = raw
      .replace(/style\s*=\s*"([^"]*)"/gi, (_, css) => {
        const keep = css
          .split(';')
          .map(s => s.trim())
          .filter(Boolean)
          .filter(s => !/^color\s*:|^font-size\s*:|^font-family\s*:/i.test(s))
          .join('; ');
        return keep ? `style="${keep}"` : '';
      })
      .replace(/style\s*=\s*'([^']*)'/gi, (_, css) => {
        const keep = css
          .split(';')
          .map(s => s.trim())
          .filter(Boolean)
          .filter(s => !/^color\s*:|^font-size\s*:|^font-family\s*:/i.test(s))
          .join('; ');
        return keep ? `style='${keep}'` : '';
      });

    return { ok: true, nn, raw };
  } catch (e) {
    return { ok: false, nn, error: e.message };
  }
}

function astroFor(num, raw) {
  const nn = pad2(num);
  return `---
import EpisodeLayout from '../../layouts/EpisodeLayout.astro';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let raw = ${JSON.stringify(raw)};

// (보호) 혹시 남은 완전 빈 <p>는 표준화
raw = raw.replace(/<p[^>]*>\\s*<\\/p>/gi, '<p></p>');

const html = \`<div class="ep-raw">\${raw}</div>\`;
const title = '에피소드 ${nn}';
const subtitle = '';
---
<EpisodeLayout {title} {subtitle}>
  <div set:html={html} />
</EpisodeLayout>
`;
}

function run() {
  const existing = new Set(readdirSync(EP_DIR));
  let done = 0, fail = 0;

  for (const n of TARGETS) {
    const { ok, nn, raw, error } = readBak(n);
    if (!ok) {
      console.log(`✗ ${nn}: .bak 읽기 실패 → ${error}`);
      fail++; continue;
    }
    const outPath = join(EP_DIR, `${nn}.astro`);
    writeFileSync(outPath, astroFor(n, raw), 'utf8');
    console.log(`✔ ${nn}.astro 갱신 (연갈이·스타일 통일)`);
    done++;
  }
  console.log(`\n완료: ${done}건 갱신, 실패 ${fail}건.`);
}

run();
