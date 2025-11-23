// tools/list-baks.mjs
// 사용법: node tools/list-baks.mjs 26-55  (또는 "47,48,55")
// 목적: 지정 구간/목록에 대해 실제 존재하는 .bak 파일 경로를 찾아 보여줌
import { readdirSync } from 'fs';
import { join } from 'path';

const EP_DIR = 'src/pages/episodes';
const arg = process.argv[2] || '';
let targets = [];
if (arg.includes('-')) {
  const [a,b] = arg.split('-').map(x=>parseInt(x,10));
  for (let i=a;i<=b;i++) targets.push(i);
} else {
  targets = arg.split(',').map(x=>parseInt(x,10)).filter(n=>!Number.isNaN(n));
}
if (!targets.length) { console.log('예: node tools/list-baks.mjs 26-55'); process.exit(0); }

const pad2 = n => (n<10?`0${n}`:`${n}`);
const files = readdirSync(EP_DIR);

for (const n of targets) {
  const nn = pad2(n);
  const patterns = [
    new RegExp(`^episode_${nn}.*\\.html\\.bak$`, 'i'),   // 가장 일반
    new RegExp(`^${nn}.*\\.html\\.bak$`, 'i'),           // 혹시 접두사 없이 번호만
  ];
  const hits = files.filter(f => patterns.some(p=>p.test(f)));
  if (hits.length) {
    console.log(`${nn}: ✅ ${hits.join(', ')}`);
  } else {
    console.log(`${nn}: ✗ (no .bak) — 후보 .html: ${files.filter(f=>f.includes(`_${nn}_`)||f.includes(`${nn}`)).filter(f=>f.endsWith('.html')).slice(0,3).join(', ')}`);
  }
}
