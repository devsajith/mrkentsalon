"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Hide header for admin and login routes
  if (pathname?.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  return (
    <header className="hidden md:block border-b border-white/70 bg-white/90 sticky top-0 z-50 shadow-sm backdrop-blur-xl">
      <div className="max-w-[1180px] mx-auto px-6 h-[68px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white font-extrabold text-sm shadow-[0_12px_24px_rgba(232,100,44,0.25)]">
            MK
          </span>
          <span>
            <span className="block font-extrabold text-base tracking-tight text-text-primary">
              Mr. Kent&apos;s Salon
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
              Premium Grooming
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-7 text-sm font-semibold">
          <Link href="/#home" className="text-text-primary hover:text-accent transition-colors">
            Home
          </Link>
          <Link href="/#about" className="text-text-secondary hover:text-accent transition-colors">
            About
          </Link>
          <Link href="/#highlights" className="text-text-secondary hover:text-accent transition-colors">
            Highlights
          </Link>
          <Link href="/#contact" className="text-text-secondary hover:text-accent transition-colors">
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/book" className="bg-accent text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-accent-light transition-colors shadow-[0_14px_28px_rgba(232,100,44,0.28)]">
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
