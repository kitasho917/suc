import { PlannerItem } from "@/types/planner";

export const calculateProgress = (items: PlannerItem[]) => {
  const totalCount = items.length;
  const completedCount = items.filter((item) => item.completed).length;
  return {
    totalCount,
    completedCount,
    percentage: totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100),
  };
};
