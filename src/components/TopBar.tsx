"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pageNames: Record<string, string> = {
  "/dashboard": "ホーム",
  "/timer": "タイマー",
  "/calendar": "カレンダー",
  "/analytics": "分析レポート",
  "/report/new": "日報作成",
};

export function TopBar() {
  const pathname = usePathname();
  
  // パスに基づいて画面名を取得
  const getPageName = () => {
    // 完全一致
    if (pageNames[pathname]) {
      return pageNames[pathname];
    }
    // 動的ルートの処理
    if (pathname.startsWith("/report/")) {
      // /report/[id] の場合は "日報詳細"
      if (pathname !== "/report/new" && pathname !== "/report/result") {
        return "日報詳細";
      }
      // /report/result の場合は "分析結果"
      if (pathname === "/report/result") {
        return "分析結果";
      }
    }
    // デフォルト
    return "ホーム";
  };

  const pageName = getPageName();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/70 bg-white/80 px-4 py-3 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:backdrop-blur">
      <div className="flex flex-1 items-center gap-4">
        <h1 className="text-xl font-bold text-slate-900">{pageName}</h1>
      </div>
      <div className="flex flex-1 items-center justify-end gap-3 lg:gap-4">
        <Link
          href="/timer"
          className="hidden items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-500/90 lg:inline-flex"
        >
          <Plus size={16} />
          作業開始
        </Link>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-sm font-bold text-white shadow-md shadow-emerald-300/40">
          YK
        </div>
      </div>
    </header>
  );
}
