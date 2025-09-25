// src/app/tree/[date]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import BackHeader from "@/components/ui/back-header";
import { treeRegisterMap } from "@/data/tree-register";
import { useState } from "react";

export default function TreeDatePage() {
  const { date } = useParams<{ date: string }>();

  // ✅ 훅은 항상 최상단에서 호출
  const [open, setOpen] = useState(false);

  const data = treeRegisterMap[date];
  const cells = [...(data?.images ?? [])].slice(0, 4);
  while (cells.length < 4) cells.push("");

  return (
    <div
      className="mx-auto min-h-screen max-w-[420px] bg-[#F6F7F9]"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 80px)",
      }}
    >
      <BackHeader />

      {/* ✅ return 내부에서 분기 */}
      {!data ? (
        <div className="px-5 py-6">
          <h1 className="text-[20px] font-semibold">데이터가 없어요</h1>
          <p className="mt-1 text-sm text-gray-600">
            요청한 날짜({date})에 해당하는 나무 정보가 없습니다.
          </p>
        </div>
      ) : (
        <>
          <div className="px-5 pb-6">
            <h1 className="mt-2 text-[28px] font-extrabold tracking-tight">
              {data.dateLabel}
            </h1>
            <p className="mt-1 text-[13px] text-gray-500">
              해당 날짜의 나무 상황이에요.
            </p>

            {/* 작성자 카드 */}
            <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 ring-1 ring-black/5" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">작성자</span>
                  <span className="text-sm text-gray-500">
                    {data.nickname ?? "닉네임"}
                  </span>
                </div>
              </div>
            </div>

            {/* 사진 2x2 */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {cells.map((src, idx) =>
                src ? (
                  <div
                    key={idx}
                    className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
                  >
                    <Image
                      src={src}
                      alt={`${data.dateLabel} image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    key={idx}
                    className="aspect-square rounded-2xl bg-white ring-1 ring-black/5"
                    aria-hidden
                  />
                )
              )}
            </div>
          </div>

          {/* 하단 신고 버튼 */}
          <div className="pointer-events-none  bottom-0 z-50">
            <div className="mx-auto w-full max-w-[420px] px-5 pb-4">
              <div className="pointer-events-auto rounded-2xl  backdrop-blur">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="h-12 w-full rounded-xl bg-[#3B82F6] text-[15px] font-semibold text-white shadow-md active:translate-y-[1px] cursor-pointer"
                >
                  신고하기
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 모달 */}
      {open && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/30 p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-lg"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3 className="text-lg font-bold">신고 완료</h3>
            <p className="mt-1 text-sm text-gray-600">
              신고가 접수되었어요. 검토 후 조치하겠습니다.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white cursor-pointer"
                onClick={() => setOpen(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
