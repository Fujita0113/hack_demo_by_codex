"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { calendarMarks } from "@/lib/mock";

const shades = {
  1: "bg-emerald-50 text-emerald-700 border-emerald-100",
  2: "bg-emerald-100 text-emerald-800 border-emerald-200",
  3: "bg-emerald-200 text-emerald-900 border-emerald-300",
  4: "bg-emerald-300 text-emerald-900 border-emerald-400",
};

export default function CalendarPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [showModal, setShowModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const firstDayWeekday = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, ...
  // 月曜日始まりに変換（0=日曜日を6に、1=月曜日を0に）
  const startOffset = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;

  const handlePreviousMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleOpenModal = () => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setShowModal(true);
  };

  const handleApplyDate = () => {
    setYear(selectedYear);
    setMonth(selectedMonth);
    setShowModal(false);
  };

  // カレンダーの日付配列を生成（前月の空白 + 今月の日付）
  const calendarDays: (number | null)[] = [];
  // 前月の空白を追加
  for (let i = 0; i < startOffset; i++) {
    calendarDays.push(null);
  }
  // 今月の日付を追加
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const years = Array.from({ length: 10 }, (_, i) => now.getFullYear() - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900">
          継続状況をざっくり把握
        </h1>
      </div>

      <div className="glass-card rounded-3xl p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <CalendarIcon size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">月切替</p>
              <p className="text-lg font-semibold text-slate-900">
                {year}年 {month}月
              </p>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousMonth}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextMonth}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
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
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const dateString = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
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

      {/* モーダル */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="glass-card w-full max-w-md rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">年月選択</p>
                <h3 className="text-xl font-semibold text-slate-900">
                  表示する年月を選択
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  年
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-lg font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}年
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  月
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {months.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMonth(m)}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        selectedMonth === m
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {m}月
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                キャンセル
              </button>
              <button
                onClick={handleApplyDate}
                className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                適用
              </button>
            </div>
          </div>
        </div>
      )}
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
