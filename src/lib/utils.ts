import { priorityOrder } from "@/lib/categories";
import { PlannerItem } from "@/types/planner";

export const clampProgress = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

export const calculateProgress = (items: PlannerItem[]) => {
  const totalCount = items.length;
  const completedCount = items.filter((item) => item.completed).length;
  return {
    totalCount,
    completedCount,
    percentage: totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100),
  };
};

export const sortPlannerItems = (items: PlannerItem[]) =>
  [...items].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (!a.completed && a.isImportant !== b.isImportant) return a.isImportant ? -1 : 1;
    if (!a.completed && a.priority !== b.priority) return priorityOrder[a.priority] - priorityOrder[b.priority];
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
