import { useState } from "react";
import { CategoryBadge } from "@/components/CategoryBadge";
import { ImportantBadge } from "@/components/ImportantBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { categories, priorities, priorityLabelMap } from "@/lib/categories";
import { PlannerItem } from "@/types/planner";

type EditInput = Pick<PlannerItem, "title" | "memo" | "category" | "priority" | "isImportant" | "progress">;

type ItemCardProps = {
  item: PlannerItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, input: EditInput) => void;
};

export function ItemCard({ item, onToggle, onDelete, onEdit }: ItemCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [memo, setMemo] = useState(item.memo ?? "");
  const [category, setCategory] = useState(item.category);
  const [priority, setPriority] = useState(item.priority);
  const [isImportant, setIsImportant] = useState(item.isImportant);
  const [progress, setProgress] = useState(item.progress);

  const saveEdit = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    onEdit(item.id, { title: trimmed, memo: memo.trim() || undefined, category, priority, isImportant, progress });
    setIsEditing(false);
  };

  return (
    <article className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${item.completed ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <button type="button" onClick={() => onToggle(item.id)} className={`mt-1 h-6 w-6 rounded-full border-2 ${item.completed ? "border-blue-600 bg-blue-600" : "border-gray-300"}`} aria-label="toggle" />
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border border-gray-200 p-2 text-sm" />
              <textarea value={memo} onChange={(e) => setMemo(e.target.value)} className="w-full rounded border border-gray-200 p-2 text-sm" rows={2} />
              <select value={category} onChange={(e) => setCategory(e.target.value as PlannerItem["category"])} className="w-full rounded border border-gray-200 p-2 text-sm">{categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}</select>
              <select value={priority} onChange={(e) => setPriority(e.target.value as PlannerItem["priority"])} className="w-full rounded border border-gray-200 p-2 text-sm">{priorities.map((p) => <option key={p} value={p}>優先度: {priorityLabelMap[p]}</option>)}</select>
              <label className="flex items-center justify-between text-sm"><span>最重要</span><input type="checkbox" checked={isImportant} onChange={(e) => setIsImportant(e.target.checked)} /></label>
              <input type="number" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-full rounded border border-gray-200 p-2 text-sm" />
              <div className="flex gap-2">
                <button type="button" onClick={saveEdit} className="rounded bg-blue-600 px-3 py-1 text-xs text-white">保存</button>
                <button type="button" onClick={() => setIsEditing(false)} className="rounded border border-gray-300 px-3 py-1 text-xs">キャンセル</button>
              </div>
            </div>
          ) : (
            <>
              <p className={`font-medium text-gray-900 ${item.completed ? "line-through text-gray-500" : ""}`}>{item.title}</p>
              {item.memo ? <p className="mt-1 text-sm text-gray-600">{item.memo}</p> : null}
              <div className="mt-2 flex flex-wrap gap-2"><CategoryBadge category={item.category} /><PriorityBadge priority={item.priority} />{item.isImportant ? <ImportantBadge /> : null}</div>
              <ProgressBar progress={item.progress} />
            </>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <button type="button" onClick={() => setIsEditing((prev) => !prev)} className="rounded-lg px-2 py-1 text-xs text-blue-600">編集</button>
          <button type="button" onClick={() => onDelete(item.id)} className="rounded-lg px-2 py-1 text-xs text-red-600">削除</button>
        </div>
      </div>
    </article>
  );
}
