"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Plus, X } from "lucide-react";
import { reports } from "@/lib/mock";

const today = reports[0];
// 先週の同日の作業時間（ダミー値）
const lastWeekDuration = 4.5;
const comparison = today.duration - lastWeekDuration;
const comparisonPercent = ((comparison / lastWeekDuration) * 100).toFixed(1);

export default function ReportNewPage() {
  const [bodyText, setBodyText] = useState("");
  const [tags, setTags] = useState<string[]>(today.topics);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyText(e.target.value);
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
      setNewTagInput("");
      setIsAddingTag(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === "Escape") {
      setIsAddingTag(false);
      setNewTagInput("");
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-slate-500">日報作成</p>
        <h1 className="text-3xl font-bold text-slate-900">今日のまとめを書く</h1>
      </div>

      {/* 実績フィードバック */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-slate-500">本日の確定作業時間</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {today.duration.toFixed(1)}h
          </p>
          <p className="mt-2 text-sm text-slate-600">
            先週比:{" "}
            <span
              className={`font-semibold ${
                comparison >= 0 ? "text-emerald-600" : "text-slate-500"
              }`}
            >
              {comparison >= 0 ? "+" : ""}
              {comparison.toFixed(1)}h ({comparisonPercent}%)
            </span>
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-slate-500">AIのねぎらい</p>
          <p className="mt-2 text-base font-semibold text-slate-900">
            {comparison > 0
              ? `「先週から見ると作業時間が増えていますね！素晴らしい継続です。」`
              : `「作業時間が少なくても継続しているだけで偉いです。頑張れる時に頑張ればいいんです。」`}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Sparkles size={14} />
            モックです
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">タグ</p>
            {!isAddingTag && (
              <button
                onClick={() => setIsAddingTag(true)}
                className="flex items-center justify-center rounded-full bg-emerald-500 p-1.5 text-white shadow-sm transition hover:bg-emerald-600"
                aria-label="タグを追加"
              >
                <Plus size={16} />
              </button>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="group relative inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 pr-1.5 text-xs font-semibold text-slate-700"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="flex items-center justify-center rounded-full bg-slate-200 p-0.5 text-slate-600 opacity-0 transition hover:bg-slate-300 hover:text-slate-800 group-hover:opacity-100"
                  aria-label={`${tag}を削除`}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            {isAddingTag && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={() => {
                    if (!newTagInput.trim()) {
                      setIsAddingTag(false);
                    }
                  }}
                  placeholder="タグを入力"
                  className="h-7 rounded-full border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                  autoFocus
                />
                <button
                  onClick={handleAddTag}
                  className="flex items-center justify-center rounded-full bg-emerald-500 p-1.5 text-white shadow-sm transition hover:bg-emerald-600"
                  aria-label="追加"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm font-semibold text-slate-700">
          日報本文（自由入力・UIのみ）
        </label>
        <textarea
          className="mt-3 min-h-[180px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-inner shadow-slate-200 outline-none placeholder:text-slate-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          placeholder="今日やったこと、詰まったこと、次の一歩を書き残してください。例：今日はNext.jsについて触った。認証処理に詰まった。疲れた"
          value={bodyText}
          onChange={handleChange}
        />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            送信すると分析フェーズ（モック）に遷移します。
          </p>
          <Link
            href="/report/result"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-500/90"
          >
            送信して分析する
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
