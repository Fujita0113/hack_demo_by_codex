"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Edit3, Pause, Play, Power, Sparkles } from "lucide-react";
import { TimerDisplay } from "@/components/TimerDisplay";
import { timerPreset } from "@/lib/mock";

export default function TimerPage() {
  const [seconds, setSeconds] = useState(timerPreset.elapsedSeconds);
  const [status, setStatus] = useState<"running" | "paused" | "idle">("running");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status !== "running") return;
    const id = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [status]);

  const toggle = () => {
    setStatus((prev) => (prev === "running" ? "paused" : "running"));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-slate-500">タイマー</p>
        <h1 className="text-3xl font-bold text-slate-900">
          集中モードを継続中
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <TimerDisplay seconds={seconds} status={status} />
        <div className="glass-card rounded-3xl p-6">
          <p className="text-sm text-slate-500">タスク</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            {timerPreset.task}
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            UIをPepper風に寄せたダッシュボード。影を抑えつつ、カードの浮き感を残しています。
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            <Sparkles size={16} />
            {timerPreset.mood}
          </div>
        </div>
        <div className="glass-card flex flex-col justify-between rounded-3xl p-6">
          <div>
            <p className="text-sm font-semibold text-slate-500">ショートカット</p>
            <p className="mt-2 text-sm text-slate-600">
              2クリックで日報作成へ。時間編集のUIのみ実装しています。
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
            >
              <Edit3 size={16} />
              時間を編集する
            </button>
            <Link
              href="/report/new"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-500/90"
            >
              <Power size={16} />
              作業を終了して日報を作成
            </Link>
          </div>
        </div>
      </div>

      <div className="glass-card flex flex-wrap items-center gap-3 rounded-2xl p-4">
        <button
          onClick={toggle}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 ${
            status === "running"
              ? "bg-amber-500 shadow-amber-200"
              : "bg-emerald-500 shadow-emerald-200"
          }`}
        >
          {status === "running" ? <Pause size={16} /> : <Play size={16} />}
          {status === "running" ? "一時停止" : "再開"}
        </button>
        <div className="text-sm font-semibold text-slate-600">
          タイマーはUIのみです。終了すると日報作成に進めます。
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="glass-card w-full max-w-md rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">時間編集</p>
                <h3 className="text-xl font-semibold text-slate-900">
                  手動で入力（UIのみ）
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                閉じる
              </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {["00", "30", "45"].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-lg font-bold text-slate-900"
                >
                  {item} 分
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-500/90"
            >
              保存（見た目のみ）
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
