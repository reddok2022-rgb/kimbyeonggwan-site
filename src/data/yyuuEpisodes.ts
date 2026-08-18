// src/data/yyuuEpisodes.ts
import type { PoemStanza } from "../utils/parsePoem";
import { parsePoem } from "../utils/parsePoem";

// txt 원고 import
import ep01Raw from "../poems/yyuu/01.txt?raw";
import ep02Raw from "../poems/yyuu/02.txt?raw";
import ep03Raw from "../poems/yyuu/03.txt?raw";
import ep04Raw from "../poems/yyuu/04.txt?raw";
import ep05Raw from "../poems/yyuu/05.txt?raw";
import ep06Raw from "../poems/yyuu/06.txt?raw";
import ep07Raw from "../poems/yyuu/07.txt?raw";
import ep08Raw from "../poems/yyuu/08.txt?raw";
import ep09Raw from "../poems/yyuu/09.txt?raw";
import ep10Raw from "../poems/yyuu/10.txt?raw";
import ep11Raw from "../poems/yyuu/11.txt?raw";
import ep12Raw from "../poems/yyuu/12.txt?raw";
import ep13Raw from "../poems/yyuu/13.txt?raw";
import ep14Raw from "../poems/yyuu/14.txt?raw";
import ep15Raw from "../poems/yyuu/15.txt?raw";

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

 {
    id: 3,
    slug: "03",
    title: "문학에 대한 폐지 요구",
    status: "published",
    stanzas: parsePoem(ep03Raw),
  },

 {
    id: 4,
    slug: "04",
    title: "바다",
    status: "published",
    stanzas: parsePoem(ep04Raw),
  },

{
    id: 5,
    slug: "05",
    title: "해안도로 부동산",
    status: "published",
    stanzas: parsePoem(ep05Raw),
  },

{
    id: 6,
    slug: "06",
    title: "쓰레기봉투를 며칠째 도로 가져온다",
    status: "published",
    stanzas: parsePoem(ep06Raw),
  },

{
    id: 7,
    slug: "07",
    title: "신전이 무너졌다 숲은 숨을 쉬었다 칼날은 조용히 베었다",
    status: "published",
    stanzas: parsePoem(ep07Raw),
  },

{
    id: 8,
    slug: "08",
    title: "괄호를 뚫고 햇빛으로 나가기",
    status: "published",
    stanzas: parsePoem(ep08Raw),
  },

{
    id: 9,
    slug: "09",
    title: "영단어책 들고 다니는 킬러",
    status: "published",
    stanzas: parsePoem(ep09Raw),
  },

{
    id: 10,
    slug: "10",
    title: "인형 탈취범",
    status: "published",
    stanzas: parsePoem(ep10Raw),
  },

{
    id: 11,
    slug: "11",
    title: "대화",
    status: "published",
    stanzas: parsePoem(ep11Raw),
  },

  {
    id: 12,
    slug: "12",
    title: "대화 2",
    status: "published",
    stanzas: parsePoem(ep12Raw),
  },

   {
    id: 13,
    slug: "13",
    title: "대화 3",
    status: "published",
    stanzas: parsePoem(ep13Raw),
  },

     {
    id: 14,
    slug: "14",
    title: "대화 4",
    status: "published",
    stanzas: parsePoem(ep14Raw),
  },

    {
    id: 15,
    slug: "15",
    title: "자신을 위한 서정시",
    status: "published",
    stanzas: parsePoem(ep15Raw),
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
