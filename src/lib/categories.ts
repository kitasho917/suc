import { Category, Priority, TimeBlock } from "@/types/planner";

export const categories: Category[] = ["TOEIC", "院試", "筋トレ", "就職準備", "生活習慣", "その他"];

export const priorities: Priority[] = ["high", "medium", "low"];

export const priorityLabelMap: Record<Priority, string> = {
  high: "高",
  medium: "中",
  low: "低",
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


export const timeBlocks: TimeBlock[] = ["morning", "afternoon", "evening", "night", "anytime"];

export const timeBlockLabelMap: Record<TimeBlock, string> = {
  morning: "朝",
  afternoon: "昼",
  evening: "夕方",
  night: "夜",
  anytime: "いつでも",
};

export const timeBlockStyleMap: Record<TimeBlock, string> = {
  morning: "bg-sky-100 text-sky-700",
  afternoon: "bg-yellow-100 text-yellow-700",
  evening: "bg-orange-100 text-orange-700",
  night: "bg-indigo-100 text-indigo-700",
  anytime: "bg-gray-100 text-gray-700",
};
