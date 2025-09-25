"use client";

import { logIn } from "@/api/auth";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { checking, isLoggedIn } = useAuthGuard({ mode: "gotoHome" });

  const router = useRouter();
  const [form, setForm] = useState({ id: "", password: "" });
  const [errorMsg, setErrorMsg] = useState<string>("");

  if (checking || isLoggedIn) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      await logIn(form.id, form.password);
      router.push("/home");
    } catch (err) {
      console.error("로그인 에러:", err);
      setErrorMsg("로그인 중 오류가 발생했습니다.");
    }
  };

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
      {/* Body */}
      <main className="flex-1 px-5 py-8 flex flex-col justify-center">
        {/* Brand zone */}
        <div className="mb-14 flex items-center justify-center gap-3">
          {/* 👉 네가 이미지 교체: 빈 src 그대로 둠 */}
          <Image
            src="/images/Ellipse2.png"
            width={32}
            height={32}
            alt="brand-logo"
            className="h-8 w-8 rounded-full shadow"
          />
          <div className="text-[28px] font-extrabold tracking-tight text-sky-500 ">
            그린스퀘어
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 아이디 */}
          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-gray-700">
              아이디
            </label>
            <input
              name="id"
              type="text"
              value={form.id}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              className="
                h-12 w-full rounded-2xl
                border-0 ring-1 ring-gray-200
                bg-white px-4 text-[15px]
                placeholder:text-gray-400
                focus:ring-2 focus:ring-blue-500 focus:outline-none
              "
            />
          </div>

          {/* 비밀번호 */}
          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-gray-700">
              비밀번호
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              className="
                h-12 w-full rounded-2xl
                border-0 ring-1 ring-gray-200
                bg-white px-4 text-[15px]
                placeholder:text-gray-400
                focus:ring-2 focus:ring-blue-500 focus:outline-none
              "
            />
          </div>

          {/* 로그인 CTA */}
          <button
            type="submit"
            className="
              mt-2 h-12 w-full rounded-xl
              bg-[#3B82F6] text-white text-[15px] font-semibold
              shadow-md active:translate-y-[1px]
              transition cursor-pointer
            "
          >
            로그인
          </button>
        </form>

        {/* Social logins */}
        <div className="mt-8 flex items-center justify-center gap-6">
          {/* Google (동작) */}
          <button
            className="
              flex h-12 w-12 items-center justify-center rounded-full
              border border-gray-200 bg-white shadow-sm
              hover:bg-gray-50 active:translate-y-[1px] transition
            "
            // 실제 구글 로그인 연동 시 onClick 연결
            type="button"
          >
            <Image
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              width={24}
              height={24}
            />
          </button>

          {/* Naver (미구현/비활성) */}
          <button
            type="button"
            aria-disabled
            className="
              flex h-12 w-12 items-center justify-center rounded-full
              border border-gray-200 bg-white shadow-sm
              opacity-50 cursor-not-allowed
            "
            title="Naver 로그인(준비중)"
          >
            {/* 로고 이미지는 추후 교체 */}
            <span className="text-[15px] font-bold text-gray-400">N</span>
          </button>

          {/* Kakao (미구현/비활성) */}
          <button
            type="button"
            aria-disabled
            className="
              flex h-12 w-12 items-center justify-center rounded-full
              border border-gray-200 bg-white shadow-sm
              opacity-50 cursor-not-allowed
            "
            title="Kakao 로그인(준비중)"
          >
            {/* 로고 이미지는 추후 교체 */}
            <span className="text-[15px] font-bold text-gray-400">K</span>
          </button>
        </div>

        {/* 회원가입 링크 */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/register")}
            className="text-[13px] font-medium text-gray-700 underline underline-offset-4 cursor-pointer"
          >
            회원가입
          </button>
        </div>
      </main>
    </div>
  );
}
