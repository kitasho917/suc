import { priorityLabelMap, priorityStyleMap } from "@/lib/categories";
import { Priority } from "@/types/planner";

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <span className={`rounded-full px-2 py-1 text-xs font-medium ${priorityStyleMap[priority]}`}>優先度: {priorityLabelMap[priority]}</span>;
}
