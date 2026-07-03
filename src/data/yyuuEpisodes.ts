// src/data/yyuuEpisodes.ts
import type { PoemStanza } from "../utils/parsePoem";
import { parsePoem } from "../utils/parsePoem";

// txt 원고 import
import ep01Raw from "../poems/yyuu/01.txt?raw";
import ep02Raw from "../poems/yyuu/02.txt?raw";

export type yyuuEpisodeStatus = "published" | "upcoming";

export type yyuuEpisode = {
  id: number;           // 1, 2, 3 ...
  slug: string;         // "01" 이런 식
  title: string;        // 회차 제목
  status: yyuuEpisodeStatus;
  stanzas: PoemStanza[]; // 연 단위
};

export const yyuuEpisodes: yyuuEpisode[] = [
  {
    id: 1,
    slug: "01",
    title: "유유 연연",
    status: "published",
    stanzas: parsePoem(ep01Raw),
  },

  {
    id: 2,
    slug: "02",
    title: "강변 공장장",
    status: "published",
    stanzas: parsePoem(ep02Raw),
  },

  // 이후 화는 이렇게만 추가하면 됨
  // {
  //   id: 2,
  //   slug: "02",
  //   title: "2화 제목",
  //   status: "upcoming",
  //   stanzas: parsePoem(ep02Raw),
  // },
];
