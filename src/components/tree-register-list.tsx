"use client";

import TreeRegisterCard, { TreeRegisterItem } from "./tree-register-card";

export default function TreeRegisterList({
  title = "나무 등록 현황",
  items,
  className = "",
}: {
  title?: string;
  items: TreeRegisterItem[];
  className?: string;
}) {
  return (
    <section className={`px-5 ${className}`}>
      <h2 className="mb-5 mt-4 text-[22px] font-extrabold tracking-tight text-gray-900">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-8">
        {items.map((item) => (
          <TreeRegisterCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
