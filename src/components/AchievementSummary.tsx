type Props = { completedCount: number; totalCount: number };

export function AchievementSummary({ completedCount, totalCount }: Props) {
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
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-gray-700">今日の達成</p>
      <p className="mt-1 text-xl font-bold text-gray-900">{completedCount}件完了！</p>
      <p className="mt-1 text-sm text-green-700">{message}</p>
    </section>
  );
}
