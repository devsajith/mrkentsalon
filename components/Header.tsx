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
          <img 
            src="/logo.jpg" 
            alt="MR.KENT BARBERS Logo" 
            className="w-9 h-9 rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
          />
          <span>
            <span className="block font-extrabold text-base tracking-tight text-text-primary">
              MR.KENT BARBERS
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

        <div className="flex items-center gap-3">
          <Link href="/book/emergency" className="border border-red-600/30 text-red-600 hover:bg-red-50 text-xs font-bold px-4 py-2.5 rounded-full transition-colors">
            Emergency Booking
          </Link>
          <Link href="/book" className="bg-accent text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-accent-light transition-colors shadow-[0_14px_28px_rgba(232,100,44,0.28)]">
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
