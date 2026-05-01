import { PriorityBadge } from "@/components/PriorityBadge";
import { TimeBlockBadge } from "@/components/TimeBlockBadge";
import { timeBlockLabelMap, timeBlocks } from "@/lib/categories";
import { PlannerItem, TimeBlock } from "@/types/planner";

type Props = { items: PlannerItem[] };

export function TimeSchedule({ items }: Props) {
  const grouped = timeBlocks.reduce<Record<TimeBlock, PlannerItem[]>>((acc, block) => {
    acc[block] = items.filter((item) => item.timeBlock === block);
    return acc;
  }, { morning: [], afternoon: [], evening: [], night: [], anytime: [] });

  return (
    <section className="space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900">今日のタイムスケジュール</h2>
      {timeBlocks.map((block) => {
        const blockItems = grouped[block];
        const incompleteCount = blockItems.filter((item) => !item.completed).length;
        return (
          <div key={block} className="rounded-xl border border-gray-100 p-3">
            <p className="text-xs font-medium text-gray-700">{timeBlockLabelMap[block]} {blockItems.length}件 / 未完了{incompleteCount}件</p>
            <div className="mt-2 space-y-2">
              {blockItems.length === 0 ? <p className="text-xs text-gray-400">タスクはありません</p> : blockItems.map((item) => (
                <div key={item.id} className={`rounded-lg border border-gray-100 p-2 ${item.completed ? "opacity-50" : ""}`}>
                  <p className="text-sm font-medium text-gray-900">{item.isImportant ? "★ " : ""}{item.completed ? "✅ " : "□ "}{item.title}</p>
                  <div className="mt-1 flex gap-2"><PriorityBadge priority={item.priority} /><TimeBlockBadge timeBlock={item.timeBlock} /></div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
