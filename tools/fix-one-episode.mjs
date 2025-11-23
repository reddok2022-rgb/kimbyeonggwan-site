// tools/fix-one-episode.mjs
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const EP_DIR = 'src/pages/episodes';
const nArg = process.argv[2];
if (!nArg) {
  console.log('사용법: node tools/fix-one-episode.mjs 03');
  process.exit(1);
}
const pad2 = n => (n < 10 ? `0${n}` : `${n}`);
const num = String(nArg).padStart(2,'0');

const bakName = `episode_${num}_inline_light_v3.html.bak`;
const htmlName = `episode_${num}_inline_light_v3.html`;
const astroName = `${num}.astro`;

const P_RE = /<p([^>]*)>([\s\S]*?)<\/p>/gi;

function isBlank(text){
  const t = text.replace(/&nbsp;|<br\s*\/?>/gi,'').replace(/\s+/g,'').trim();
  return t.length === 0;
}
const isFoot = s => /^\s*\*/.test(s);
const cleanFoot = s => s.replace(/^\s*\*\s*/, '').trim();

// 휴리스틱 보조 분리
const SHORT_LINE = 4;
const looksLabel = s => /^[:：]\s*$/.test(s) || /^[A-Z]{2,}[\w-]*\.?$/.test(s.trim());
const isVeryShort = s => s.trim().length <= SHORT_LINE;
const isParenBoundary = s => /^\s*[([]/.test(s) || /[)\]]\s*$/.test(s);
const endsSentenceKo = s => /(다\.?$|까\?$|요\.?$|니다\.?$)/.test(s.trim());

function splitByBlankOrHeuristic(bakHtml){
  // 1) .bak에서 모든 p 라인 뽑기
  const lines = [];
  let m;
  while ((m = P_RE.exec(bakHtml)) !== null) {
    const text = (m[2] || '').trim();
    lines.push(text);
  }
  if (!lines.length) return null;

  // 2) BLANK 우선
  let out = [];
  let buf = [];
  const foots = [];
  const flush = () => { if (buf.length) { out.push(buf); buf = []; } };

  for (const line of lines){
    if (isBlank(line)) { flush(); continue; }
    if (isFoot(line)) { flush(); foots.push(cleanFoot(line)); continue; }
    buf.push(line);
  }
  flush();

  // 3) 빈 줄이 전혀 없어서 한 덩어리이면 → 휴리스틱 분리 시도
  if (out.length <= 1) {
    const body = (out[0] || lines).slice(); // lines를 초기 본문으로
    out = []; buf = [];
    for (let i=0;i<body.length;i++){
      const line = body[i];
      if (isVeryShort(line) || looksLabel(line) || isParenBoundary(line)) {
        if (buf.length) { out.push(buf); buf = []; }
        out.push([line]); // 독립 연
        continue;
      }
      buf.push(line);
      const next = body[i+1] || '';
      const nextLong = next.trim().length >= 14;
      if (endsSentenceKo(line) && nextLong) { out.push(buf); buf = []; }
    }
    if (buf.length) out.push(buf);
    if (out.length === 0) out = [body]; // 안전장치
  }

  // 4) HTML로 변환
  let html = out.map(st => `<p>${st.join('<br>\n')}</p>`).join('\n\n') + '\n';
  if (foots.length) html += `\n<p class="footnote">* ${foots.join(' ')}</p>\n`;
  return html;
}

function main(){
  const bakPath = join(EP_DIR, bakName);
  const bak = readFileSync(bakPath, 'utf8');

  const restoredHtml = splitByBlankOrHeuristic(bak);
  if (!restoredHtml) {
    console.log('복원 실패: bak을 읽을 수 없거나 비어 있습니다.');
    process.exit(1);
  }

  // 1) html 덮어쓰기
  const htmlPath = join(EP_DIR, htmlName);
  writeFileSync(htmlPath, restoredHtml, 'utf8');
  console.log(`✔ wrote: ${htmlName}`);

  // 2) astro 생성/갱신
  const astroPath = join(EP_DIR, astroName);
  const astro =
`---
import EpisodeLayout from '../../layouts/EpisodeLayout.astro';
const title = '에피소드 ${num}';
const subtitle = '';
---
<EpisodeLayout {title} {subtitle}>
  <section class="poem">
${restoredHtml.split('\n').map(l=>'    '+l).join('\n')}
  </section>
</EpisodeLayout>
`;
  writeFileSync(astroPath, astro, 'utf8');
  console.log(`✔ wrote: ${astroName}`);

  // 3) 간단 검증: 생성된 html의 <p> 개수
  const pCount = (restoredHtml.match(/<p(\s|>)/gi) || []).length;
  console.log(`→ paragraph count = ${pCount} (연 수)`);
}

main();
