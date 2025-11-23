// src/utils/parsePoem.ts

// 한 연(stanza) = 여러 줄(line)로 구성
export type PoemStanza = string[];

/**
 * txt 원고를
 *  - 한 줄씩 나누고
 *  - 빈 줄(또는 공백만 있는 줄)을 기준으로 "연"을 끊어서
 *  - string[][] 형태로 돌려준다.
 *
 *  빈 줄도 그대로 하나의 stanza([])로 남겨서
 *  "연갈이"를 HTML에서 표현할 수 있게 한다.
 */
export function parsePoem(raw: string): PoemStanza[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");

  const stanzas: PoemStanza[] = [];
  let current: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/g, ""); // 우측 공백 제거

    if (line === "") {
      // 빈 줄 => 지금까지 모아둔 stanza push
      stanzas.push(current);
      current = [];
    } else {
      current.push(line);
    }
  }

  // 마지막 stanza 처리
  stanzas.push(current);

  // 앞뒤 혹은 연속 빈 줄 때문에 생긴 쓰레기 정리:
  // 마지막이 완전히 빈 stanza([])라면 제거
  while (stanzas.length > 0 && stanzas[stanzas.length - 1].length === 0) {
    stanzas.pop();
  }

  return stanzas;
}
