// scripts/validate_all.mjs
import fs from "fs";
import path from "path";

/**
 * episodes 폴더의 각 회차별 3종 세트 파일 유무를 점검한다.
 * - [N].astro  (N, 01 모두 허용)
 * - episode_NN_inline_light_v3.html
 * - episode_NN_inline_light_v3.html.bak  (뒤에 " (1)" 변형 허용)
 *
 * 사용법:
 *   node scripts/validate_all.mjs            // 기본 1~55 점검
 *   node scripts/validate_all.mjs 1-30       // 1~30만 점검
 *   node scripts/validate_all.mjs 1,5,10     // 특정 회차만 점검
 */

const CWD = process.cwd();
const EP_DIR = path.resolve(CWD, "src/pages/episodes");

// --- 유틸: 콘솔 컬러
const c = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red:   (s) => `\x1b[31m${s}\x1b[0m`,
  yellow:(s) => `\x1b[33m${s}\x1b[0m`,
  gray:  (s) => `\x1b[90m${s}\x1b[0m`,
  bold:  (s) => `\x1b[1m${s}\x1b[0m`,
};

// --- 점검 대상 회차 파싱
function parseTargets() {
  const arg = process.argv[2];
  if (!arg) return Array.from({ length: 55 }, (_, i) => i + 1);

  if (/^\d+-\d+$/.test(arg)) {
    const [a, b] = arg.split("-").map((v) => parseInt(v, 10));
    const [start, end] = a <= b ? [a, b] : [b, a];
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  if (/^\d+(,\d+)*$/.test(arg)) {
    return arg.split(",").map((v) => parseInt(v, 10));
  }

  console.log(c.yellow(`⚠️  인자를 해석할 수 없어 기본(1~55)로 점검합니다: ${arg}`));
  return Array.from({ length: 55 }, (_, i) => i + 1);
}

// --- 파일 존재 확인(여러 후보 허용)
function existsOneOf(filePaths) {
  for (const p of filePaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function pad2(n) { return String(n).padStart(2, "0"); }

function candidatesFor(num) {
  const NN = pad2(num);

  const astro = [
    path.join(EP_DIR, `${num}.astro`),
    path.join(EP_DIR, `${NN}.astro`),
  ];

  const html = [
    path.join(EP_DIR, `episode_${NN}_inline_light_v3.html`),
    path.join(EP_DIR, `episode_${num}_inline_light_v3.html`),
  ];

  const bak = [
    path.join(EP_DIR, `episode_${NN}_inline_light_v3.html.bak`),
    path.join(EP_DIR, `episode_${NN}_inline_light_v3 (1).html.bak`),
    path.join(EP_DIR, `episode_${num}_inline_light_v3.html.bak`),
    path.join(EP_DIR, `episode_${num}_inline_light_v3 (1).html.bak`),
  ];

  return { astro, html, bak };
}

function main() {
  if (!fs.existsSync(EP_DIR)) {
    console.error(c.red(`✖ episodes 폴더가 없습니다: ${EP_DIR}`));
    process.exit(1);
  }

  const targets = parseTargets();
  const missing = [];

  console.log(c.bold(`\n🔍 episodes 점검: ${targets[0]} ~ ${targets[targets.length - 1]}\n`));

  for (const n of targets) {
    const { astro, html, bak } = candidatesFor(n);
    const fAstro = existsOneOf(astro);
    const fHtml  = existsOneOf(html);
    const fBak   = existsOneOf(bak);

    const lack = [];
    if (!fAstro) lack.push("astro");
    if (!fHtml)  lack.push("html");
    if (!fBak)   lack.push("bak");

    if (lack.length === 0) {
      console.log(` ${c.green("✔")} ${String(n).padStart(2, "0")}  ${c.gray(path.basename(fAstro))}, ${c.gray(path.basename(fHtml))}, ${c.gray(path.basename(fBak))}`);
    } else {
      console.log(` ${c.red("✖")} ${String(n).padStart(2, "0")}  누락: ${lack.join(", ")}`);
      missing.push({ n, lack });
    }
  }

  console.log("\n" + (missing.length === 0
    ? c.green("✅ 모든 회차의 3종 세트가 정상입니다.")
    : c.red(`❌ 누락 회차 ${missing.length}건: `) + missing.map(m => m.n).join(", ")
  ) + "\n");

  process.exit(missing.length === 0 ? 0 : 1);
}

main();
