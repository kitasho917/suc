type Props = { totalCount: number; completedCount: number };

export function AchievementSummary({ totalCount, completedCount }: Props) {
  const message = totalCount > 0 && completedCount === totalCount
    ? "今日のタスクはすべて完了です！"
    : completedCount === 0
      ? "まだこれから。まず1つ終わらせよう"
      : completedCount <= 2
        ? "いいスタートです"
        : completedCount <= 4
          ? "かなり進んでいます"
          : "素晴らしい達成量です";

  return (
    <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
      <p className="text-sm font-semibold text-emerald-800">今日の達成</p>
      <p className="mt-1 text-lg font-bold text-emerald-900">{completedCount}件完了！</p>
      <p className="mt-1 text-sm text-emerald-700">{message}</p>
    </section>
  );
}
