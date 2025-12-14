import Link from "next/link";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { calendarMarks } from "@/lib/mock";

const currentYear = 2025;
const currentMonth = 2; // February
const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

const shades = {
  1: "bg-emerald-50 text-emerald-700 border-emerald-100",
  2: "bg-emerald-100 text-emerald-800 border-emerald-200",
  3: "bg-emerald-200 text-emerald-900 border-emerald-300",
  4: "bg-emerald-300 text-emerald-900 border-emerald-400",
};

export default function CalendarPage() {
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-slate-500">カレンダー</p>
        <h1 className="text-3xl font-bold text-slate-900">
          継続状況をざっくり把握
        </h1>
      </div>

      <div className="glass-card rounded-3xl p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <CalendarIcon size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">月切替</p>
              <p className="text-lg font-semibold text-slate-900">
                {currentYear}年 {currentMonth}月
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50">
              <ChevronLeft size={18} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-500">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-2">
          {dates.map((day) => {
            const dateString = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const mark = calendarMarks[dateString];
            const content = (
              <div
                className={`flex aspect-square flex-col items-center justify-center rounded-xl border text-sm font-semibold ${
                  mark
                    ? `${shades[mark.level]}`
                    : "border-dashed border-slate-200 bg-white text-slate-500"
                }`}
              >
                <span>{day}</span>
                {mark && (
                  <span className="mt-1 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                    {mark.level}h
                  </span>
                )}
              </div>
            );

            if (mark?.reportId) {
              return (
                <Link key={day} href={`/report/${mark.reportId}`}>
                  {content}
                </Link>
              );
            }

            return <div key={day}>{content}</div>;
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
          <Legend color={shades[4]} label="濃い=作業量多め" />
          <Legend color={shades[2]} label="中=通常" />
          <Legend color="border-slate-200 bg-white text-slate-500" label="未入力" />
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1">
      <span className={`h-3 w-3 rounded-full border ${color}`} />
      <span className="text-xs font-semibold text-slate-600">{label}</span>
    </div>
  );
}
