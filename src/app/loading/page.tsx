// src/app/loading/page.tsx  (원하는 경로에 저장)
// "분석중..." 로딩 화면 → 3초 뒤 /tree-live 로 이동
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/tree-live");
    }, 2500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div
      className="mx-auto flex min-h-screen max-w-[420px] flex-col items-center justify-center bg-[#F6F7F9] text-gray-900"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* 원형 로더 */}
      <div className="relative mb-8 h-56 w-56">
        {/* 배경 원(연한) */}
        <svg
          viewBox="0 0 120 120"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <circle
            cx="60"
            cy="60"
            r="44"
            stroke="url(#bg)"
            strokeWidth="11"
            fill="none"
            opacity="0.15"
          />
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22A6F2" />
              <stop offset="100%" stopColor="#7A3FF2" />
            </linearGradient>
            <linearGradient id="arc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22A6F2" />
              <stop offset="100%" stopColor="#5B8DF9" />
            </linearGradient>
          </defs>
        </svg>

        {/* 회전하는 호(아크) */}
        <svg
          viewBox="0 0 120 120"
          className="absolute inset-0 h-full w-full animate-spin"
          style={{ animationDuration: "1.6s" }}
          aria-hidden
        >
          <circle
            cx="60"
            cy="60"
            r="44"
            stroke="url(#arc)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            /* 360*(dasharray ratio) 만큼만 보이게 */
            strokeDasharray="220 400"
            transform="rotate(-45 60 60)"
          />
        </svg>

        {/* 중앙 AI 라벨 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-extrabold tracking-tight text-sky-500">
            AI
          </span>
        </div>
      </div>

      {/* 상태 텍스트 */}
      <div className="text-2xl font-extrabold text-sky-500">
        분석중<span className="animate-pulse">...</span>
      </div>
    </div>
  );
}
