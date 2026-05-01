import { FormEvent, useState } from "react";
import { CategoryBadge } from "@/components/CategoryBadge";
import { ImportantBadge } from "@/components/ImportantBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { categories, priorityLabelMap } from "@/lib/categories";
import { Category, PlannerItem, Priority } from "@/types/planner";

type ItemCardProps = {
  item: PlannerItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<PlannerItem>) => void;
};

export function ItemCard({ item, onToggle, onDelete, onUpdate }: ItemCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [memo, setMemo] = useState(item.memo ?? "");
  const [category, setCategory] = useState<Category>(item.category);
  const [priority, setPriority] = useState<Priority>(item.priority);
  const [isImportant, setIsImportant] = useState(item.isImportant);
  const [progress, setProgress] = useState(item.progress);

  const onSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onUpdate(item.id, { title: trimmed, memo: memo.trim() || undefined, category, priority, isImportant, progress });
    setIsEditing(false);
  };

  const onCancel = () => {
    setTitle(item.title);
    setMemo(item.memo ?? "");
    setCategory(item.category);
    setPriority(item.priority);
    setIsImportant(item.isImportant);
    setProgress(item.progress);
    setIsEditing(false);
  };

  return (
    <article className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${item.completed ? "opacity-60" : ""}`}>
      {isEditing ? (
        <form onSubmit={onSave} className="space-y-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-gray-200 p-2 text-sm" />
          <textarea value={memo} onChange={(e) => setMemo(e.target.value)} rows={2} className="w-full rounded-lg border border-gray-200 p-2 text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="rounded-lg border border-gray-200 p-2 text-sm">{categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}</select>
            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="rounded-lg border border-gray-200 p-2 text-sm">{Object.entries(priorityLabelMap).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">達成度%</label>
            <input type="number" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-20 rounded border border-gray-200 p-2 text-sm" />
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isImportant} onChange={(e) => setIsImportant(e.target.checked)} />最重要</label>
          <div className="flex gap-2">
            <button type="submit" className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white">保存</button>
            <button type="button" onClick={onCancel} className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700">キャンセル</button>
          </div>
        </form>
      ) : (
        <div className="flex items-start justify-between gap-3">
          <button type="button" onClick={() => onToggle(item.id)} className={`mt-1 h-6 w-6 rounded-full border-2 ${item.completed ? "border-blue-600 bg-blue-600" : "border-gray-300"}`} aria-label="toggle" />
          <div className="flex-1">
            <p className={`font-medium text-gray-900 ${item.completed ? "line-through text-gray-500" : ""}`}>{item.title}</p>
            {item.memo ? <p className="mt-1 text-sm text-gray-600">{item.memo}</p> : null}
            <div className="mt-2 flex flex-wrap gap-1.5">
              <CategoryBadge category={item.category} />
              <PriorityBadge priority={item.priority} />
              {item.isImportant ? <ImportantBadge /> : null}
            </div>
            <p className="mt-2 text-xs text-gray-600">進捗: {item.progress}%</p>
            <ProgressBar progress={item.progress} />
          </div>
          <div className="flex flex-col gap-1">
            <button type="button" onClick={() => setIsEditing(true)} className="rounded-lg px-2 py-1 text-xs text-blue-600">編集</button>
            <button type="button" onClick={() => onDelete(item.id)} className="rounded-lg px-2 py-1 text-xs text-red-600">削除</button>
          </div>
        </div>
      )}
    </article>
  );
}
