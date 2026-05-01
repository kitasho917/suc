import { categories } from "@/lib/categories";
import { PlannerItem } from "@/types/planner";

type Props = { items: PlannerItem[] };

export function CategoryProgressDashboard({ items }: Props) {
  const rows = categories
    .map((category) => {
      const categoryItems = items.filter((item) => item.category === category);
      if (categoryItems.length === 0) return null;
      const completed = categoryItems.filter((item) => item.completed).length;
      const percent = Math.round((completed / categoryItems.length) * 100);
      return { category, completed, total: categoryItems.length, percent };
    })
    .filter((row): row is { category: string; completed: number; total: number; percent: number } => row !== null);

  if (rows.length === 0) return null;

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-gray-700">カテゴリ別進捗</p>
      <div className="mt-2 space-y-2">
        {rows.map((row) => (
          <div key={row.category}>
            <p className="text-xs text-gray-700">{row.category}: {row.completed} / {row.total} 完了 {row.percent}%</p>
            <div className="mt-1 h-1.5 rounded-full bg-gray-100"><div className="h-full rounded-full bg-blue-500" style={{ width: `${row.percent}%` }} /></div>
          </div>
        ))}
      </div>
    </section>
  );
}
