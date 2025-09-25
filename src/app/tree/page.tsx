import TreeRegisterList from "@/components/tree-register-list";
import { treeRegisterItems } from "@/data/tree-register";
import Link from "next/link";

// ✅ 헤더 추가
import Header from "@/components/header";

export default function TreePage() {
  return (
    <div
      className="mx-auto max-w-[420px] bg-[#F6F7F9] min-h-screen flex flex-col"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* ✅ 최상단 헤더 */}
      <Header />

      {/* 본문 */}
      <TreeRegisterList items={treeRegisterItems} />

      <div className="h-28" />

      <div className="pointer-events-none z-40">
        <div
          className="mx-auto w-full max-w-[420px] px-5 pb-4"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)" }}
        >
          <Link
            href="/tree/add-tree"
            className="pointer-events-auto flex h-12 w-full items-center justify-center
             rounded-full bg-gradient-to-r from-sky-400 to-violet-500
             text-white text-[16px] font-semibold shadow-lg hover:brightness-105"
          >
            추가하기
          </Link>
        </div>
      </div>
    </div>
  );
}
