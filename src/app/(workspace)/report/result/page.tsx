"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Loader2, Stamp } from "lucide-react";
import { FeedbackCard } from "@/components/FeedbackCard";
import { reports } from "@/lib/mock";

const feedback = reports[0].aiFeedback;

export default function ReportResultPage() {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const today = new Date();
  const todayDate = today.getDate();

  useEffect(() => {
    const timer1 = window.setTimeout(() => setPhase(2), 1400);
    const timer2 = window.setTimeout(() => setPhase(3), 3000);
    return () => {
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Phase 1: 待機 (Loading) */}
      {phase === 1 && (
        <div className="glass-card flex flex-col items-center justify-center rounded-3xl p-8 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
          <p className="mt-3 text-sm font-semibold text-slate-600">
            分析中...
          </p>
        </div>
      )}

      {/* Phase 2: 報酬 (Reward) */}
      {phase === 2 && (
        <div className="space-y-6">
          <div className="glass-card flex flex-col items-center justify-center rounded-3xl p-8 text-center">
            <div className="relative">
              {/* カレンダーの今日の日付に「済」スタンプが押されるアニメーション */}
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-emerald-300 bg-emerald-50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-900">
                    {todayDate}
                  </div>
                  <div className="mt-1 flex items-center justify-center">
                    <Stamp
                      size={24}
                      className="animate-bounce text-emerald-600"
                    />
                  </div>
                  <div className="mt-1 text-xs font-semibold text-emerald-700">
                    済
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 「🔥 3日連続達成！」等のポップアップ */}
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl">🔥</div>
              <p className="text-lg font-bold text-slate-900">3日連続達成！</p>
              <p className="text-sm text-slate-600">
                継続の習慣が身についてきました
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Phase 3: 結果 (Insight) */}
      {phase === 3 && (
        <div className="space-y-4">
          <FeedbackCard feedback={feedback} />
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-500/90"
          >
            ホームに戻る
          </Link>
        </div>
      )}
    </div>
  );
}
