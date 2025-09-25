// src/components/SponsoredTrees.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

// ✅ 헤더 추가
import Header from "@/components/header";

export default function TreeNowPage() {
  const items = [
    { src: "/images/tree/tree1.png", label: "나무1" },
    { src: "/images/tree/tree2.png", label: "나무 2" },
    { src: "/images/tree/tree3.png", label: "나무 3" },
    { src: "/images/tree/tree4.png", label: "나무 4" },
  ];

  return (
    <div className="bg-[#F6F7F9]">
      {/* ✅ 최상단 헤더 */}
      <Header />

      <section className="mx-auto max-w-[420px] px-5 py-6">
        <h2 className="mb-4 text-[22px] font-extrabold tracking-tight">
          후원 나무 현황
        </h2>

        <div className="grid grid-cols-2 gap-5">
          {items.map((it) => (
            <Link
              key={it.label}
              href="/tree"
              className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-[1px]"
            >
              <div className="relative mx-auto h-40 w-full">
                <Image
                  src={it.src}
                  alt={it.label}
                  fill
                  className="object-contain"
                  sizes="(max-width: 420px) 50vw, 200px"
                  priority={false}
                />
              </div>
              <div className="mt-3 text-center text-[20px] font-extrabold">
                {it.label}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
