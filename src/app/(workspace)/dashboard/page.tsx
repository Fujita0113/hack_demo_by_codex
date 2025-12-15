import Link from "next/link";
import { TimerReset } from "lucide-react";
import { ReportListItem } from "@/components/ReportListItem";
import { TimerDisplay } from "@/components/TimerDisplay";
import { reports, timerPreset, user } from "@/lib/mock";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* A. ヘッダーエリア */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            おかえりなさい、{user.name}さん
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <Link
            href="/timer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
          >
            <TimerReset size={16} />
            タイマーへ移動
          </Link>
        </div>
      </div>

      {/* B. タイムラインエリア (画面下部) - 最近の日報カードリスト */}
      <div className="space-y-4">
        {reports.map((report) => (
          <ReportListItem key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}
