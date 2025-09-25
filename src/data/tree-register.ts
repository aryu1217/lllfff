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
    images: ["/images/di/2.jpeg", "/images/di/3.jpeg"],
  },
  {
    id: "2025-08-22",
    dateLabel: "8월 22일 월요일",
    nickname: "닉네임",
    images: ["/images/di/5.jpeg", "/images/di/6.jpeg"],
  },
  {
    id: "2025-07-22",
    dateLabel: "7월 21일 일요일",
    nickname: "닉네임",
    images: ["/images/di/8.jpeg", "/images/di/9.jpeg"],
  },
  {
    id: "2025-06-23",
    dateLabel: "6월 21일 월요일",
    nickname: "닉네임",
    images: ["/images/di/11.jpeg", "/images/di/12.jpeg"],
  },
];

// 빠른 조회용 맵
export const treeRegisterMap: Record<string, TreeRegisterItem> =
  Object.fromEntries(treeRegisterItems.map((i) => [i.id, i]));
