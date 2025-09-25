// src/app/tree-live/page.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TreeLivePage() {
  const router = useRouter();

  return (
    <div
      className="mx-auto min-h-screen max-w-[420px] bg-white text-gray-900 flex flex-col items-center"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* 상단 메시지 */}
      <div className="mt-10 text-center">
        <h1 className="text-[24px] font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
            나무의 상태
            <br />
            분석이 완료되었어요
          </span>
        </h1>
      </div>

      {/* 큰 원형 일러스트 */}
      <div className="mt-8">
        <div className="relative h-64 w-64 rounded-full bg-gradient-to-b from-sky-400 to-indigo-300 shadow-inner">
          <div className="absolute inset-4 rounded-full bg-white/10 backdrop-blur-[1px]" />
          <Image
            src="/images/groom.png"
            alt="분석 결과 아이콘"
            fill
            className="object-contain p-8"
            priority
          />
        </div>
      </div>

      {/* 결과 텍스트 */}
      <div className="mt-8 text-center">
        <p className="text-[24px] font-extrabold text-sky-500">
          나무는 잘 지내고 있어요.
        </p>
        <p className="mt-3 text-lg font-semibold">품종: 계수나무</p>
      </div>

      {/* 하단 CTA 버튼 */}
      <div className="mt-auto w-full px-5 pb-6">
        <button
          type="button"
          onClick={() => router.replace("/dashboard")}
          className="cursor-pointer h-12 w-full rounded-2xl bg-[#3B82F6] text-white text-[16px] font-semibold shadow-md hover:brightness-105 active:translate-y-[1px] transition"
        >
          다음
        </button>
      </div>
    </div>
  );
}
