// tools/patch-episodes-v2.mjs
// 목적: 지정 회차(26,27,28,29,46~55)를 실제 파일명(한글/공백/(1) 포함)에 맞춰
//       .bak 우선, 없으면 .html에서 본문을 읽어와
//       1) body 안쪽만 추출(없으면 전체)
//       2) 빈 줄(엔터) → <p></p> 로 연갈이 보장
//       3) color/font-size/font-family 인라인 스타일 제거 (가독성 통일)
//       4) 동일 템플릿으로 XX.astro 강제 덮어쓰기

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const EP_DIR = 'src/pages/episodes';
const TARGETS = [26,27,28,29,46,47,48,49,50,51,52,53,54,55];
const pad2 = n => (n < 10 ? `0${n}` : `${n}`);

function pickSource(num) {
  const nn = pad2(num);
  const files = readdirSync(EP_DIR);

  // 1) .bak 우선: episode_XX...html.bak, XX로 시작, _XX_, XX.
  const bakCandidates = files.filter(f =>
    f.endsWith('.html.bak') && (
      new RegExp(`^episode_${nn}.*\\.html\\.bak$`, 'i').test(f) ||
      f.includes(`_${nn}_`) ||
      f.startsWith(nn) ||
      f.includes(`${nn}.`)
    )
  );
  if (bakCandidates.length) {
    return { kind: 'bak', file: bakCandidates.sort()[0] };
  }

  // 2) .html 대체(52~55 등): episode_XX...html, XX로 시작, _XX_, XX.
  const htmlCandidates = files.filter(f =>
    f.endsWith('.html') && (
      new RegExp(`^episode_${nn}.*\\.html$`, 'i').test(f) ||
      f.includes(`_${nn}_`) ||
      f.startsWith(nn) ||
      f.includes(`${nn}.`)
    )
  );
  if (htmlCandidates.length) {
    return { kind: 'html', file: htmlCandidates.sort()[0] };
  }

  return { kind: 'none', file: null };
}

function extractBody(raw) {
  if (/<body[\s\S]*?>/i.test(raw)) {
    raw = raw.replace(/^[\s\S]*?<body[^>]*>/i, '').replace(/<\/body>[\s\S]*$/i, '');
  }
  return raw;
}

function stripStyleColorFont(raw) {
  // style="..." / style='...' 에서 color/font-size/font-family 제거
  raw = raw.replace(/style\s*=\s*"([^"]*)"/gi, (_, css) => {
    const keep = css
      .split(';')
      .map(s => s.trim())
      .filter(Boolean)
      .filter(s => !/^color\s*:|^font-size\s*:|^font-family\s*:/i.test(s))
      .join('; ');
    return keep ? `style="${keep}"` : '';
  });
  raw = raw.replace(/style\s*=\s*'([^']*)'/gi, (_, css) => {
    const keep = css
      .split(';')
      .map(s => s.trim())
      .filter(Boolean)
      .filter(s => !/^color\s*:|^font-size\s*:|^font-family\s*:/i.test(s))
      .join('; ');
    return keep ? `style='${keep}'` : '';
  });
  return raw;
}

function normalizeEmptyP(raw) {
  // 완전 빈 <p> 표준화
  raw = raw.replace(/<p[^>]*>\s*<\/p>/gi, '<p></p>');
  return raw;
}

function applyStanzaFromBlankLines(raw) {
  // .bak 원문의 빈 줄(엔터)을 연갈이로: </p> \n\n <p  →  </p>\n<p></p>\n<p
  raw = raw.replace(/<\/p>\s*\n\s*\n\s*<p/gi, '</p>\n<p></p>\n<p');
  return raw;
}

function toAstroTemplate(num, processedRaw) {
  const nn = pad2(num);
  // 주입형 템플릿 (전 회차 통일)
  return `---
import EpisodeLayout from '../../layouts/EpisodeLayout.astro';

const title = '에피소드 ${nn}';
const subtitle = '';

let raw = ${JSON.stringify(processedRaw)};

// (보호) 남은 완전 빈 <p> 표준화
raw = raw.replace(/<p[^>]*>\\s*<\\/p>/gi, '<p></p>');

const html = \`<div class="ep-raw">\${raw}</div>\`;
---
<EpisodeLayout {title} {subtitle}>
  <div set:html={html} />
</EpisodeLayout>
`;
}

function run() {
  let done = 0, fail = 0;

  for (const n of TARGETS) {
    const nn = pad2(n);
    const pick = pickSource(n);
    if (pick.kind === 'none') {
      console.log(`✗ ${nn}: 소스(.bak/.html) 없음`);
      fail++;
      continue;
    }

    try {
      const srcPath = join(EP_DIR, pick.file);
      let raw = readFileSync(srcPath, 'utf8');

      raw = extractBody(raw);
      raw = normalizeEmptyP(raw);
      raw = applyStanzaFromBlankLines(raw);
      raw = stripStyleColorFont(raw);

      const astro = toAstroTemplate(n, raw);
      writeFileSync(join(EP_DIR, `${nn}.astro`), astro, 'utf8');
      console.log(`✔ ${nn}.astro 갱신 from ${pick.kind.toUpperCase()}: ${pick.file}`);
      done++;
    } catch (e) {
      console.log(`✗ ${nn}: 처리 실패 → ${e.message}`);
      fail++;
    }
  }

  console.log(`\n완료: 갱신 ${done}건, 실패 ${fail}건.`);
}

run();
