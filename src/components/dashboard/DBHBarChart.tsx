// src/components/dashboard/DBHBarChart.tsx
"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export type DBHDatum = {
  dbh: number;    // DBH (cm)
  count: number;  // 개체수
};

export interface DBHBarChartProps {
  data: DBHDatum[];
  title?: string;
  unit?: string; // 기본값 "cm"
}

export default function DBHBarChart({
  data,
  title = "DBH 분포",
  unit = "cm",
}: DBHBarChartProps) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h2 className="mb-4 text-center text-[22px] font-extrabold tracking-tight">
        {title}{" "}
        <span className="text-sm font-normal text-gray-500">({unit})</span>
      </h2>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 12, bottom: 12, left: 0 }}
          >
            <defs>
              <linearGradient id="dbhGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4FACFE" />
                <stop offset="100%" stopColor="#8E2DE2" />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="dbh"
              tick={{ fontSize: 12, fontWeight: 700 }}
              tickMargin={8}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              width={30}
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              content={({ active, payload }) => {
                if (!active || !payload || payload.length === 0) return null;
                const p = payload[0];
                return (
                  <div className="rounded-md bg-white px-2 py-1 text-xs shadow ring-1 ring-black/5">
                    <span className="font-semibold">
                      {p.payload.dbh} {unit}
                    </span>
                    <span className="ml-2 text-gray-600">{p.value} 개</span>
                  </div>
                );
              }}
            />

            <Bar
              dataKey="count"
              fill="url(#dbhGradient)"
              radius={[8, 8, 0, 0]} // 위만 둥글게
              barSize={18} // 더 얇게 (기존 28 → 18)
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
