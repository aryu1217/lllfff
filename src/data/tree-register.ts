// 공용 더미 데이터 (카드/상세에서 함께 사용)
export type TreeRegisterItem = {
  id: string;
  dateLabel: string;
  nickname?: string;
  images: string[];
};

export const treeRegisterItems: TreeRegisterItem[] = [
  {
    id: "today",
    dateLabel: "오늘",
    nickname: "닉네임",
    images: ["/images/di/1.jpeg", "/images/di/2.jpeg", "/images/di/3.jpeg"],
  },
  {
    id: "2025-09-22",
    dateLabel: "9월 22일 월요일",
    nickname: "닉네임",
    images: ["/images/di/4.jpeg", "/images/di/5.jpeg", "/images/di/6.jpeg"],
  },
  {
    id: "2025-09-21",
    dateLabel: "9월 21일 일요일",
    nickname: "닉네임",
    images: ["/images/di/7.jpeg", "/images/di/8.jpeg", "/images/di/3.jpeg"],
  },
  {
    id: "2025-09-20",
    dateLabel: "9월 20일 토요일",
    nickname: "닉네임",
    images: ["/images/di/1.jpeg", "/images/di/2.jpeg", "/images/di/3.jpeg"],
  },
];

// 빠른 조회용 맵
export const treeRegisterMap: Record<string, TreeRegisterItem> =
  Object.fromEntries(treeRegisterItems.map((i) => [i.id, i]));
