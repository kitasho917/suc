import { FormEvent, useState } from "react";
import { categories } from "@/lib/categories";
import { Category } from "@/types/planner";

type ItemFormProps = {
  onAdd: (item: { title: string; memo?: string; category: Category }) => void;
  placeholder?: string;
};

export function ItemForm({ onAdd, placeholder }: ItemFormProps) {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [category, setCategory] = useState<Category>("TOEIC");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd({ title: trimmed, memo: memo.trim() || undefined, category });
    setTitle("");
    setMemo("");
    setCategory("TOEIC");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={placeholder ?? "タイトル"} className="w-full rounded-lg border border-gray-200 p-3 text-sm" />
      <textarea value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="メモ（任意）" className="w-full rounded-lg border border-gray-200 p-3 text-sm" rows={2} />
      <div className="flex gap-2">
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="flex-1 rounded-lg border border-gray-200 p-3 text-sm">
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <button type="submit" className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white">追加</button>
      </div>
    </form>
  );
}
