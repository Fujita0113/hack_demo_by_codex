import { CheckCircle2, Sparkles, Star } from "lucide-react";
import type { AIFeedback } from "@/lib/mock";

type Props = {
  feedback: AIFeedback;
};

export function FeedbackCard({ feedback }: Props) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <Sparkles size={18} />
          AIフィードバック
        </div>
        <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          {feedback.rating.toFixed(1)}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{feedback.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{feedback.content}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {feedback.highlights.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
          >
            <CheckCircle2 size={14} className="text-emerald-600" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
