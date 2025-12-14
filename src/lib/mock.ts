export type AIFeedback = {
  title: string;
  content: string;
  rating: number;
  highlights: string[];
};

export type Report = {
  id: string;
  date: string; // YYYY-MM-DD
  duration: number; // hours
  topics: string[];
  summary: string;
  body: string;
  aiFeedback: AIFeedback;
};

export const user = {
  name: "Yuki",
  role: "Product Designer",
};

export const reports: Report[] = [
  {
    id: "r-2301",
    date: "2025-02-12",
    duration: 5.2,
    topics: ["UI刷新", "アクセシビリティ"],
    summary: "新しいダッシュボードのカード配置を再設計し、余白と視線誘導を改善。",
    body: "セクション間の余白を広げて情報密度を調整。アクセシビリティ観点でコントラストとフォーカスリングを追加。チームにプレビュー共有し、フィードバック待ち。",
    aiFeedback: {
      title: "整然とした情報配置がGood",
      content:
        "カード間の階層が明確になり、初回アクセス時の理解速度が上がっています。次はスマホ版のCTA優先度を見直すと効果が出そうです。",
      rating: 4.7,
      highlights: ["視線誘導の改善", "コントラスト調整", "チーム共有の速さ"],
    },
  },
  {
    id: "r-2300",
    date: "2025-02-11",
    duration: 4.1,
    topics: ["タイマー改善", "モバイル最適化"],
    summary: "モバイルでの下部タブ試験実装と、残り時間の表示ロジックを整理。",
    body: "集中モードの背景色を抑えめに統一し、再開ボタンの押下遅延を解消。モバイルのタブバーは影と角丸を追加して視認性を確保。",
    aiFeedback: {
      title: "タップ領域の配慮が高評価",
      content:
        "親指の届きやすい位置に主要ボタンが配置され、モバイルでの操作性が向上。次回は短時間タスク用のプリセットも用意するとさらに良さそうです。",
      rating: 4.5,
      highlights: ["タブの視認性", "再開ボタンの改善", "集中モードの一貫性"],
    },
  },
  {
    id: "r-2299",
    date: "2025-02-10",
    duration: 3.6,
    topics: ["ステークホルダー会議", "OKR整理"],
    summary: "今月のOKRを日報と連動させる案をディスカッション。タグ設計を検討。",
    body: "評価軸を週次で可視化するためのタグ候補を洗い出し。日報詳細に週次目標との紐付けを追加する方向で進行。",
    aiFeedback: {
      title: "目標との接続が明確",
      content:
        "OKRへの紐付けが整理され、レポートから次の一手が読み取りやすくなっています。タグの命名を短くするとより一覧性が高まりそうです。",
      rating: 4.3,
      highlights: ["OKRとの紐付け", "短いタグ案", "次のアクション提示"],
    },
  },
  {
    id: "r-2298",
    date: "2025-02-08",
    duration: 6,
    topics: ["ワイヤー作成", "レビュー準備"],
    summary: "ワイヤーのバリエーションを3案作成し、レビュー用の資料を準備。",
    body: "テーマカラーのバリエーションを比較。CTA色はティールに寄せ、ダッシュボードの緊張感を和らげる方向で決定。レビュー用に軽いモーションを付与。",
    aiFeedback: {
      title: "ブランドトーンの統一感がアップ",
      content:
        "ティール系のCTAで一貫性が出ており、管理画面として落ち着いた印象に仕上がっています。影の強さを抑えたのも好判断です。",
      rating: 4.6,
      highlights: ["CTA配色", "影のコントロール", "資料準備の速さ"],
    },
  },
];

export const calendarMarks: Record<
  string,
  {
    level: 1 | 2 | 3 | 4;
    reportId?: string;
  }
> = {
  "2025-02-02": { level: 1 },
  "2025-02-03": { level: 2, reportId: "r-2298" },
  "2025-02-05": { level: 1 },
  "2025-02-08": { level: 4, reportId: "r-2298" },
  "2025-02-10": { level: 3, reportId: "r-2299" },
  "2025-02-11": { level: 2, reportId: "r-2300" },
  "2025-02-12": { level: 4, reportId: "r-2301" },
  "2025-02-13": { level: 2 },
};

export const weeklyHours = [
  { label: "Mon", value: 5.2 },
  { label: "Tue", value: 4.1 },
  { label: "Wed", value: 6.0 },
  { label: "Thu", value: 5.5 },
  { label: "Fri", value: 3.2 },
  { label: "Sat", value: 2.0 },
  { label: "Sun", value: 1.5 },
];

export const monthlyHours = [
  { label: "W1", value: 21 },
  { label: "W2", value: 24 },
  { label: "W3", value: 26 },
  { label: "W4", value: 19 },
];

export const aiSummary = {
  weekly:
    "UI刷新にフォーカスした密度の高い週でした。タップ領域やアクセシビリティ対応が進み、モバイルの体験が向上しています。",
  nextGoal:
    "短時間タスクのプリセット化と、カレンダーからの逆算で日次目標を一目で把握できる導線を加えましょう。",
};

export const timerPreset = {
  task: "UI刷新のまとめ作成",
  elapsedSeconds: 42 * 60 + 18,
  mood: "集中モード",
};
