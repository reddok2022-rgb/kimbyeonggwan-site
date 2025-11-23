// tools/force-stanza-heuristic.mjs
// 목적: p=1로 뭉친 .html을 "연/행"으로 휴리스틱 분리하여 덮어쓰기 + 프리뷰 출력
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const EP_DIR = 'src/pages/episodes';

// ===== 휴리스틱 규칙 =====
// 1) 아주 짧은 행(<= 4자)은 독립 연으로 취급(시적 단호한 행들: '잠깐', '랑이' 등)
// 2) 괄호 시작/끝 행은 앞뒤를 분리
// 3) 콜론(:)만 있는 행, 'PTSD' 같은 라벨성 행은 분리
// 4) 별표(*)로 시작하는 각주는 footnote로 분리
// 5) 문장 마침(…다/다./?!) 뒤에 이어지는 긴 행이면 연 분리 시도
//    (한국어 문장 종결 ‘다’ ‘까?’ 패턴을 단서로 사용)
const SHORT_LINE = 4;
function looksLabel(s){ return /^[:：]\s*$/.test(s) || /^[A-Z]{2,}[\w-]*\.?$/.test(s); }
function isFootnoteLine(s){ return /^\s*\*/.test(s); }
function isParenBoundary(s){ return /^\s*[([]/.test(s) || /[)\]]\s*$/.test(s); }
function isVeryShort(s){ return s.trim().length <= SHORT_LINE; }
function endsSentenceKo(s){ return /(다\.?$|까\?$|요\.?$|니다\.?$)/.test(s.trim()); }

function splitOneHtml(html){
  // p=1 구조 가정: <p> ... <br> ... </p>(+footnote)
  const footMatches = [...html.matchAll(/<p class="footnote">([\s\S]*?)<\/p>/gi)];
  const footnote = footMatches.length ? footMatches[0][1].trim() : null;
  const body = html.replace(/<p class="footnote">[\s\S]*?<\/p>\s*$/i, '').trim();

  const m = body.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!m) return { out: html, changed:false };

  // 행 단위로 분해
  const lines = m[1].split(/<br\s*\/?>\s*/i).map(s=>s.trim()).filter(Boolean);

  const stanzas = [];
  let buf = [];

  function flush(){
    if (buf.length){ stanzas.push(buf); buf=[]; }
  }

  for (let i=0;i<lines.length;i++){
    const line = lines[i];

    // 1) 각주면 버퍼 비우고 footnote로
    if (isFootnoteLine(line)){
      flush();
      // footnote는 아래에서 다시 출력
      continue;
    }

    // 2) 강한 경계: 아주 짧은 행 / 라벨 / 괄호 경계
    if (isVeryShort(line) || looksLabel(line) || isParenBoundary(line)){
      flush(); 
      stanzas.push([line]);
      flush();
      continue;
    }

    // 3) 기본: 누적
    buf.push(line);

    // 4) 문장 종결 + 다음 행이 충분히 길면 연 경계 시도
    const next = lines[i+1] || '';
    const nextLong = next.trim().length >= 14; // 대략 긴 문장
    if (endsSentenceKo(line) && nextLong){
      flush();
    }
  }
  flush();

  // 최소 안전장치: 전부 한 연으로 남았으면 원본 유지
  if (stanzas.length <= 1) return { out: html, changed:false };

  let out = stanzas.map(st => `<p>${st.join('<br>\n')}</p>`).join('\n\n') + '\n';
  if (footnote) out += `\n<p class="footnote">${footnote}</p>\n`;
  return { out, changed:true, preview: stanzas.slice(0,3).map(s=>s.join(' / ')).join('\n') };
}

function run(){
  const arg = process.argv[2];
  const allHtml = readdirSync(EP_DIR).filter(f=>f.endsWith('.html')).sort((a,b)=>a.localeCompare(b,'en',{numeric:true}));
  const targets = arg ? [arg] : allHtml.filter(f=>{
    const s = readFileSync(join(EP_DIR,f),'utf8');
    const pCount = (s.match(/<p(\s|>)/gi) || []).length;
    return pCount === 1; // p=1 인 애들만 대상
  });

  if (!targets.length){ console.log('대상 .html이 없습니다. (p=1이 없음)'); return; }

  for (const f of targets){
    const p = join(EP_DIR,f);
    const s = readFileSync(p,'utf8');
    const { out, changed, preview } = splitOneHtml(s);
    if (changed){
      writeFileSync(p, out);
      console.log(`✔ split: ${f}`);
      if (preview){
        console.log('  preview (앞 3연):');
        console.log('  - ' + preview.split('\n').join('\n  - '));
      }
    } else {
      console.log(`– keep : ${f} (변경 없음; 안전장치로 원본 유지)`);
    }
  }
  console.log('\n완료. 브라우저에서 확인하세요.');
}

run();
