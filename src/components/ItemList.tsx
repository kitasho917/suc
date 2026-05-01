import { ItemCard } from "@/components/ItemCard";
import { PlannerItem } from "@/types/planner";

type ItemListProps = {
  items: PlannerItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function ItemList({ items, onToggle, onDelete }: ItemListProps) {
  if (items.length === 0) {
    return <p className="rounded-2xl border border-dashed border-gray-300 bg-white p-4 text-center text-sm text-gray-500">まだ追加されていません</p>;
  }

  return <div className="space-y-3">{items.map((item) => <ItemCard key={item.id} item={item} onToggle={onToggle} onDelete={onDelete} />)}</div>;
}
