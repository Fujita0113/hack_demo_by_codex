import { BarChart3, LineChart, Sparkles } from "lucide-react";
import { FeedbackCard } from "@/components/FeedbackCard";
import { aiSummary, monthlyHours, reports, weeklyHours } from "@/lib/mock";

const latestFeedback = reports[0].aiFeedback;

export default function AnalyticsPage() {
  const weeklyMax = Math.max(...weeklyHours.map((d) => d.value));
  const monthlyMax = Math.max(...monthlyHours.map((d) => d.value));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-slate-500">分析</p>
        <h1 className="text-3xl font-bold text-slate-900">
          週間 / 月間のざっくり可視化
        </h1>
      </div>

      <div className="glass-card rounded-3xl p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <BarChart3 size={16} />
            週間
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
            <LineChart size={16} />
            月間
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-500">
              週間: 作業時間の推移
            </p>
            <div className="flex items-end gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              {weeklyHours.map((day) => (
                <div key={day.label} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-full bg-emerald-400 shadow-md shadow-emerald-200/60"
                    style={{
                      height: `${(day.value / weeklyMax) * 180}px`,
                    }}
                  />
                  <span className="text-xs font-semibold text-slate-500">
                    {day.label}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {day.value}h
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-slate-500">
              月間: 週ごとの積み上げ
            </p>
            <div className="flex items-end gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-inner shadow-slate-200/60">
              {monthlyHours.map((week) => (
                <div key={week.label} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-2xl bg-gradient-to-t from-emerald-200 via-emerald-400 to-emerald-600 shadow-md shadow-emerald-200/50"
                    style={{
                      height: `${(week.value / monthlyMax) * 180}px`,
                    }}
                  />
                  <span className="text-xs font-semibold text-slate-500">
                    {week.label}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {week.value}h
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-slate-500">週間合計</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">28.5h</p>
            <p className="text-xs font-semibold text-emerald-600">
              +3.1h 先週より増
            </p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-slate-500">平均セッション</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">52分</p>
            <p className="text-xs font-semibold text-slate-600">
              集中モードの維持が良好
            </p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-slate-500">モバイル完了率</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">86%</p>
            <p className="text-xs font-semibold text-emerald-600">
              下部タブ導入の効果
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <FeedbackCard feedback={latestFeedback} />
          <div className="glass-card rounded-2xl p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <Sparkles size={18} />
              AI総括
            </div>
            <p className="text-sm leading-6 text-slate-600">{aiSummary.weekly}</p>
            <div className="mt-3 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
              次週の提案: {aiSummary.nextGoal}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
