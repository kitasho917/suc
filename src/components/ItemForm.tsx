import { FormEvent, useState } from "react";
import { categories, priorityLabelMap } from "@/lib/categories";
import { Category, Priority } from "@/types/planner";

type ItemFormProps = {
  onAdd: (item: { title: string; memo?: string; category: Category; priority: Priority; isImportant: boolean; progress: number }) => void;
  placeholder?: string;
};

export function ItemForm({ onAdd, placeholder }: ItemFormProps) {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [category, setCategory] = useState<Category>("TOEIC");
  const [priority, setPriority] = useState<Priority>("medium");
  const [isImportant, setIsImportant] = useState(false);
  const [progress, setProgress] = useState(0);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd({ title: trimmed, memo: memo.trim() || undefined, category, priority, isImportant, progress });
    setTitle("");
    setMemo("");
    setCategory("TOEIC");
    setPriority("medium");
    setIsImportant(false);
    setProgress(0);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={placeholder ?? "タイトル"} className="w-full rounded-lg border border-gray-200 p-3 text-sm" />
      <textarea value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="メモ（任意）" className="w-full rounded-lg border border-gray-200 p-3 text-sm" rows={2} />
      <div className="grid grid-cols-2 gap-2">
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="rounded-lg border border-gray-200 p-3 text-sm">
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="rounded-lg border border-gray-200 p-3 text-sm">
          {Object.entries(priorityLabelMap).map(([value, label]) => <option key={value} value={value}>{`優先度: ${label}`}</option>)}
        </select>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
        <label className="text-sm text-gray-700">達成度: {progress}%</label>
        <input type="number" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-20 rounded border border-gray-200 p-2 text-sm" />
      </div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <input type="checkbox" checked={isImportant} onChange={(e) => setIsImportant(e.target.checked)} className="h-4 w-4" />
        最重要にする
      </label>
      <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white">追加</button>
    </form>
  );
}
