"use client";

import { useHarmfulness } from "@/hooks/useHarmfulness";
import { useState } from "react";

export default function HarmfulnessChecker() {
  const [prompt, setPrompt] = useState("");
  const { score, isLoading, error, sendPrompt } = useHarmfulness();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    sendPrompt(prompt);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        {/* 제목 */}
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          문장 유해성 평가
        </h2>

        {/* 입력 영역 */}
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            문장 입력
          </label>
          <textarea
            placeholder="문장을 입력하세요"
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />

          {/* 평가 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? "평가 중..." : "유해성 평가하기"}
          </button>
        </form>

        {/* 결과 박스 */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700">
            오류가 발생했습니다: {error}
          </div>
        )}

        {score !== null && !isLoading && !error && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
            <p className="text-sm text-gray-500">유해성 점수</p>
            <p className="text-3xl font-bold text-red-500">{score} / 10</p>
          </div>
        )}
      </div>
    </div>
  );
}
