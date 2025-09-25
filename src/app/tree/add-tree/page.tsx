// src/app/tree/add-tree/page.tsx  (또는 네가 원하는 경로/파일명)
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddTreePage() {
  const router = useRouter();

  return (
    <div
      className="
        mx-auto min-h-screen max-w-[420px]
        bg-[#F6F7F9] text-gray-900
        flex flex-col
      "
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* 본문 */}
      <main className="flex-1 px-6 pt-8 pb-28">
        <h1 className="text-center text-[28px] leading-[1.2] font-extrabold tracking-tight">
          나무 상태를 공유하기 위해 <br className="hidden sm:block" />
          사진을 찍어볼까요?
        </h1>
        <p className="mt-3 text-center text-[14px] text-gray-600">
          나무의 상태를 파악하기 위해
          <br />
          줄기, 전신, 상신을 찍어야 돼요
        </p>

        {/* 미리보기 일러스트 */}
        <div className="mt-10 flex items-center justify-center">
          <div className="relative h-[260px] w-[260px] rounded-full shadow-lg">
            <Image
              src="/images/groom.png"
              alt="tree-illustration"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
        </div>
      </main>

      {/* 하단 버튼 영역 (고정) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
        <div
          className="mx-auto w-full max-w-[420px] px-5 pb-4"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)" }}
        >
          <div className="pointer-events-auto rounded-2xl bg-white/80 p-3 backdrop-blur">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push("/tree")}
                className="
                  cursor-pointer
                  h-12 flex-1 rounded-xl
                  bg-gray-100 text-gray-500
                  font-semibold text-[15px]
                  hover:bg-gray-200 active:translate-y-[1px] transition
                "
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => router.push("/tree/add-tree/input-dbh")}
                className="
                cursor-pointer
                  h-12 flex-1 rounded-xl
                  bg-[#199CF3] text-white
                  font-semibold text-[15px]
                  hover:brightness-105 active:translate-y-[1px] transition
                "
              >
                시작
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
