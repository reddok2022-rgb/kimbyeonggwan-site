// tools/check-episodes-consistency.mjs
import { readdirSync, readFileSync } from 'fs';
import { join, extname } from 'path';

const EP_DIR = 'src/pages/episodes';
const ALLOWED = new Set(['p','br','hr','em','strong','span','a','img','h2','h3','blockquote','ul','ol','li', 'small']); // 필요시 확장
const files = readdirSync(EP_DIR)
  .filter(f => ['.html', '.astro'].includes(extname(f).toLowerCase()))
  .sort();

let hasError = false;

function countTag(name, html) {
  const re = new RegExp(`<\\s*${name}(\\s|>|/)`, 'gi');
  return (html.match(re) || []).length;
}

function findWeirdTags(html) {
  // 대충 태그 뽑기: </?tag ...>
  const tags = [...html.matchAll(/<\s*\/?\s*([a-z0-9-:]+)(\s|>|\/)/gi)].map(m => m[1].toLowerCase());
  const freq = {};
  for (const t of tags) {
    if (!ALLOWED.has(t) && !['!doctype'].includes(t)) {
      freq[t] = (freq[t] || 0) + 1;
    }
  }
  return Object.entries(freq).sort((a,b)=>b[1]-a[1]);
}

const results = [];

for (const file of files) {
  const path = join(EP_DIR, file);
  const html = readFileSync(path, 'utf8');

  const problems = [];

  // 1) 문서 전체 태그 금지(아스트로 파일 내부 콘텐츠여야 함)
  for (const tag of ['html','head','body']) {
    if (countTag(tag, html) > 0) problems.push(`contains <${tag}>`);
  }

  // 2) inline style 금지
  if (/\sstyle\s*=\s*["']/i.test(html)) problems.push(`has inline style attributes`);

  // 3) script 금지
  if (countTag('script', html) > 0) problems.push(`contains <script>`);

  // 4) 허용 외 태그 빈도 체크(많이 나오면 경고)
  const weird = findWeirdTags(html);
  const noisy = weird.filter(([tag, n]) => n >= 2); // 2회 이상 쓰이면 경고
  if (noisy.length) problems.push(`unusual tags: ${noisy.map(([t,n])=>`${t}×${n}`).join(', ')}`);

  // 5) v3 문단 여부(최소 한 개 이상 <p>)
  if (countTag('p', html) === 0) problems.push(`no <p> paragraphs found`);

  results.push({ file, problems });
  if (problems.length) hasError = true;
}

// 출력
if (!results.length) {
  console.log(`No episode files found in ${EP_DIR}`);
  process.exit(0);
}

console.log(`Checked ${results.length} files in ${EP_DIR}\n`);
for (const r of results) {
  if (r.problems.length) {
    console.log(`✗ ${r.file}`);
    for (const p of r.problems) console.log(`  - ${p}`);
  } else {
    console.log(`✓ ${r.file}`);
  }
}

if (hasError) {
  console.log(`\nSome files need fixes. Focus on: remove <html>/<head>/<body>, remove inline styles, avoid <script>, keep content in <p> with <br>.`);
  process.exit(1);
} else {
  console.log(`\nAll good. Files look consistent with inline-light v3.`);
}
