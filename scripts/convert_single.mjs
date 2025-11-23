// scripts/convert_single.mjs
import fs from "fs";
import path from "path";

/**
 * 사용법
 *   node scripts/convert_single.mjs 47
 *   node scripts/convert_single.mjs 1 --strip
 *
 * 동작
 *   - src/pages/episodes/episode_NN_inline_light_v3.html.bak 읽음
 *   - 동일 내용의 .html 생성
 *   - 표준화된 [NN].astro 생성(01 스타일, 회색 글자 상속 포함)
 *
 * 옵션
 *   --strip : .bak 안의 <body> 밖 제거, <p></p> 정리, 연갈이 표준화 수행
 */

const CWD = process.cwd();
const EP_DIR = path.resolve(CWD, "src/pages/episodes");

function pad2(n){ return String(n).padStart(2,"0"); }

function ensureDir(p){
  if(!fs.existsSync(p)) throw new Error(`경로 없음: ${p}`);
}

function readBak(nn){
  // 여러 후보를 허용(괄호 버전 등)
  const cands = [
    path.join(EP_DIR, `episode_${nn}_inline_light_v3.html.bak`),
    path.join(EP_DIR, `episode_${Number(nn)}_inline_light_v3.html.bak`),
    path.join(EP_DIR, `episode_${nn}_inline_light_v3 (1).html.bak`),
    path.join(EP_DIR, `episode_${Number(nn)}_inline_light_v3 (1).html.bak`),
  ];
  for(const f of cands){
    if(fs.existsSync(f)) return { file:f, text: fs.readFileSync(f,"utf8") };
  }
  throw new Error(`.bak 파일을 찾을 수 없습니다: ${cands.map(p=>path.basename(p)).join(", ")}`);
}

function normalizeRaw(raw){
  // body 태그가 있으면 내부만
  if (/<body[\s\S]*?>/i.test(raw)) {
    raw = raw.replace(/^[\s\S]*?<body[^>]*>/i, "").replace(/<\/body>[\s\S]*$/i, "");
  }
  // 완전 빈 <p> 표준화
  raw = raw.replace(/<p[^>]*>(?:\s|&nbsp;|\u00A0|<br\s*\/?>)*<\/p>/gi, "<p></p>");
  // 빈 줄(엔터 2번) → 연갈이
  raw = raw.replace(/<\/p>\s*\n\s*\n\s*<p/gi, "</p>\n<p></p>\n<p");
  return raw;
}

function makeInlineHtml(inner, nn){
  const head =
    '<!doctype html>\n' +
    '<meta charset="utf-8">\n' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">\n' +
    `<title>가우시안 블러 ${Number(nn)}화</title>\n` +
    '<style>\n' +
    '  .ep-wrap { max-width: 720px; margin: 0 auto; padding: 24px 20px; }\n' +
    '  @media (max-width: 480px) {\n' +
    '    .ep-wrap { font-size: 17px !important; line-height: 1.38 !important; padding: 22px 16px; }\n' +
    '    .ep-wrap p { word-break: keep-all; }\n' +
    '  }\n' +
    '</style>\n' +
    '<div class="ep-wrap" style="font-family:Pretendard,\'Noto Sans KR\',system-ui,-apple-system,\'Segoe UI\',Roboto,Helvetica,Arial,\'Apple SD Gothic Neo\',\'Noto Sans\',\'Malgun Gothic\',sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;background:transparent;">';
  const tail = '\n</div>\n';
  return head + inner + tail;
}

function makeAstro(nn){
  const n = String(Number(nn));
  return `---
import EpisodeLayout from '../../layouts/EpisodeLayout.astro';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const title = '에피소드 ${n}';
const subtitle = '';

let raw = fs.readFileSync(join(__dirname, 'episode_${pad2(n)}_inline_light_v3.html.bak'), 'utf8');

// body 태그가 있으면 내부만 사용
if (/<body[\\s\\S]*?>/i.test(raw)) {
  raw = raw.replace(/^[\\s\\S]*?<body[^>]*>/i, '').replace(/<\\/body>[\\s\\S]*$/i, '');
}

// 완전 빈 <p> 표준화 + 연갈이
raw = raw.replace(/<p[^>]*>(?:\\s|&nbsp;|\\u00A0|<br\\s*\\/?>)*<\\/p>/gi, '<p></p>');
raw = raw.replace(/<\\/p>\\s*\\n\\s*\\n\\s*<p/gi, '<\\/p>\\n<p></p>\\n<p');

const html = \`<div class="ep-raw">\${raw}</div>\`;
---

<EpisodeLayout {title} {subtitle}>
  <style is:global>
    /* 기본 회색 글자 + 인라인 스타일 무력화 */
    .ep-raw { color:#EEE; }
    .ep-raw [style*="color"], .ep-raw font[color], .ep-raw [color] { color: inherit !important; }
    .ep-raw [style*="font-size"], .ep-raw font[size] { font-size: inherit !important; }
  </style>
  <div set:html={html} />
</EpisodeLayout>
`;
}

function main(){
  const numArg = process.argv[2];
  const doStrip = process.argv.includes("--strip");
  if(!numArg || !/^\d+$/.test(numArg)){
    console.error("사용법: node scripts/convert_single.mjs <번호> [--strip]");
    process.exit(1);
  }

  ensureDir(EP_DIR);
  const NN = pad2(Number(numArg));
  const { file: bakPath, text: bakText } = readBak(NN);

  // .html 생성 (그대로 or 정리 후)
  const inner = doStrip ? normalizeRaw(bakText) : bakText;
  const inlineHtml = makeInlineHtml(inner, NN);
  const htmlOut = path.join(EP_DIR, `episode_${NN}_inline_light_v3.html`);
  fs.writeFileSync(htmlOut, inlineHtml, "utf8");

  // .astro 생성
  const astroOut = path.join(EP_DIR, `${Number(NN)}.astro`);
  fs.writeFileSync(astroOut, makeAstro(NN), "utf8");

  console.log(`✅ 생성 완료
  - .bak : ${path.basename(bakPath)}
  - .html: ${path.basename(htmlOut)}
  - .astro: ${path.basename(astroOut)}${doStrip ? "  (정규화 포함)" : ""}`);
}

main();
