import { Category, Priority, TimeBlock } from "@/types/planner";

export const categories: Category[] = ["TOEIC", "院試", "筋トレ", "就職準備", "生活習慣", "その他"];
export const priorities: Priority[] = ["high", "medium", "low"];
export const timeBlocks: TimeBlock[] = ["morning", "afternoon", "evening", "night", "anytime"];

export const priorityLabelMap: Record<Priority, string> = { high: "高", medium: "中", low: "低" };
export const timeBlockLabelMap: Record<TimeBlock, string> = {
  morning: "朝",
  afternoon: "昼",
  evening: "夕方",
  night: "夜",
  anytime: "いつでも",
};

export const categoryStyleMap: Record<Category, string> = {
  TOEIC: "bg-blue-100 text-blue-700",
  院試: "bg-purple-100 text-purple-700",
  筋トレ: "bg-red-100 text-red-700",
  就職準備: "bg-amber-100 text-amber-700",
  生活習慣: "bg-green-100 text-green-700",
  その他: "bg-gray-100 text-gray-700",
};

export const priorityStyleMap: Record<Priority, string> = {
  high: "bg-rose-100 text-rose-700",
  medium: "bg-orange-100 text-orange-700",
  low: "bg-slate-100 text-slate-700",
};

export const timeBlockStyleMap: Record<TimeBlock, string> = {
  morning: "bg-cyan-100 text-cyan-700",
  afternoon: "bg-lime-100 text-lime-700",
  evening: "bg-indigo-100 text-indigo-700",
  night: "bg-violet-100 text-violet-700",
  anytime: "bg-gray-100 text-gray-700",
};
