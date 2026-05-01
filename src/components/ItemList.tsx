import { ItemCard } from "@/components/ItemCard";
import { sortPlannerItems } from "@/lib/utils";
import { PlannerItem } from "@/types/planner";

type ItemListProps = {
  items: PlannerItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, input: Pick<PlannerItem, "title" | "memo" | "category" | "priority" | "isImportant" | "progress" | "timeBlock">) => void;
};

export function ItemList({ items, onToggle, onDelete, onEdit }: ItemListProps) {
  if (items.length === 0) {
    return <p className="rounded-2xl border border-dashed border-gray-300 bg-white p-4 text-center text-sm text-gray-500">まだ追加されていません</p>;
  }

  const sorted = sortPlannerItems(items);

  return <div className="space-y-3">{sorted.map((item) => <ItemCard key={item.id} item={item} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />)}</div>;
}
