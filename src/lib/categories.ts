import { Category } from "@/types/planner";

export const categories: Category[] = ["TOEIC", "院試", "筋トレ", "就職準備", "生活習慣", "その他"];

export const categoryStyleMap: Record<Category, string> = {
  TOEIC: "bg-blue-100 text-blue-700",
  院試: "bg-purple-100 text-purple-700",
  筋トレ: "bg-red-100 text-red-700",
  就職準備: "bg-amber-100 text-amber-700",
  生活習慣: "bg-green-100 text-green-700",
  その他: "bg-gray-100 text-gray-700",
};
