// src/app/tree/add-tree/input-dbh/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function InputDbhPage() {
  const router = useRouter();
  const [dbh, setDbh] = useState<string>(""); // 값만 보관 (아직 사용 X)

  const goNext = () => {
    // 필요하면 여기서 유효성 체크 가능 (ex. 빈 값 경고)
    router.push("/tree/add-tree/middle");
  };

  return (
    <div
      className="
        mx-auto min-h-screen max-w-[420px]
        bg-[#F6F7F9] text-gray-900 flex flex-col
      "
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <main className="flex-1 px-5 pt-6 pb-28">
        <h1 className="text-[34px] font-extrabold tracking-tight">
          DBH(흉고직경)
        </h1>

        <p className="mt-3 text-[15px] leading-6 text-gray-700">
          DBH란? 1.3m 높이에서 나무의 둘레를 말해요
          <br />
          줄자를 이용하여 나무의 둘레(cm)를 기입해주세요
        </p>

        {/* 입력 박스 */}
        <div className="mt-10">
          <label className="block text-[16px] font-bold">DBH(흉고직경)</label>
          <input
            value={dbh}
            onChange={(e) => setDbh(e.target.value)}
            placeholder="ex) 30cm"
            inputMode="decimal"
            className="
              mt-3 h-14 w-full rounded-2xl
              border-0 ring-1 ring-gray-200 bg-white px-4
              text-[16px] placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
        </div>

        {/* 설명 이미지 */}
        <div className="mt-10 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="relative mx-auto aspect-[4/3] w-full">
            <Image
              src="/images/tree-input.png"
              alt="DBH 측정 설명"
              fill
              className="object-contain"
              priority={false}
            />
            {/* 라벨 (이미지 위 보조 텍스트) */}
            <span className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 text-sm font-semibold text-gray-800">
              둘레(cm)
            </span>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-800">
              1.3m
            </span>
          </div>
        </div>
      </main>

      {/* 하단 CTA 고정 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
        <div
          className="mx-auto w-full max-w-[420px] px-5 pb-4"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)" }}
        >
          <div className="pointer-events-auto rounded-2xl bg-white/80 p-2 backdrop-blur">
            <button
              type="button"
              onClick={goNext}
              className="h-12 w-full rounded-xl bg-[#199CF3] text-white text-[16px] font-semibold cursor-pointer     shadow-md active:translate-y-[1px] transition"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
