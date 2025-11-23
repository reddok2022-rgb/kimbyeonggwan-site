// scripts/migrate_all_to_raw_import.mjs
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EP_DIR = path.join(__dirname, "..", "src", "pages", "episodes");

// 옵션: --underscore-bak 전달 시 .bak 파일 앞에 "_" 자동 붙임
const UNDERSCORE_BAK = process.argv.includes("--underscore-bak");

const astroTemplate = (num, htmlFile) => `---
import EpisodeLayout from '../../layouts/EpisodeLayout.astro';
import src from './${htmlFile}?raw';

let raw = src;
if (/<body[\\s\\S]*?>/i.test(raw)) {
  raw = raw.replace(/^[\\s\\S]*?<body[^>]*>/i, '').replace(/<\\/body>[\\s\\S]*$/i, '');
}
// 완전 빈 <p> 표준화
raw = raw.replace(/<p[^>]*>\\s*<\\/p>/gi, '<p></p>');
// 빈 줄(연갈이) → <p></p>
raw = raw.replace(/<\\/p>\\s*\\n\\s*\\n\\s*<p/gi, '</p>\\n<p></p>\\n<p');

const title = '에피소드 ${num}';
const subtitle = '';
const html = \`<div class="ep-raw">\${raw}</div>\`;
---
<EpisodeLayout {title} {subtitle}>
  <div set:html={html} />
</EpisodeLayout>
`;

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true }).catch(() => {});
}

async function list(dir) {
  try { return await fs.readdir(dir); } catch { return []; }
}

function pad2(n) { return String(n).padStart(2, "0"); }

async function renameBakFiles(dir) {
  const files = await list(dir);
  const bak = files.filter(f => f.toLowerCase().endsWith(".bak") && !f.startsWith("_"));
  for (const f of bak) {
    const src = path.join(dir, f);
    const dst = path.join(dir, "_" + f);
    await fs.rename(src, dst).catch(() => {});
  }
}

async function findHtmlForEpisode(dir, num) {
  const files = await list(dir);
  // 후보: episode_XX_inline_light_v3*.html (괄호/공백 변형 포함)
  const base = `episode_${num}_inline_light_v3`;
  const candidates = files.filter(f =>
    f.toLowerCase().startsWith(base.toLowerCase()) &&
    f.toLowerCase().endsWith(".html")
  );
  if (candidates.length > 0) return candidates[0];

  // .html 없으면 .bak을 .html로 복사해서 사용 (동일 내용)
  const bak = files.find(f =>
    f.toLowerCase().startsWith(base.toLowerCase()) &&
    f.toLowerCase().endsWith(".html.bak")
  );
  if (bak) {
    const newHtml = `${base}.html`;
    await fs.copyFile(path.join(dir, bak), path.join(dir, newHtml));
    return newHtml;
  }
  return null;
}

async function migrateOne(num) {
  const ep = pad2(num);
  const dir = EP_DIR;
  const astroPath = path.join(dir, `${ep}.astro`);

  // asto가 없으면 skip (필요시 생성하려면 여기서 생성 로직 추가 가능)
  const exists = await fs.stat(astroPath).then(() => true).catch(() => false);
  if (!exists) {
    console.log(`• ${ep}: *.astro 없음 (건너뜀)`);
    return;
  }

  const htmlFile = await findHtmlForEpisode(dir, ep);
  if (!htmlFile) {
    console.warn(`! ${ep}: 사용할 HTML 파일을 찾지 못했어요. (episode_${ep}_inline_light_v3*.html 필요)`);
    return;
  }

  const before = await fs.readFile(astroPath, "utf8").catch(() => "");
  const after  = astroTemplate(ep, htmlFile);

  if (before.trim() === after.trim()) {
    console.log(`✓ ${ep}: 이미 최신 템플릿`);
    return;
  }

  await fs.writeFile(astroPath, after, "utf8");
  console.log(`✓ ${ep}: ${htmlFile}로 변환 완료`);
}

async function main() {
  await ensureDir(EP_DIR);

  if (UNDERSCORE_BAK) {
    await renameBakFiles(EP_DIR);
    console.log("… 모든 .bak 파일에 언더스코어(_) 적용");
  }

  // 01~55 일괄 변환 (필요 범위만 수정해도 됨)
  for (let i = 1; i <= 55; i++) {
    await migrateOne(i);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
