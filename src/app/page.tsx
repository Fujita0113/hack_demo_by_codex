import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle, Shield, Timer, Wand2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
            Flowlog • 集中とふりかえりをひとつに
          </div>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            毎日のリズムを整える
            <span className="text-emerald-600"> タイムトラッカー</span>と
            <br />
            やさしい日報UI
          </h1>
          <p className="text-lg text-slate-600">
            タイマー、カレンダー、AIフィードバックまでワンストップ。
            PepperのDeals画面を意識した、整然としたSaaSトーンのUIをそのまま体験できます。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-500/90"
            >
              ダッシュボードに入る
              <ArrowRight size={18} />
            </Link>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#4285f4] ring-1 ring-slate-200">
                G
              </span>
              Googleではじめる（UIのみ）
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <FeatureChip icon={<Timer size={18} />} title="秒単位の計測" />
            <FeatureChip icon={<Wand2 size={18} />} title="AIサマリ付き" />
            <FeatureChip icon={<Shield size={18} />} title="認証UIのみ実装" />
          </div>
        </div>
        <div className="w-full max-w-xl rounded-3xl border border-white/70 bg-white/80 p-8 shadow-xl shadow-emerald-50 backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">プレビュー</p>
              <h2 className="text-xl font-semibold text-slate-900">
                今日のサマリ
              </h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              mock data
            </span>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">計測中のタスク</p>
                  <h3 className="text-lg font-semibold text-slate-900">
                    UI刷新のまとめ作成
                  </h3>
                </div>
                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                  作業中
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm">
                  00:42:18
                </div>
                <div className="text-xs text-slate-500">
                  日報作成まであと少し…
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <PlayCircle size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">AIフィードバック</p>
                    <p className="text-base font-semibold text-slate-900">
                      「チーム共有が分かりやすい構成でした」
                    </p>
                  </div>
                </div>
                <Link
                  href="/report/result"
                  className="text-sm font-semibold text-emerald-600 hover:underline"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureChip({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
      <span className="text-emerald-600">{icon}</span>
      {title}
    </div>
  );
}
