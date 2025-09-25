"use client";

import Image from "next/image";
import Link from "next/link";

export type TreeRegisterItem = {
  id: string;
  dateLabel: string;
  nickname?: string;
  images: string[];
  href?: string; // 필요시 오버라이드
  interactive?: boolean;
};

export default function TreeRegisterCard({
  id,
  dateLabel,
  nickname = "닉네임",
  images,
  href,
  interactive = true,
}: TreeRegisterItem) {
  // ✅ /tree/[id] 로 고정
  const to = href ?? `/tree/${id}`;

  const cells = [...images].slice(0, 4);
  while (cells.length < 4) cells.push("");

  const CardInner = (
    <div className="w-full transition hover:-translate-y-[1px] hover:shadow-md">
      <div className="grid grid-cols-2 grid-rows-2 gap-2 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5">
        {cells.map((src, i) =>
          src ? (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt={`${dateLabel} photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 420px) 50vw, 200px"
              />
            </div>
          ) : (
            <div
              key={i}
              className="aspect-square rounded-xl bg-gray-100"
              aria-hidden
            />
          )
        )}
      </div>
      <div className="mt-3">
        <div className="text-[18px] font-extrabold tracking-tight text-gray-900">
          {dateLabel}
        </div>
        <div className="mt-1 text-sm text-gray-500">{nickname}</div>
      </div>
    </div>
  );

  return interactive ? (
    <Link
      href={to}
      className="block rounded-2xl p-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
    >
      {CardInner}
    </Link>
  ) : (
    <div className="block rounded-2xl p-1">{CardInner}</div>
  );
}
