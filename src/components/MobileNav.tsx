"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./Sidebar";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-xl shadow-slate-400/10 lg:hidden">
      {navItems.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs font-semibold transition ${
              active
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <span className="flex h-8 w-8 items-center justify-center">
              <Icon size={18} strokeWidth={2} />
            </span>
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
