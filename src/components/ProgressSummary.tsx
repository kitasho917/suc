type ProgressSummaryProps = {
  title: string;
  completedCount: number;
  totalCount: number;
};

export function ProgressSummary({ title, completedCount, totalCount }: ProgressSummaryProps) {
  const percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
      <p className="text-sm font-semibold text-gray-700">{title}</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-sm text-gray-600">{completedCount} / {totalCount} 完了</p>
        <p className="text-lg font-bold text-gray-900">{percentage}%</p>
      </div>
      <div className="mt-2 h-2.5 rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${percentage}%` }} />
      </div>
    </section>
  );
}
