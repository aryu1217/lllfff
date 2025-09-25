// src/components/PAHLineChart.tsx
"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/** 1~12월 값 (null 이면 결측) */
export type MonthlyPAH = {
  [month in 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12]: number | null;
};

export interface PAHLineChartProps {
  values?: MonthlyPAH; // API로 치환 예정
  title?: string;
  className?: string;
}

/* ------------ 기본 더미 데이터 (나중에 API로 교체) ------------ */
export const defaultPAHValues: MonthlyPAH = {
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

/* ------------ 유틸: 1~12월 레이블 & 차트 데이터 변환 ------------ */
const MONTH_LABELS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

function toChartData(values: MonthlyPAH) {
  return MONTH_LABELS.map((label, i) => ({
    label,
    month: i + 1,
    value: values[(i + 1) as keyof MonthlyPAH],
  }));
}

/* ------------ 커스텀 Tooltip 타입 & 컴포넌트 ------------ */
// 리차트가 전달하는 payload 구조의 최소타입을 직접 정의 (any 사용 X)
type TooltipDatum = {
  value: number | null;
  payload: {
    label: string;
    month: number;
    value: number | null;
  };
};

type TinyTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: TooltipDatum[];
};

function TinyTooltip({ active, payload, label }: TinyTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const p = payload[0];
  return (
    <div className="rounded-md bg-white px-2 py-1 text-xs shadow ring-1 ring-black/5">
      <span className="font-semibold">{String(label)}</span>
      <span className="ml-2 text-gray-600">{p.value ?? "-"}</span>
    </div>
  );
}

/* ------------ 메인 컴포넌트 ------------ */
export default function PAHLineChart({
  values = defaultPAHValues,
  title = "PAH에 대한 시계열 라인",
  className = "",
}: PAHLineChartProps) {
  const data = toChartData(values);

  // y축 상한/하한 보기 좋게
  const vals = data.map((d) => d.value ?? 0);
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  const pad = Math.max(2, Math.round((max - min) * 0.1));
  const domain: [number, number] = [Math.max(0, min - pad), max + pad];

  return (
    <section
      className={`rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 ${className}`}
    >
      <h2 className="mb-4 text-center text-[24px] font-extrabold tracking-tight">
        {title}
      </h2>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 12, bottom: 12, left: 0 }}
          >
            <defs>
              <linearGradient id="pahGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22A6F2" />
                <stop offset="100%" stopColor="#7A3FF2" />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fontWeight: 700 }}
              tickMargin={8}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              domain={domain}
              width={30}
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
            />
            <Tooltip content={<TinyTooltip />} />

            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#pahGradient)"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 5 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
