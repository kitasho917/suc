import { categories } from "@/lib/categories";
import { PlannerItem } from "@/types/planner";

type Props = { items: PlannerItem[] };

export function CategoryProgressDashboard({ items }: Props) {
  const rows = categories
    .map((category) => {
      const categoryItems = items.filter((item) => item.category === category);
      if (categoryItems.length === 0) return null;
      const completed = categoryItems.filter((item) => item.completed).length;
      const percentage = Math.round((completed / categoryItems.length) * 100);
      return { category, completed, total: categoryItems.length, percentage };
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row));

  if (rows.length === 0) return null;

  return (
    <section className="space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900">カテゴリ別進捗</h2>
      {rows.map((row) => (
        <div key={row.category} className="space-y-1">
          <p className="text-xs text-gray-700">{row.category}：{row.completed} / {row.total} 完了 {row.percentage}%</p>
          <div className="h-2 w-full overflow-hidden rounded bg-gray-100"><div className="h-full bg-blue-500" style={{ width: `${row.percentage}%` }} /></div>
        </div>
      ))}
    </section>
  );
}
