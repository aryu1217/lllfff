// src/app/forest/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PlotScoreGauge from "@/components/dashboard/PlotScoreGauge";
import DBHBarChart from "@/components/dashboard/DBHBarChart";
import PAHLineChart, { MonthlyPAH } from "@/components/dashboard/PAHLineChart";

/** 데모 데이터 */
const demoDBH = [
  { dbh: 5, count: 11 },
  { dbh: 10, count: 12 },
  { dbh: 15, count: 13 },
  { dbh: 20, count: 17 },
  { dbh: 25, count: 19 },
  { dbh: 30, count: 14 },
];

const demoPAH: MonthlyPAH = {
  1: 78,
  2: 50,
  3: 38,
  4: 24,
  5: 24,
  6: 18,
  7: 14,
  8: 14,
  9: 14,
  10: 14,
  11: 14,
  12: 14,
};

/** 요약 카드 (제목 파란색, 본문 더미) */
function SummaryCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="min-w-[260px] rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <div className="text-[20px] font-extrabold text-sky-600">{title}</div>
      <div className="mt-2 text-[15px] leading-snug text-gray-800">{body}</div>
    </div>
  );
}

/** 통계 카드 */
function StatCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="rounded-[22px] bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-2 text-[22px] font-bold text-black">
        <span>{label}</span>
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-[12px] leading-none text-gray-400">
          ?
        </span>
      </div>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="bg-gradient-to-r from-sky-500 to-violet-600 bg-clip-text text-[44px] font-extrabold leading-none text-transparent tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="text-[18px] font-semibold text-gray-900">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      className="mx-auto min-h-screen max-w-[680px] bg-[#F6F7F9] text-gray-900 flex flex-col"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* 본문 */}
      <main className="flex-1 px-4 pb-28">
        {/* AI 요약 */}
        <section className="mb-3">
          <div className="mb-2 text-[18px] font-extrabold text-gray-900">
            AI 요약
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
            <SummaryCard title="전체 상태" body="지금 숲은 잘 자라고 있어요." />
            <SummaryCard
              title="성장 추세"
              body="잎이 차오르고 줄기가 서서히 굵어지고 있어요."
            />
            <SummaryCard
              title="어린 나무"
              body="아직 체력이 약해 바람·건조에 민감해요. 보호가 필요합니다."
            />
            <SummaryCard
              title="다음 행동"
              body="번 달엔 보식 몇 그루 + 물주기 강화가 가장 효과적이에요."
            />
          </div>
        </section>

        {/* Plot Score */}
        <section className="mb-4 flex justify-center">
          <div className="w-full rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-black/5">
            <div className="flex justify-center">
              <PlotScoreGauge value={72} />
            </div>
          </div>
        </section>

        {/* DBH 분포 */}
        <section className="mb-4">
          <DBHBarChart data={demoDBH} title="DBH 분포" unit="cm" />
        </section>

        {/* TPH / BA ha */}
        <section className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <StatCard label="TPH" value="2,100" />
          <StatCard label="BA ha" value="25.8" unit="m²/ha" />
        </section>

        {/* PAH 라인 */}
        <section className="mb-4">
          <PAHLineChart values={demoPAH} title="PAH에 대한 시계열 라인" />
        </section>
      </main>
    </div>
  );
}
