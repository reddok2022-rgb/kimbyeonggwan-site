// src/data/uzinEpisodes.ts
import type { PoemStanza } from "../utils/parsePoem";
import { parsePoem } from "../utils/parsePoem";

// txt 원고 import
import ep01Raw from "../poems/uzin/01.txt?raw";

export type UzinEpisodeStatus = "published" | "upcoming";

export type UzinEpisode = {
  id: number;           // 1, 2, 3 ...
  slug: string;         // "01" 이런 식
  title: string;        // 회차 제목
  status: UzinEpisodeStatus;
  stanzas: PoemStanza[]; // 연 단위
};

export const uzinEpisodes: UzinEpisode[] = [
  {
    id: 1,
    slug: "01",
    title: "데리러 간 날",
    status: "published",
    stanzas: parsePoem(ep01Raw),
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
