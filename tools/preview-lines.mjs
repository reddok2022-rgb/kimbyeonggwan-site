// tools/preview-lines.mjs
// 사용법: node tools/preview-lines.mjs 03  (회차 두 자리)
import { readFileSync } from 'fs';
import { join } from 'path';

const EP_DIR = 'src/pages/episodes';
const num = (process.argv[2] || '').padStart(2, '0');
if (!/^\d{2}$/.test(num)) {
  console.log('사용법: node tools/preview-lines.mjs 03');
  process.exit(1);
}
const htmlPath = join(EP_DIR, `episode_${num}_inline_light_v3.html`);
const s = readFileSync(htmlPath, 'utf8');

// 현재 .html이 <p>…<br>…</p> 한 덩어리라고 가정하고 행 추출
const m = s.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
if (!m) { console.log('본문 <p> 블록을 찾을 수 없습니다.'); process.exit(1); }

const lines = m[1].split(/<br\s*\/?>\s*/i).map(t => t.trim());

console.log(`\n[${num}] 줄 번호 미리보기 (연갈이 후보 판단용)`);
lines.forEach((line, i) => {
  const n = String(i + 1).padStart(3, ' ');
  console.log(`${n}: ${line}`);
});

console.log(`\n총 ${lines.length}줄. 연갈이를 넣고 싶은 줄 **번호들**을 알려줘(예: 2, 6, 13).`);
console.log(`(의미: "해당 줄 **뒤에** 연을 끊는다")`);
