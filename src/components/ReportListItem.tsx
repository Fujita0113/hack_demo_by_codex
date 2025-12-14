import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Report } from "@/lib/mock";

type Props = {
  report: Report;
};

export function ReportListItem({ report }: Props) {
  return (
    <Link
      href={`/report/${report.id}`}
      className="glass-card block rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            {formatDate(report.date)} ・ {report.duration.toFixed(1)}h
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            {report.summary}
          </h3>
        </div>
        <ArrowRight size={18} className="text-slate-400" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {report.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
          >
            {topic}
          </span>
        ))}
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-slate-600">{report.body}</p>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        AIのひとこと: {report.aiFeedback.title}
      </div>
    </Link>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    month: "short",
    day: "numeric",
    weekday: "short",
  });
}
