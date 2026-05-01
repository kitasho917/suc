import { categoryStyleMap } from "@/lib/categories";
import { Category } from "@/types/planner";

type CategoryBadgeProps = {
  category: Category;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${categoryStyleMap[category]}`}>{category}</span>;
}
