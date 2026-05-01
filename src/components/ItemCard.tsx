import { CategoryBadge } from "@/components/CategoryBadge";
import { PlannerItem } from "@/types/planner";

type ItemCardProps = {
  item: PlannerItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function ItemCard({ item, onToggle, onDelete }: ItemCardProps) {
  return (
    <article className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${item.completed ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <button type="button" onClick={() => onToggle(item.id)} className={`mt-1 h-6 w-6 rounded-full border-2 ${item.completed ? "border-blue-600 bg-blue-600" : "border-gray-300"}`} aria-label="toggle" />
        <div className="flex-1">
          <p className={`font-medium text-gray-900 ${item.completed ? "line-through text-gray-500" : ""}`}>{item.title}</p>
          {item.memo ? <p className="mt-1 text-sm text-gray-600">{item.memo}</p> : null}
          <div className="mt-2"><CategoryBadge category={item.category} /></div>
        </div>
        <button type="button" onClick={() => onDelete(item.id)} className="rounded-lg px-2 py-1 text-xs text-red-600">削除</button>
      </div>
    </article>
  );
}
