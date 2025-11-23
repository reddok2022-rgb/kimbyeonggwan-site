// scripts/normalize-47.mjs
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const epDir = join(__dirname, "../src/pages/episodes");

// 후보 파일명(괄호 있는 버전까지 자동 탐색)
const candidates = [
  "episode_47_inline_light_v3.html.bak",
  "episode_47_inline_light_v3 (1).html.bak",
];

const name = candidates.find(n => fs.existsSync(join(epDir, n)));
if (!name) {
  console.error("❌ 47화 .bak 파일을 찾지 못했습니다.");
  process.exit(1);
}

let raw = fs.readFileSync(join(epDir, name), "utf8");

// 1) body 안쪽만 남기기
if (/<body[\s\S]*?>/i.test(raw)) {
  raw = raw
    .replace(/^[\s\S]*?<body[^>]*>/i, "")
    .replace(/<\/body>[\s\S]*$/i, "");
}

// 2) 내장 <style> 제거 (46 구조와 동일화)
raw = raw.replace(/<style[\s\S]*?<\/style>/gi, "");

// 3) 빈 문단 정규화 (&nbsp;/공백/<br> → 진짜 빈 p)
raw = raw.replace(/<p[^>]*>(?:\s|&nbsp;|\u00A0|<br\s*\/?>)+<\/p>/gi, "<p></p>");
raw = raw.replace(/<p[^>]*>\s*<\/p>/gi, "<p></p>");

// 4) 엔터 두 줄 → 연갈이(<p></p>)로 변환
raw = raw.replace(/<\/p>\s*\n\s*\n\s*<p/gi, "</p>\n<p></p>\n<p");

// 5) 맨 앞 제목 삭제: "47화 보스전 5", "보스전5" 등
raw = raw.replace(
  /^\s*(?:<h1[^>]*>[\s\S]*?보스전(?:\s*|&nbsp;*)?5[\s\S]*?<\/h1>\s*|<p[^>]*>\s*(?:47화\s*)?보스전(?:\s*|&nbsp;*)?5\s*<\/p>\s*)/i,
  ""
);

// 6) 인라인 style, <font> 잔재 정리(46처럼 깔끔한 본문만 남김)
raw = raw.replace(/\sstyle="[^"]*"/gi, "");
raw = raw.replace(/<(\/?)font[^>]*>/gi, "<$1span>");

// 덮어쓰기 저장 (확장자/이름은 유지)
fs.writeFileSync(join(epDir, name), raw, "utf8");
console.log("✅ 47.bak을 46.bak 구조로 정규화 완료:", name);
