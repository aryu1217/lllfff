"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export default function PlotScoreGauge({
  value = 0,
  size = 180,

  // 레이아웃/여백
  topPadding = 36,      // ⬅️ 위쪽에 확보하는 추가 높이(텍스트 안 잘리게)
  bottomPadding = 14,   // 중앙 원 하단 여백
  sidePadding = 12,     // 좌우 여백(잘림 방지)
  stroke = 12,          // 아크 두께
  labelGap = 6,         // ⬅️ 게이지 그림과 "Plot Score" 사이 간격 (작게)
  labelFontSize = 12,   // ⬅️ 구간 텍스트 크기 (조금 더 작게)
}) {
  const v = Math.max(0, Math.min(100, value));

  // 반원 각도
  const startDeg = -90;
  const endDeg = 90;
  const totalDeg = endDeg - startDeg; // 180

  // 고정 분할 비율 [1/5, 3/5, 1/5]
  const segmentFrac = [0.2, 0.6, 0.2];

  // 각 구간 시작/끝 각도
  const segAngles = useMemo(() => {
    const a0 = startDeg;
    const a1 = a0 + totalDeg * segmentFrac[0];
    const a2 = a1 + totalDeg * segmentFrac[1];
    const a3 = endDeg;
    return [a0, a1, a2, a3];
  }, []);

  // 값 → 각도 (구간 내부 선형 보간)
  const needleDeg = useMemo(() => {
    if (v <= 50) {
      const t = (v - 0) / 50;
      return segAngles[0] + (segAngles[1] - segAngles[0]) * t;
    } else if (v <= 80) {
      const t = (v - 50) / 30;
      return segAngles[1] + (segAngles[2] - segAngles[1]) * t;
    } else {
      const t = (v - 80) / 20;
      return segAngles[2] + (segAngles[3] - segAngles[2]) * t;
    }
  }, [v, segAngles]);

  // 캔버스/반지름
  const W = size;
  const H = size * 0.6;           // 반원 높이
  const cx = W / 2;
  const cy = H - bottomPadding;   // 중심을 약간 위로

  // 스트로크/패딩 고려해 r 계산 (잘림 방지)
  const rMaxByWidth  = W / 2 - (sidePadding + stroke / 2);
  const rMaxByHeight = (H - bottomPadding) - stroke / 2;
  const r = Math.max(0, Math.min(rMaxByWidth, rMaxByHeight));

  const polar = (deg, rad = r) => {
    const a = (deg - 90) * (Math.PI / 180);
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  };

  // 아크 path
  const makeArc = (fromDeg, toDeg, strokePaint) => {
    const [x0, y0] = polar(fromDeg);
    const [x1, y1] = polar(toDeg);
    const largeArc = toDeg - fromDeg > 180 ? 1 : 0;
    return (
      <path
        key={`${fromDeg}-${toDeg}`}
        d={`M ${x0} ${y0} A ${r} ${r} 0 ${largeArc} 1 ${x1} ${y1}`}
        stroke={strokePaint}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
      />
    );
  };

  // 바늘 끝 좌표(회전은 g에서 처리)
  const [nx, ny] = polar(0, r * 0.85);

  // 값 변경 시 wobble 재생
  const [animKey, setAnimKey] = useState(0);
  const prevVal = useRef(v);
  useEffect(() => {
    if (prevVal.current !== v) {
      setAnimKey((k) => k + 1);
      prevVal.current = v;
    }
  }, [v]);

  // wobble 키프레임
  const wobbleCSS = useMemo(
    () => `
      @keyframes needle-wobble {
        0%   { transform: rotate(0deg); }
        22%  { transform: rotate(6deg); }
        44%  { transform: rotate(-4deg); }
        66%  { transform: rotate(2.5deg); }
        82%  { transform: rotate(-1deg); }
        92%  { transform: rotate(0.5deg); }
        100% { transform: rotate(0deg); }
      }
    `,
    []
  );

  // 경계 컷(배경색으로 확실히 끊기)
  const renderSeparator = (deg) => {
    const [xOuter, yOuter] = polar(deg, r);
    const [xInner, yInner] = polar(deg, r - stroke);
    return (
      <line
        key={`sep-${deg}`}
        x1={xOuter}
        y1={yOuter}
        x2={xInner}
        y2={yInner}
        stroke="#FFFFFF"
        strokeWidth={stroke * 0.7}
        strokeLinecap="round"
      />
    );
  };

  // 구간 레이블 (구간 중앙 각도, 아크 바깥쪽에 배치)
  const labels = [
    { text: "나쁨", angle: (segAngles[0] + segAngles[1]) / 2, color: "#9b59b6" },
    { text: "보통", angle: (segAngles[1] + segAngles[2]) / 2, color: "#2980b9" },
    { text: "좋음", angle: (segAngles[2] + segAngles[3]) / 2, color: "#3498db" },
  ];

  const renderLabels = () =>
    labels.map((lbl, idx) => {
      const [tx, ty] = polar(lbl.angle, r + 18); // 아크 밖에 살짝
      return (
        <text
          key={idx}
          x={tx}
          y={ty - topPadding} // ⬅️ 전체 그룹을 아래로 내리므로 보정 없이도 OK, 여분 여백 위해 살짝 위로
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={labelFontSize}
          fontWeight="700"
          fill={lbl.color}
        >
          {lbl.text}
        </text>
      );
    });

  return (
    <div
      style={{ width: W }}
      className="flex flex-col items-center"
    >
      <style>{wobbleCSS}</style>

      {/* SVG 높이를 위로 더 키우고, 실제 게이지는 아래로 살짝 내림 */}
      <svg
        width={W}
        height={H + topPadding}
        viewBox={`0 0 ${W} ${H + topPadding}`}
        style={{ overflow: "visible" }}
      >
        {/* 위쪽 텍스트가 안 잘리도록 전체 콘텐츠를 아래로 이동 */}
        <g transform={`translate(0, ${topPadding})`}>
          <defs>
            <linearGradient
              id="gaugeGradient"
              x1={sidePadding}
              y1="0"
              x2={W - sidePadding}
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"  stopColor="#8E2DE2" />
              <stop offset="100%" stopColor="#4FACFE" />
            </linearGradient>
          </defs>

          {/* 아크(그라데이션 유지) */}
          {makeArc(segAngles[0], segAngles[1], "url(#gaugeGradient)")}
          {makeArc(segAngles[1], segAngles[2], "url(#gaugeGradient)")}
          {makeArc(segAngles[2], segAngles[3], "url(#gaugeGradient)")}

          {/* 경계 컷 */}
          {renderSeparator(segAngles[1])}
          {renderSeparator(segAngles[2])}

          {/* 레이블 */}
          {renderLabels()}

          {/* 바늘 */}
          <g
            transform={`rotate(${needleDeg} ${cx} ${cy})`}
            style={{ transition: "transform 420ms cubic-bezier(.2,.8,.2,1)" }}
          >
            <g
              key={animKey}
              style={{
                transformOrigin: `${cx}px ${cy}px`,
                animation: "needle-wobble 1200ms 120ms ease-out both",
              }}
            >
              <polygon
                points={`${cx - 4},${cy} ${cx + 4},${cy} ${nx},${ny}`}
                fill="#2C3E50"
              />
              <circle cx={cx} cy={cy} r={10} fill="#2C3E50" />
            </g>
          </g>
        </g>
      </svg>

      {/* 그림과 타이틀 사이 간격 축소(labelGap) */}
      <div style={{ marginTop: labelGap }} className="text-xl font-extrabold text-black">
        Plot Score
      </div>

      {/* 숫자 표시는 제거 */}
    </div>
  );
}
