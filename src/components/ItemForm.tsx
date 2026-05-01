import { FormEvent, useState } from "react";
import { categories, priorities, priorityLabelMap, timeBlockLabelMap, timeBlocks } from "@/lib/categories";
import { Category, Priority, TimeBlock } from "@/types/planner";

type FormInput = {
  title: string;
  memo?: string;
  category: Category;
  priority: Priority;
  isImportant: boolean;
  progress: number;
  timeBlock: TimeBlock;
};

type ItemFormProps = {
  onAdd: (item: FormInput) => void;
  placeholder?: string;
};

export function ItemForm({ onAdd, placeholder }: ItemFormProps) {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [category, setCategory] = useState<Category>("TOEIC");
  const [priority, setPriority] = useState<Priority>("medium");
  const [isImportant, setIsImportant] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeBlock, setTimeBlock] = useState<TimeBlock>("anytime");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    const safeProgress = Math.max(0, Math.min(100, Math.round(progress)));
    onAdd({ title: trimmed, memo: memo.trim() || undefined, category, priority, isImportant, progress: safeProgress, timeBlock });
    setTitle("");
    setMemo("");
    setCategory("TOEIC");
    setPriority("medium");
    setIsImportant(false);
    setProgress(0);
    setTimeBlock("anytime");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={placeholder ?? "タイトル"} className="w-full rounded-lg border border-gray-200 p-3 text-sm" />
      <textarea value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="メモ（任意）" className="w-full rounded-lg border border-gray-200 p-3 text-sm" rows={2} />
      <div className="grid grid-cols-2 gap-2">
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="rounded-lg border border-gray-200 p-3 text-sm">
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="rounded-lg border border-gray-200 p-3 text-sm">
          {priorities.map((p) => <option key={p} value={p}>優先度: {priorityLabelMap[p]}</option>)}
        </select>
      </div>
      <select value={timeBlock} onChange={(e) => setTimeBlock(e.target.value as TimeBlock)} className="w-full rounded-lg border border-gray-200 p-3 text-sm">{timeBlocks.map((tb) => <option key={tb} value={tb}>時間帯: {timeBlockLabelMap[tb]}</option>)}</select>
      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 text-sm">
        <label htmlFor="isImportant">最重要タスクに設定</label>
        <input id="isImportant" type="checkbox" checked={isImportant} onChange={(e) => setIsImportant(e.target.checked)} />
      </div>
      <div className="rounded-lg border border-gray-200 p-3 text-sm">
        <label className="mb-1 block">達成度%: {progress}</label>
        <input type="number" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-full rounded border border-gray-200 p-2" />
      </div>
      <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white">追加</button>
    </form>
  );
}
