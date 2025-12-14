import Link from "next/link";
import { ArrowUpRight, Sparkles, TimerReset } from "lucide-react";
import { FeedbackCard } from "@/components/FeedbackCard";
import { ReportListItem } from "@/components/ReportListItem";
import { TimerDisplay } from "@/components/TimerDisplay";
import { reports, timerPreset, user } from "@/lib/mock";

export default function DashboardPage() {
  const totalHours = reports.reduce((sum, report) => sum + report.duration, 0);
  const avgHours = totalHours / reports.length;
  const latestReport = reports[0];

  return (
    <div className="space-y-8">
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
            本日の作業を開始
          </Link>
          <Link
            href="/report/new"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-500/90"
          >
            日報を作成
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-slate-500">今週の合計</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">
              {totalHours.toFixed(1)}h
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              +6% vs 先週
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            集中モードの利用が増えています。
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-slate-500">平均作業時間</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">
              {avgHours.toFixed(1)}h
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              安定
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            午前の深い集中が続いています。
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">計測中</p>
              <p className="text-lg font-semibold text-slate-900">
                {timerPreset.task}
              </p>
            </div>
            <Link
              href="/timer"
              className="text-xs font-semibold text-emerald-600 hover:underline"
            >
              開く
            </Link>
          </div>
          <div className="mt-3">
            <TimerDisplay
              seconds={timerPreset.elapsedSeconds}
              status="running"
              label="現在のセッション"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                最近の日報
              </p>
              <h2 className="text-xl font-semibold text-slate-900">
                新しい順に表示
              </h2>
            </div>
            <Link
              href="/report/new"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:underline"
            >
              もっと書く
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="grid gap-4">
            {reports.map((report) => (
              <ReportListItem key={report.id} report={report} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <FeedbackCard feedback={latestReport.aiFeedback} />
          <div className="glass-card rounded-2xl p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <Sparkles size={18} />
              AIの一言
            </div>
            <p className="text-sm leading-6 text-slate-600">
              「ダッシュボードの余白と配色が安定してきました。次は
              タイマーのモバイル動線を整えると、完了率がさらに上がります。」
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
