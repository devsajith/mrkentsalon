"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LogoutButton from "./LogOutButton";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      name: "Bookings",
      href: "/admin/bookings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: "Services",
      href: "/admin/services",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-4.879-4.879L14.12 12m0 2.121L12.5 12.5M19 19l-4.879-4.879m4.879 4.879l-1.5-1.5M12.5 12.5a3.5 3.5 0 11-4.95-4.95 3.5 3.5 0 014.95 4.95z" />
        </svg>
      )
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Mobile Sticky Top Header */}
      <div className="flex md:hidden items-center justify-between bg-black text-white px-5 py-4 sticky top-0 z-40 border-b border-white/10 shadow-md w-full">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-extrabold text-xs shadow-[0_8px_16px_rgba(232,100,44,0.25)]">
            MK
          </span>
          <div>
            <h2 className="text-xs font-black tracking-wider uppercase text-accent leading-none">
              MR.KENT BARBERS Admin
            </h2>
            <p className="text-[8px] text-text-muted mt-0.5 font-bold uppercase tracking-wider leading-none">Management</p>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden"
        />
      )}

      {/* Mobile Slide-out Drawer Menu */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-black text-white p-6 flex flex-col justify-between shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black tracking-wider uppercase text-accent">
                MR.KENT BARBERS
              </h2>
              <p className="text-[10px] text-text-muted mt-1 font-semibold uppercase tracking-wider">Management Portal</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-accent text-white shadow-lg shadow-accent/15"
                      : "text-text-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10">
          <LogoutButton />
        </div>
      </aside>

      {/* Desktop Persistent Sticky Sidebar */}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 bg-black text-white p-6 flex-col justify-between shadow-xl shrink-0">
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-black tracking-wider uppercase text-accent">
              MR.KENT BARBERS
            </h2>
            <p className="text-[10px] text-text-muted mt-1 font-semibold uppercase tracking-wider">Management Portal</p>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-accent text-white shadow-lg shadow-accent/15"
                      : "text-text-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}