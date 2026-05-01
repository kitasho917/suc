import { ItemCard } from "@/components/ItemCard";
import { sortPlannerItems } from "@/lib/utils";
import { PlannerItem } from "@/types/planner";

type ItemListProps = {
  items: PlannerItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<PlannerItem>) => void;
};

export function ItemList({ items, onToggle, onDelete, onUpdate }: ItemListProps) {
  if (items.length === 0) {
    return <p className="rounded-2xl border border-dashed border-gray-300 bg-white p-4 text-center text-sm text-gray-500">まだ追加されていません</p>;
  }

  const sortedItems = sortPlannerItems(items);

  return <div className="space-y-3">{sortedItems.map((item) => <ItemCard key={item.id} item={item} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />)}</div>;
}
