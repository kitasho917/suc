type TodaySummaryProps = {
  total: number;
  completed: number;
  pending: number;
  importantTotal: number;
  importantPending: number;
};

export function TodaySummary({ total, completed, pending, importantTotal, importantPending }: TodaySummaryProps) {
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-gray-800">{pending === 0 ? "今日のタスクはすべて完了です！" : `今日の残りタスク：${pending}件`}</p>
      <p className="mt-1 text-sm text-gray-600">完了：{completed} / {total}</p>
      <p className="mt-1 text-sm text-gray-600">今日の達成率：{rate}%</p>
      <p className="mt-2 text-sm text-gray-700">{importantTotal === 0 ? "今日の最重要タスクは未設定です" : `最重要タスク：${importantTotal}件中${importantPending}件未完了`}</p>
    </section>
  );
}
