import Link from "next/link";
import { ArrowLeft, Clock3, TrendingUp, Flame } from "lucide-react";
import { FeedbackCard } from "@/components/FeedbackCard";
import { reports } from "@/lib/mock";

// 日付文字列（YYYY-MM-DD）から7日前の日付文字列を取得
function getLastWeekDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() - 7);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// 日付文字列（YYYY-MM-DD）から1日前の日付文字列を取得
function getPreviousDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() - 1);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// 先週の同じ曜日のレポートを取得
function getLastWeekSameDayReport(currentDate: string): { duration: number } | null {
  const lastWeekDateStr = getLastWeekDate(currentDate);
  const lastWeekReport = reports.find((r) => r.date === lastWeekDateStr);
  
  return lastWeekReport ? { duration: lastWeekReport.duration } : null;
}

// 連続作業日数を計算
function calculateConsecutiveDays(currentDate: string): number {
  const reportDates = new Set(reports.map((r) => r.date));
  
  let consecutiveDays = 0;
  let checkDate = currentDate;
  
  while (reportDates.has(checkDate)) {
    consecutiveDays++;
    checkDate = getPreviousDate(checkDate);
  }
  
  return consecutiveDays;
}

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = reports.find((item) => item.id === id);

  if (!report) {
    return (
      <div className="space-y-4">
        <p className="text-sm font-semibold text-slate-500">日報詳細</p>
        <h1 className="text-2xl font-bold text-slate-900">データがありません</h1>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:underline"
        >
          <ArrowLeft size={16} />
          ダッシュボードに戻る
        </Link>
      </div>
    );
  }

  const date = new Date(report.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  // 先週比を計算
  const lastWeekReport = getLastWeekSameDayReport(report.date);
  let comparisonPercent: number | null = null;
  if (lastWeekReport) {
    const comparison = report.duration - lastWeekReport.duration;
    comparisonPercent = (comparison / lastWeekReport.duration) * 100;
  }

  // 連続作業日数を計算
  const consecutiveDays = calculateConsecutiveDays(report.date);

  return (
    <div className="space-y-6">
      {/* 統計バナー */}
      <div className="grid gap-4 md:grid-cols-2">
        {comparisonPercent !== null && (
          <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={24} className="text-emerald-600" />
              <p className="text-sm font-semibold text-emerald-700">先週比</p>
            </div>
            <p className="text-4xl font-bold text-emerald-900">
              {comparisonPercent >= 0 ? "+" : ""}
              {comparisonPercent.toFixed(1)}%
            </p>
            <p className="mt-1 text-sm text-emerald-700">
              {comparisonPercent >= 0 ? "増" : "減"}！（同じ曜日から計算）
            </p>
          </div>
        )}
        {consecutiveDays > 0 && (
          <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-200">
            <div className="flex items-center gap-3 mb-2">
              <Flame size={24} className="text-orange-600" />
              <p className="text-sm font-semibold text-orange-700">連続作業</p>
            </div>
            <p className="text-4xl font-bold text-orange-900">
              {consecutiveDays}日
            </p>
            <p className="mt-1 text-sm text-orange-700">連続作業中！</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">日報詳細</p>
          <h1 className="text-3xl font-bold text-slate-900">{date}</h1>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Clock3 size={14} />
            {report.duration.toFixed(1)}h
          </div>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
          戻る
        </Link>
      </div>

      <div className="glass-card space-y-3 rounded-2xl p-5">
        <div className="flex flex-wrap gap-2">
          {report.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {topic}
            </span>
          ))}
        </div>
        <p className="text-sm leading-7 text-slate-700 whitespace-pre-line">
          {report.body}
        </p>
      </div>

      <FeedbackCard feedback={report.aiFeedback} />
    </div>
  );
}
