// tools/fix-episodes-consistency.mjs
import { readdirSync, readFileSync, writeFileSync, copyFileSync } from 'fs';
import { join, extname } from 'path';

const EP_DIR = 'src/pages/episodes';
const TARGET_EXTS = new Set(['.html', '.astro']);

// 단순 유틸
const read = p => readFileSync(p, 'utf8');
const write = (p, s) => writeFileSync(p, s);
const backup = (p) => copyFileSync(p, p + '.bak');

// body 안쪽만 추출(없으면 전체 사용)
function extractBody(html) {
  const bodyMatch = html.match(/<\s*body[^>]*>([\s\S]*?)<\s*\/\s*body\s*>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

// 태그 제거 도우미
function stripTagWithContent(s, tag) {
  const re = new RegExp(`<\\s*${tag}[^>]*>[\\s\\S]*?<\\s*\\/\\s*${tag}\\s*>`, 'gi');
  return s.replace(re, '');
}
function removeTagOnly(s, tag) {
  const open = new RegExp(`<\\s*${tag}[^>]*>`, 'gi');
  const close = new RegExp(`<\\s*\\/\\s*${tag}\\s*>`, 'gi');
  return s.replace(open, '').replace(close, '');
}

function fixFile(content) {
  let s = content;

  // 0) DOCTYPE 제거
  s = s.replace(/<!doctype[^>]*>/gi, '');

  // 1) body 내부만 사용
  s = extractBody(s);

  // 2) head/style/script 등 제거
  s = stripTagWithContent(s, 'head');
  s = stripTagWithContent(s, 'style');
  s = stripTagWithContent(s, 'script');
  s = removeTagOnly(s, 'html');

  // 3) 메타/타이틀/링크 등 헤더성 태그 제거
  for (const t of ['meta','title','link']) {
    s = removeTagOnly(s, t);
  }

  // 4) inline style 속성 제거
  s = s.replace(/\sstyle\s*=\s*"(?:[^"\\]|\\.)*"/gi, '')
       .replace(/\sstyle\s*=\s*'(?:[^'\\]|\\.)*'/gi, '');

  // 5) 블록 태그를 <p>로 단순화
  const toP = ['div','section','article','header','footer','main'];
  for (const t of toP) {
    const open = new RegExp(`<\\s*${t}[^>]*>`, 'gi');
    const close = new RegExp(`<\\s*\\/\\s*${t}\\s*>`, 'gi');
    s = s.replace(open, '<p>').replace(close, '</p>');
  }

  // 6) heading → <p><strong>…</strong></p>
  for (const t of ['h1','h2','h3']) {
    const re = new RegExp(`<\\s*${t}[^>]*>([\\s\\S]*?)<\\s*\\/\\s*${t}\\s*>`, 'gi');
    s = s.replace(re, (_m, inner) => `<p><strong>${inner.trim()}</strong></p>`);
  }

  // 7) pre는 단락으로 변환(줄바꿈을 <br>로)
  s = s.replace(/<\s*pre[^>]*>([\s\S]*?)<\s*\/\s*pre\s*>/gi, (_m, inner) => {
    const esc = inner.replace(/\r?\n/g, '<br>');
    return `<p>${esc}</p>`;
  });

  // 8) 불필요한 다중 공백 정리
  s = s.replace(/\r/g, '').replace(/\t/g, '  ');

  // 9) <p>가 하나도 없으면 통째로 <p>로 감싸기(줄바꿈은 <br>)
  const hasP = /<\s*p(\s|>)/i.test(s);
  if (!hasP) {
    const trimmed = s.trim();
    const brd = trimmed.replace(/\n{2,}/g, '</p><p>')
                       .replace(/\n/g, '<br>');
    s = `<p>${brd}</p>`;
  }

  // 10) 빈 <p> 정리, 연속 <p></p> 합치기
  s = s.replace(/<p>\s*<\/p>/gi, '');
  s = s.replace(/<\/p>\s*<p>/gi, '</p>\n<p>');

  // 11) 앞뒤 공백 정리
  s = s.trim() + '\n';

  return s;
}

const files = readdirSync(EP_DIR)
  .filter(f => TARGET_EXTS.has(extname(f).toLowerCase()))
  .sort();

if (!files.length) {
  console.log(`No episode files found in ${EP_DIR}`);
  process.exit(0);
}

let changed = 0;
for (const f of files) {
  const path = join(EP_DIR, f);
  const before = read(path);

  const fixed = fixFile(before);
  if (fixed !== before) {
    backup(path);
    write(path, fixed);
    console.log(`✔ Fixed & saved: ${f} (backup: ${f}.bak)`);
    changed++;
  } else {
    console.log(`– Unchanged: ${f}`);
  }
}

console.log(`\nDone. Updated ${changed}/${files.length} files. Now run:`);
console.log(`node tools/check-episodes-consistency.mjs`);
