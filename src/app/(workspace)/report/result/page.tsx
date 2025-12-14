"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Loader2, Stamp } from "lucide-react";
import { FeedbackCard } from "@/components/FeedbackCard";
import { reports } from "@/lib/mock";

const feedback = reports[0].aiFeedback;

export default function ReportResultPage() {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const timer1 = window.setTimeout(() => setPhase(2), 1400);
    const timer2 = window.setTimeout(() => setPhase(3), 2600);
    return () => {
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-slate-500">分析フェーズ</p>
        <h1 className="text-3xl font-bold text-slate-900">
          スタンプ演出 → 結果表示
        </h1>
      </div>

      <div className="glass-card flex flex-col items-center justify-center rounded-3xl p-8 text-center">
        {phase === 1 && (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
            <p className="text-sm font-semibold text-slate-600">
              AIが日報を要約中です…
            </p>
          </div>
        )}
        {phase === 2 && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <Stamp size={32} className="animate-bounce" />
            </div>
            <p className="text-sm font-semibold text-slate-600">
              スタンプを押しています…
            </p>
          </div>
        )}
        {phase === 3 && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-200">
              <Check size={28} />
            </div>
            <p className="text-sm font-semibold text-slate-600">
              生成が完了しました！
            </p>
          </div>
        )}
      </div>

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
