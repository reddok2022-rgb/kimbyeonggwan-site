// tools/make-episode-from-text.mjs
// 사용법 예)
//   node tools/make-episode-from-text.mjs 46 "src/pages/episodes/episode_46.txt"
//
// 동작:
//  - 입력 텍스트(빈 줄 = 연갈이) → 두 가지 산출물 생성
//    1) episode_46_inline_light_v3.html        (연= <p>…<br>…</p>)
//    2) episode_46_inline_light_v3.html.bak    (행= <p>…</p>, 연 사이에 <p>&nbsp;</p>)
//
// 규칙:
//  - 한 줄이 '*'로 시작하면 각주로 인식(맨 끝에 모아 출력)
//  - 공백/탭만 있는 줄은 "빈 줄(연갈이)"로 처리

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const EP_DIR = 'src/pages/episodes';

const epNum = process.argv[2];
const inputPath = process.argv[3];

if (!epNum || !inputPath) {
  console.log('사용법: node tools/make-episode-from-text.mjs <회차숫자> <원고경로>');
  process.exit(1);
}

const pad2 = (n) => (Number(n) < 10 ? `0${Number(n)}` : String(n));

const raw = readFileSync(inputPath, 'utf8');

// 줄 배열 만들기
const lines = raw.replace(/\r\n/g, '\n').split('\n');

// 빈 줄을 기준으로 연(스탠자) 묶기
const stanzas = [];
let buf = [];
const footnotes = [];

function isBlank(s) { return s.replace(/\s+/g, '') === ''; }
function isFootnote(s) { return /^\s*\*/.test(s); }
function cleanFoot(s) { return s.replace(/^\s*\*\s*/, '').trim(); }

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // 각주 라인은 모아두고 연에는 포함하지 않음
  if (isFootnote(line)) {
    if (buf.length) { stanzas.push(buf); buf = []; }
    footnotes.push(cleanFoot(line));
    continue;
  }

  if (isBlank(line)) {
    if (buf.length) { stanzas.push(buf); buf = []; }
  } else {
    buf.push(line.trimEnd()); // 행 끝 공백만 제거
  }
}
if (buf.length) stanzas.push(buf);

// 1) inline_light_v3.html (연 = <p> … <br> … </p>)
let inlineHtml = stanzas
  .map(st => `<p>\n${st.map(l => `  ${l}`).join('<br>\n')}\n</p>`)
  .join('\n\n');

if (footnotes.length) {
  inlineHtml += `\n\n<p class="footnote">* ${footnotes.join(' ')}</p>\n`;
}

// 2) .bak (각 행 = <p style="margin:0 0 .35em 0;"> … </p>, 연 사이 = <p style="margin:0;">&nbsp;</p>)
const head = [
  '<!doctype html>',
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width,initial-scale=1">',
  `<title>${Number(epNum)}화</title>`,
  '<div class="ep-wrap" style="font-family:Pretendard,\'Noto Sans KR\',system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,\'Apple SD Gothic Neo\',\'Noto Sans\',\'Malgun Gothic\',sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;background:transparent;">'
].join('\n');

const tail = '</div>\n';

let bakHtml = head + '\n\n';
stanzas.forEach((st, si) => {
  st.forEach(line => {
    bakHtml += `  <p style="margin:0 0 .35em 0;">${line}</p>\n`;
  });
  if (si !== stanzas.length - 1) {
    bakHtml += `\n  <p style="margin:0;">&nbsp;</p>\n\n`; // 연갈이 표시
  }
});
if (footnotes.length) {
  bakHtml += `\n  <p style="margin:0 0 .35em 0;opacity:.7;font-size:14px;">* ${footnotes.join(' ')}</p>\n`;
}
bakHtml += tail;

// 파일 쓰기
const nn = pad2(epNum);
const INLINE_OUT = join(EP_DIR, `episode_${nn}_inline_light_v3.html`);
const BAK_OUT    = join(EP_DIR, `episode_${nn}_inline_light_v3.html.bak`);

writeFileSync(INLINE_OUT, inlineHtml.trim() + '\n', 'utf8');
writeFileSync(BAK_OUT,    bakHtml, 'utf8');

console.log(`✔ 생성: ${INLINE_OUT}`);
console.log(`✔ 생성: ${BAK_OUT}`);
console.log('완료. (빈 줄 = 연갈이, *로 시작하는 줄 = 각주)');
