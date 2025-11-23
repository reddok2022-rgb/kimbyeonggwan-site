// tools/restore-and-verify.mjs
// 1) 모든 .bak -> .html 복원 (연/행갈이 반영)
// 2) 실제로 덮였는지 검증: 각 html의 <p> 수, 03화의 앞부분 샘플 출력
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const EP_DIR = 'src/pages/episodes';
const P_RE = /<p([^>]*)>([\s\S]*?)<\/p>/gi;

function mbEm(attrs) {
  if (!attrs) return null;
  const m = /style\s*=\s*("([^"]*)"|'([^']*)')/i.exec(attrs);
  const style = m ? (m[2] || m[3] || '') : '';
  let x = /margin[^:]*:\s*0\s+0\s+([\d.]+)\s*em/i.exec(style);
  if (x) return parseFloat(x[1]);
  x = /margin-bottom\s*:\s*([\d.]+)\s*em/i.exec(style);
  if (x) return parseFloat(x[1]);
  return null;
}
const isBlank = s => s.replace(/&nbsp;|<br\s*\/?>/gi,'').replace(/\s+/g,'').trim().length===0;
const isFoot = s => /^\s*\*/.test(s);
const cleanFoot = s => s.replace(/^\s*\*\s*/,'').trim();

function computeBreakThreshold(valsIn) {
  const vals = [...new Set(valsIn.filter(v=>v!=null&&!Number.isNaN(v)))].sort((a,b)=>a-b);
  if (vals.length >= 2) {
    const lo = vals[Math.floor(vals.length*0.4)];
    const hi = vals[Math.floor(vals.length*0.6)];
    return (lo + hi) / 2;
  }
  return 0.9;
}

function restoreFromBak(bakHtml) {
  const lines = [];
  let m;
  while ((m = P_RE.exec(bakHtml)) !== null) {
    const attrs = m[1] || '';
    const text = (m[2] || '').trim();
    const mb = mbEm(attrs);
    lines.push({ text, mb });
  }
  if (!lines.length) return '';

  const threshold = computeBreakThreshold(lines.map(l=>l.mb));
  let out = '';
  let stanza = [];
  const foots = [];

  const flush = () => {
    if (!stanza.length) return;
    out += `<p>${stanza.join('<br>\n')}</p>\n\n`;
    stanza = [];
  };

  for (const {text, mb} of lines) {
    if (isBlank(text)) { flush(); continue; }
    if (isFoot(text)) { flush(); foots.push(cleanFoot(text)); continue; }
    stanza.push(text);
    if (mb!=null && mb>=threshold) flush();
  }
  flush();
  if (foots.length) out += `<p class="footnote">* ${foots.join(' ')}</p>\n`;
  return out.trim() + '\n';
}

function run() {
  const baks = readdirSync(EP_DIR).filter(f => f.endsWith('.bak')).sort((a,b)=>a.localeCompare(b,'en',{numeric:true}));
  if (!baks.length) { console.log('No .bak files found in', EP_DIR); return; }

  // 1) 변환/덮기
  let changed = 0;
  for (const bak of baks) {
    const bakPath = join(EP_DIR, bak);
    const outPath = join(EP_DIR, bak.replace(/\.bak$/, ''));
    const bakHtml = readFileSync(bakPath, 'utf8');
    const restored = restoreFromBak(bakHtml);
    writeFileSync(outPath, restored);
    changed++;
  }
  console.log(`✔ Restored ${changed} files (.bak → .html)`);

  // 2) 검증: 각 html의 <p> 개수 카운트
  const htmls = readdirSync(EP_DIR).filter(f => f.endsWith('.html')).sort((a,b)=>a.localeCompare(b,'en',{numeric:true}));
  let report = [];
  for (const f of htmls) {
    const s = readFileSync(join(EP_DIR,f), 'utf8');
    const pCount = (s.match(/<p(\s|>)/gi) || []).length;
    report.push({ f, pCount });
  }

  // 3) 03화 샘플 출력
  const target = 'episode_03_inline_light_v3.html';
  const tPath = join(EP_DIR, target);
  if (htmls.includes(target)) {
    const s = readFileSync(tPath, 'utf8');
    const pCount = (s.match(/<p(\s|>)/gi) || []).length;
    const sample = s.split('\n').slice(0, 12).join('\n');
    console.log('\n── Verify: episode_03_inline_light_v3.html');
    console.log(`  <p> count: ${pCount}  (연 수로 사용)`);
    console.log('  preview:\n' + sample + '\n');
  } else {
    console.log('\n(Info) episode_03_inline_light_v3.html not found in directory.');
  }

  // 4) 요약 테이블
  console.log('── Summary (<p> counts per file) ──');
  for (const r of report) {
    console.log(`${r.f.padEnd(36)}  p=${String(r.pCount).padStart(3)}`);
  }
  console.log('※ 파일에서 p가 1이면 연갈이 인식이 안 된 상태일 수 있음.');
}

run();
