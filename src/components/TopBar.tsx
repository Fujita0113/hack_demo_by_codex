import { Bell, HelpCircle, Plus, Search } from "lucide-react";
import Link from "next/link";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/70 bg-white/80 px-4 py-3 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:backdrop-blur">
      <div className="hidden min-w-[320px] items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm shadow-slate-300/10 lg:flex">
        <Search size={16} className="text-slate-400" />
        <input
          placeholder="タスク・日報を検索"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>
      <div className="flex flex-1 items-center justify-end gap-3 lg:gap-4">
        <Link
          href="/report/new"
          className="hidden items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-500/90 lg:inline-flex"
        >
          <Plus size={16} />
          日報を追加
        </Link>
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-0.5 hover:shadow-md">
          <HelpCircle size={18} />
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-0.5 hover:shadow-md">
          <Bell size={18} />
        </button>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-sm font-bold text-white shadow-md shadow-emerald-300/40">
          YK
        </div>
      </div>
    </header>
  );
}
