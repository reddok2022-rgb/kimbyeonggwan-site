// tools/rename-episodes.mjs
import { readdirSync, renameSync } from 'fs';
import { join } from 'path';

const EP_DIR = 'src/pages/episodes';

// 파일명에서 회차 번호 추출: 앞자리 숫자, "episode_숫자", "숫자화"
function extractNum(name) {
  // 1) "episode_39_..." 패턴
  let m = name.match(/episode[_-](\d{1,3})/i);
  if (m) return parseInt(m[1], 10);

  // 2) "051_..." 같은 선행 숫자
  m = name.match(/^(\d{1,3})[_-]/);
  if (m) return parseInt(m[1], 10);

  // 3) "51화_..." 같은 한글 화 표기
  m = name.match(/(\d{1,3})\s*화/i);
  if (m) return parseInt(m[1], 10);

  return null;
}

function pad2(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

const files = readdirSync(EP_DIR).filter(f => /\.html?$/i.test(f)).sort();
let renamed = 0, skipped = 0;

for (const f of files) {
  const num = extractNum(f);
  if (!num) { 
    console.log(`- skip(no number): ${f}`);
    skipped++; 
    continue; 
  }
  const target = `episode_${pad2(num)}_inline_light_v3.html`;
  if (f === target) {
    console.log(`= already ok:     ${f}`);
    continue;
  }
  const from = join(EP_DIR, f);
  const to = join(EP_DIR, target);

  // 충돌 방지
  try {
    renameSync(from, to);
    console.log(`✔ renamed:        ${f}  →  ${target}`);
    renamed++;
  } catch (e) {
    console.log(`✗ conflict/err:   ${f}  →  ${target}  (${e.message})`);
    skipped++;
  }
}

console.log(`\nDone. Renamed ${renamed}, skipped ${skipped}.`);
