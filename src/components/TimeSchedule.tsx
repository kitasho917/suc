import { timeBlockLabelMap, timeBlocks } from "@/lib/categories";
import { PlannerItem } from "@/types/planner";

type Props = { items: PlannerItem[] };

export function TimeSchedule({ items }: Props) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-gray-700">今日のタイムスケジュール</p>
      <div className="mt-3 space-y-3">
        {timeBlocks.map((block) => {
          const blockItems = items.filter((item) => item.timeBlock === block);
          const remaining = blockItems.filter((item) => !item.completed).length;
          return (
            <div key={block} className="rounded-lg border border-gray-100 p-2">
              <p className="text-xs font-semibold text-gray-700">{timeBlockLabelMap[block]} {blockItems.length}件 / 未完了{remaining}件</p>
              {blockItems.length === 0 ? <p className="mt-1 text-xs text-gray-400">タスクはありません</p> : (
                <ul className="mt-1 space-y-1">
                  {blockItems.map((item) => <li key={item.id} className={`text-sm ${item.completed ? "text-gray-400 line-through" : "text-gray-800"}`}>{item.isImportant ? "★ " : ""}{item.completed ? "✅ " : "□ "}{item.title}</li>)}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
