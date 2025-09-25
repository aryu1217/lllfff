// src/components/tab-bar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function TabBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  const HIDE_ROUTES = ["/login", "/register"];
  const shouldHide = HIDE_ROUTES.some(
    (r) => pathname === r || pathname?.startsWith(r + "/")
  );
  if (shouldHide) return null;

  const activeColor = "#22A6F2";
  const inactiveColor = "#D1D5DB";

  return (
    <nav
      className="
        fixed inset-x-0 bottom-0 z-50
        mx-auto max-w-[420px]  pt-3
      "
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)" }}
      aria-label="bottom navigation"
    >
      <div className="rounded-t-[28px] bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.08)] border border-white/80">
        <div className="grid grid-cols-4 items-center justify-items-center py-3">
          <Link href="/home" className="flex flex-col items-center gap-1.5">
            <HomeIcon size={28} color={inactiveColor} />
            <span className="text-xs font-semibold text-gray-300">홈</span>
          </Link>

          <Link href="/tree" className="flex flex-col items-center gap-1.5">
            <TreeIcon
              size={28}
              color={isActive("/tree") ? activeColor : inactiveColor}
            />
            <span
              className={`text-xs font-semibold ${
                isActive("/tree") ? "text-sky-500" : "text-gray-300"
              }`}
            >
              나무
            </span>
          </Link>

          <Link href="/donate" className="flex flex-col items-center gap-1.5">
            <DonateIcon
              size={28}
              color={isActive("/donate") ? activeColor : inactiveColor}
            />
            <span
              className={`text-xs font-semibold ${
                isActive("/donate") ? "text-sky-500" : "text-gray-300"
              }`}
            >
              기부
            </span>
          </Link>

          <Link href="/profile" className="flex flex-col items-center gap-1.5">
            <ProfileIcon
              size={28}
              color={isActive("/profile") ? activeColor : inactiveColor}
            />
            <span
              className={`text-xs font-semibold ${
                isActive("/profile") ? "text-sky-500" : "text-gray-300"
              }`}
            >
              프로필
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* --- SVG 아이콘 (그대로 사용) --- */
function HomeIcon({
  size = 28,
  color = "#D1D5DB",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z"
        fill={color}
      />
    </svg>
  );
}
function TreeIcon({
  size = 28,
  color = "#22A6F2",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c4.2 3.9 6.3 7.3 6.3 10.1A6.3 6.3 0 1 1 5.7 12.1C5.7 9.3 7.8 5.9 12 2Z"
        fill={color}
      />
      <path d="M12 12v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M12 12c0-2 1.3-3 3-3"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 12c0-2-1.3-3-3-3"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function DonateIcon({
  size = 28,
  color = "#D1D5DB",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M7 10h10l1.5 3.5A2 2 0 0 1 16.7 16H7.3a2 2 0 0 1-1.8-2.5L7 10Z"
        fill={color}
      />
      <circle cx="16" cy="9" r="2" fill={color} />
    </svg>
  );
}
function ProfileIcon({
  size = 28,
  color = "#D1D5DB",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8.5" r="3.5" fill={color} />
      <path
        d="M4 19c1.8-3.2 5-5 8-5s6.2 1.8 8 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
