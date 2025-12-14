type Props = {
  seconds: number;
  status?: "idle" | "running" | "paused";
  label?: string;
};

export function TimerDisplay({
  seconds,
  status = "idle",
  label = "計測時間",
}: Props) {
  const formatted = formatTime(seconds);

  return (
    <div className="glass-card flex flex-col items-center justify-center rounded-3xl px-6 py-8 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-5xl font-bold tabular-nums text-slate-900 sm:text-6xl">
        {formatted}
      </p>
      <span
        className={`mt-3 rounded-full px-3 py-1 text-xs font-semibold ${
          status === "running"
            ? "bg-emerald-50 text-emerald-700"
            : status === "paused"
              ? "bg-amber-50 text-amber-700"
              : "bg-slate-100 text-slate-600"
        }`}
      >
        {status === "running"
          ? "計測中"
          : status === "paused"
            ? "一時停止中"
            : "待機"}
      </span>
    </div>
  );
}

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
