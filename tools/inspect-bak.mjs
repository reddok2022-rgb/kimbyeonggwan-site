// tools/inspect-bak.mjs
import { readFileSync } from 'fs';
import { join } from 'path';

const EP_DIR = 'src/pages/episodes';
const epNum = process.argv[2]?.padStart(2,'0');
if (!epNum) { console.log('사용법: node tools/inspect-bak.mjs 03'); process.exit(1); }

const bak = `episode_${epNum}_inline_light_v3.html.bak`;
const path = join(EP_DIR, bak);
const s = readFileSync(path, 'utf8');

const P_RE = /<p([^>]*)>([\s\S]*?)<\/p>/gi;

function mbEm(attrs=''){
  const m = /style\s*=\s*("([^"]*)"|'([^']*)')/i.exec(attrs);
  const style = m ? (m[2] || m[3] || '') : '';
  let x = /margin[^:]*:\s*0\s+0\s+([\d.]+)\s*em/i.exec(style);
  if (x) return parseFloat(x[1]);
  x = /margin-bottom\s*:\s*([\d.]+)\s*em/i.exec(style);
  if (x) return parseFloat(x[1]);
  return null;
}
function isBlank(text){
  const t = text.replace(/&nbsp;|<br\s*\/?>/gi,'').replace(/\s+/g,'').trim();
  return t.length===0;
}

let i=0, blanks=0;
const margins = new Map();
console.log(`\n[inspect] ${bak}\n`);
let m;
while ((m = P_RE.exec(s)) !== null) {
  i++;
  const attrs = m[1] || '';
  const text = (m[2] || '').trim();
  const mb = mbEm(attrs);
  if (mb!=null) margins.set(mb, (margins.get(mb)||0)+1);
  const blank = isBlank(text);
  if (blank) blanks++;
  if (i<=20) {
    console.log(String(i).padStart(2,'0'),
      `mb=${mb ?? '–'}`,
      blank ? '[BLANK]' : '',
      ' | ',
      (text.replace(/\n/g,' ').slice(0,50) || '(empty)'));
  }
}
console.log(`\n총 <p> 줄수: ${i}`);
console.log(`빈 줄(연 경계 후보): ${blanks}`);
console.log('margin-bottom (em) 분포:', [...margins.entries()].sort((a,b)=>a[0]-b[0]));
