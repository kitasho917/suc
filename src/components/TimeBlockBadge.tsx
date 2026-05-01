import { timeBlockLabelMap, timeBlockStyleMap } from "@/lib/categories";
import { TimeBlock } from "@/types/planner";

export function TimeBlockBadge({ timeBlock }: { timeBlock: TimeBlock }) {
  return <span className={`rounded-full px-2 py-1 text-xs font-medium ${timeBlockStyleMap[timeBlock]}`}>時間帯: {timeBlockLabelMap[timeBlock]}</span>;
}
