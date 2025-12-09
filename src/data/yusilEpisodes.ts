// src/data/yusilEpisodes.ts
import type { PoemStanza } from "../utils/parsePoem";
import { parsePoem } from "../utils/parsePoem";

// txt 원고 import
// → 01.txt를 쓰고 싶으면 이렇게 두고, 파일만 맞춰 두면 돼요.
import ep01Raw from "../poems/yusil/01.txt?raw";
import ep02Raw from "../poems/yusil/02.txt?raw";
import ep03Raw from "../poems/yusil/03.txt?raw";

export type YusilEpisodeStatus = "published" | "upcoming";

export type YusilEpisode = {
  id: number;          // 401, 402 ...
  slug: string;        // "401" 이런 식
  title: string;       // 회차 제목
  status: YusilEpisodeStatus;
  stanzas: PoemStanza[];
};

export const yusilEpisodes: YusilEpisode[] = [
  {
    id: 401,
    slug: "401",
    title: "1화 생일",
    status: "published",
    stanzas: parsePoem(ep01Raw),
  },

  {
    id: 402,
    slug: "402",
    title: "2화 벽에 기대어 본 날은",
    status: "published",
    stanzas: parsePoem(ep02Raw),
  },

  {
    id: 403,
    slug: "403",
    title: "3화 청소 방법",
    status: "published",
    stanzas: parsePoem(ep03Raw),
  },

];
