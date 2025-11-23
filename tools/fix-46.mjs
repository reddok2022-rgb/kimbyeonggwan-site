// tools/fix-46.mjs
// 46화만 대상: .bak와 .html 중 "내용이 더 긴 쪽"을 자동 선택해 복구.
// - body가 있으면 안쪽만, 없으면 전체 사용
// - 빈 줄(엔터) → <p></p> (연갈이 보장)
// - color/font-size/font-family 인라인 스타일 제거
// - 46.astro 강제 덮어쓰기

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
const EP_DIR = 'src/pages/episodes';

function pickBest46() {
  const files = readdirSync(EP_DIR);
  const cand = files.filter(f =>
    /46/.test(f) && (f.endsWith('.html.bak') || f.endsWith('.html'))
  ).sort();
  if (!cand.length) throw new Error('46 관련 소스를 찾을 수 없음');
  // 둘 다 읽어서 body 추출 전/후 길이 비교
  let best = null, bestLen = -1;
  for (const f of cand) {
    let raw = readFileSync(join(EP_DIR, f), 'utf8');
    const hasBody = /<body[\s\S]*?>/i.test(raw);
    const body = hasBody
      ? raw.replace(/^[\s\S]*?<body[^>]*>/i, '').replace(/<\/body>[\s\S]*$/i, '')
      : raw;
    const len = body.replace(/\s+/g,' ').trim().length;
    if (len > bestLen) { best = { file: f, content: body }; bestLen = len; }
  }
  if (!best || bestLen <= 0) throw new Error('후보는 있으나 내용이 비어 있음');
  return best;
}

function stripStyle(raw) {
  // style="..." / style='...'에서 color/font-size/font-family 제거
  raw = raw.replace(/style\s*=\s*"([^"]*)"/gi, (_, css) => {
    const keep = css.split(';').map(s=>s.trim()).filter(Boolean)
      .filter(s => !/^color\s*:|^font-size\s*:|^font-family\s*:/i.test(s))
      .join('; ');
    return keep ? `style="${keep}"` : '';
  });
  raw = raw.replace(/style\s*=\s*'([^']*)'/gi, (_, css) => {
    const keep = css.split(';').map(s=>s.trim()).filter(Boolean)
      .filter(s => !/^color\s*:|^font-size\s*:|^font-family\s*:/i.test(s))
      .join('; ');
    return keep ? `style='${keep}'` : '';
  });
  return raw;
}

function normalizeEmptyP(raw){
  return raw.replace(/<p[^>]*>\s*<\/p>/gi, '<p></p>');
}

function applyStanzaFromBlankLines(raw){
  // </p> (빈 줄) <p  →  연갈이 마커 삽입
  return raw.replace(/<\/p>\s*\n\s*\n\s*<p/gi, '</p>\n<p></p>\n<p');
}

function main(){
  const { file, content } = pickBest46();
  let raw = content;
  raw = normalizeEmptyP(raw);
  raw = applyStanzaFromBlankLines(raw);
  raw = stripStyle(raw);

  const astro =
`---
import EpisodeLayout from '../../layouts/EpisodeLayout.astro';

const title = '에피소드 46';
const subtitle = '';

let raw = ${JSON.stringify(raw)};
raw = raw.replace(/<p[^>]*>\\s*<\\/p>/gi, '<p></p>');

const html = \`<div class="ep-raw">\${raw}</div>\`;
---
<EpisodeLayout {title} {subtitle}>
  <div set:html={html} />
</EpisodeLayout>
`;

  writeFileSync(join(EP_DIR, '46.astro'), astro, 'utf8');
  console.log(`✔ 46.astro 갱신 (소스: ${file})`);
}
main();
