// scripts/reset_47_55.mjs
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const epDir = join(__dirname, "../src/pages/episodes");

// 1화 템플릿(헤더+ep-wrap) — 1화 v3와 동일한 구조로 고정
const epHead = `<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>가우시안 블러 {{NUM}}화</title>
<style>
  .ep-wrap { max-width: 720px; margin: 0 auto; padding: 24px 20px; }
  @media (max-width: 480px) {
    .ep-wrap { font-size: 17px !important; line-height: 1.38 !important; padding: 22px 16px; }
    .ep-wrap p { word-break: keep-all; }
  }
</style>
<div class="ep-wrap" style="font-family:Pretendard,'Noto Sans KR',system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,'Apple SD Gothic Neo','Noto Sans','Malgun Gothic',sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;background:transparent;">
`;
const epTail = `</div>
`;

// 공통 .astro 템플릿 (26화와 동일한 주입 파이프라인)
const astroTpl = (num) => `---
import EpisodeLayout from '../../layouts/EpisodeLayout.astro';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const title = '에피소드 ${num.toString().padStart(2, '0')}';
const subtitle = '';

let bakName = 'episode_${num.toString().padStart(2, '0')}_inline_light_v3.html.bak';
const altName = 'episode_${num.toString().padStart(2, '0')}_inline_light_v3 (1).html.bak';
if (!fs.existsSync(join(__dirname, bakName)) && fs.existsSync(join(__dirname, altName))) {
  bakName = altName;
}
let raw = fs.readFileSync(join(__dirname, bakName), 'utf8');

// body가 있으면 내부만
if (/<body[\\s\\S]*?>/i.test(raw)) {
  raw = raw.replace(/^[\\s\\S]*?<body[^>]*>/i, '').replace(/<\\/body>[\\s\\S]*$/i, '');
}

// 빈 p 표준화 + 연갈이
raw = raw.replace(/<p[^>]*>\\s*<\\/p>/gi, '<p></p>');
raw = raw.replace(/<\\/p>\\s*\\n\\s*\\n\\s*<p/gi, '</p>\\n<p></p>\\n<p');

const html = \`<div class="ep-raw">\${raw}</div>\`;
---

<EpisodeLayout {title} {subtitle}>
  <style>
    .ep-raw p { margin: 0 0 .35em 0; }
    .ep-raw p:empty { margin: 1em 0; }
  </style>
  <div set:html={html} />
</EpisodeLayout>
`;

// 실행
for (let n = 47; n <= 55; n++) {
  const num = n.toString().padStart(2, "0");
  const htmlName = `episode_${num}_inline_light_v3.html`;
  const bakName  = `episode_${num}_inline_light_v3.html.bak`;
  const astroName= `${n}.astro`;

  // 깔끔한 v3 HTML(본문은 비워두고 주석만)
  const htmlBody = `  <!-- TODO: ${n}화 본문을 여기(ep-wrap 내부)에 채워 넣으세요 -->\n`;
  const html = epHead.replace("{{NUM}}", n) + htmlBody + epTail;

  fs.writeFileSync(join(epDir, htmlName), html, "utf8");
  fs.writeFileSync(join(epDir, bakName),  html, "utf8"); // .bak도 동일 저장
  fs.writeFileSync(join(epDir, astroName), astroTpl(n), "utf8");

  console.log(`✔︎ ${n}화: ${htmlName}, ${bakName}, ${astroName} 생성/갱신`);
}
console.log("✅ 47~55화 리셋 완료");
