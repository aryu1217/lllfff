// src/app/tree/add-tree/middle/page.tsx
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTreeMiddlePage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onPick = () => fileRef.current?.click();

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  return (
    <div
      className="mx-auto min-h-screen max-w-[420px] bg-[#F6F7F9] text-gray-900 flex flex-col"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-[#F6F7F9]/80 backdrop-blur">
        <div className="flex items-center gap-2 px-5 py-3">
          <button
            onClick={() => router.back()}
            className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-[0.98]"
            aria-label="뒤로가기"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19L8 12L15 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* 본문 */}
      <main className="flex-1 px-5 pb-28">
        <h1 className="mt-1 text-[28px] font-extrabold tracking-tight">
          줄기 사진
        </h1>

        {/* 프리뷰 박스 */}
        <div className="mt-4 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-50">
            {preview ? (
              // 미리보기
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="preview"
                className="h-full w-full object-cover"
              />
            ) : (
              // 플레이스홀더
              <div className="absolute inset-0 grid place-items-center text-gray-300">
                <div className="flex flex-col items-center">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 5h-3.2l-1.1-1.5A2 2 0 0 0 14.2 3H9.8a2 2 0 0 0-1.6.8L7.1 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-400">
                    사진을 첨부해주세요
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 파일 선택 버튼 */}
        <div className="mt-5">
          <button
            type="button"
            onClick={onPick}
            className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-3 text-[15px] font-semibold hover:bg-gray-50 active:translate-y-[1px] transition"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-gray-800"
            >
              <path
                d="M12 5v14m-7-7h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            사진 첨부하기
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={onChangeFile}
          />
        </div>
      </main>

      {/* 하단 다음 버튼 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
        <div
          className="mx-auto w-full max-w-[420px] px-5 pb-4"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)" }}
        >
          <div className="pointer-events-auto rounded-2xl bg-white/80 p-2 backdrop-blur">
            <button
              type="button"
              onClick={() => router.push("/tree/add-tree/full")}
              className="cursor-pointer h-12 w-full rounded-xl bg-[#199CF3] text-white text-[15px] font-semibold shadow-md active:translate-y-[1px] transition"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
