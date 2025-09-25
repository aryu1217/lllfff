// src/components/Header.tsx
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center px-4 py-2 bg-white">
      <Image
        src="/images/groom.png" // 로고 경로
        alt="그린트리 로고"
        width={32}
        height={32}
        className="mr-2"
      />
      <h1 className="text-lg font-bold text-sky-500">그린트리</h1>
    </header>
  );
}
