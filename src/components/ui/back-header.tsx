// src/components/BackHeader.tsx
"use client";

import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import React from "react";

export default function BackHeader({
  title,
  onBack,
}: {
  title?: string;
  onBack?: () => void;
}) {
  const router = useRouter();

  return (
    <header
      className="w-full sticky top-0 z-40 bg-white/90 backdrop-blur"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="h-12 flex items-center">
        <button
          type="button"
          onClick={() => (onBack ? onBack() : router.back())}
          className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full
                     text-gray-700 hover:bg-gray-100 active:scale-[0.98]
                     transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="뒤로가기"
        >
          <IoChevronBack size={22} />
        </button>

        {title && (
          <h1 className="ml-1 text-[16px] font-semibold text-gray-900">
            {title}
          </h1>
        )}
      </div>
    </header>
  );
}
