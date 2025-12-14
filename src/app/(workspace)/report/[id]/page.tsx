import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { FeedbackCard } from "@/components/FeedbackCard";
import { reports } from "@/lib/mock";

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

  return (
    <div className="space-y-6">
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
