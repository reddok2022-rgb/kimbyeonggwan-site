// tools/restore-from-bak.mjs  — PASS 1: 빈 줄 기반 연갈이만 확실히 복원
// 목적: .bak 안에서 <p>...</p> 중 "내용이 비어있는 줄"을 연 경계로 사용해
//       결과 .html을 "한 연 = <p>...<br>...</p>" 형태로 저장한다.
//       (margin 추정은 없앰. 먼저 확실한 신호=빈 줄만 사용)
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
const EP_DIR = 'src/pages/episodes';
const P_RE = /<p([^>]*)>([\s\S]*?)<\/p>/gi;

function isBlank(text) {
  const t = text
    .replace(/&nbsp;|<br\s*\/?>/gi, '')
    .replace(/\s+/g, '')
    .trim();
  return t.length === 0;
}
function isFootnote(text){ return /^\s*\*/.test(text); }
function cleanFoot(text){ return text.replace(/^\s*\*\s*/, '').trim(); }

function restoreUsingBlank(bakHtml) {
  // .bak에서 모든 <p>를 순서대로 모은다 (줄 단위)
  const lines = [];
  let m;
  while ((m = P_RE.exec(bakHtml)) !== null) {
    const text = (m[2] || '').trim();
    lines.push(text);
  }
  if (!lines.length) return '';

  let out = '';
  let stanza = [];
  const foots = [];

  const flush = () => {
    if (!stanza.length) return;
    out += `<p>${stanza.join('<br>\n')}</p>\n\n`;
    stanza = [];
  };

  for (const text of lines) {
    // 1) 빈 줄은 '연 경계'
    if (isBlank(text)) { flush(); continue; }
    // 2) 각주(*)는 따로 모아 마지막에 출력
    if (isFootnote(text)) { flush(); foots.push(cleanFoot(text)); continue; }
    // 3) 일반 줄은 현재 연에 추가
    stanza.push(text);
  }
  flush();
  if (foots.length) out += `<p class="footnote">* ${foots.join(' ')}</p>\n`;

  return out.trim() + '\n';
}

function run(){
  const baks = readdirSync(EP_DIR).filter(f=>f.endsWith('.bak')).sort((a,b)=>a.localeCompare(b,'en',{numeric:true}));
  if(!baks.length){ console.log('No .bak files in', EP_DIR); return; }

  let changed = 0;
  for(const bak of baks){
    const bakPath = join(EP_DIR, bak);
    const htmlOut = bak.replace(/\.bak$/, '');
    const outPath = join(EP_DIR, htmlOut);
    const bakHtml = readFileSync(bakPath, 'utf8');
    const restored = restoreUsingBlank(bakHtml);
    writeFileSync(outPath, restored);
    console.log(`✔ restored (blank-lines): ${bak} → ${htmlOut}`);
    changed++;
  }
  console.log(`\n✅ Done. Restored ${changed} files using BLANK-LINE stanza rule.`);
  console.log('   이제 VS Code에서 episode_03_inline_light_v3.html 열면 <p>가 여러 개여야 합니다.');
}
run();
