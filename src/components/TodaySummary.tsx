type TodaySummaryProps = {
  remainingCount: number;
  importantRemainingCount: number;
  completedCount: number;
  totalCount: number;
  achievementRate: number;
};

export function TodaySummary({ remainingCount, importantRemainingCount, completedCount, totalCount, achievementRate }: TodaySummaryProps) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-gray-700">今日のサマリー</p>
      <p className="mt-2 text-sm text-gray-700">残りタスク: <span className="font-semibold">{remainingCount}</span> 件</p>
      <p className="mt-1 text-sm text-gray-700">完了数 / 全体数: <span className="font-semibold">{completedCount} / {totalCount}</span></p>
      <p className="mt-1 text-sm text-gray-700">今日の達成率: <span className="font-semibold">{achievementRate}%</span></p>
      <p className="mt-1 text-sm text-gray-700">最重要タスクの残り: <span className="font-semibold">{importantRemainingCount}</span> 件</p>
      {importantRemainingCount === 0 ? <p className="mt-2 text-sm text-amber-700">今日の最重要タスクは未設定です</p> : null}
      {remainingCount === 0 ? <p className="mt-2 text-sm font-medium text-green-700">今日のタスクはすべて完了です！</p> : null}
    </section>
  );
}
