export type Category =
  | "TOEIC"
  | "院試"
  | "筋トレ"
  | "就職準備"
  | "生活習慣"
  | "その他";

export type Priority = "high" | "medium" | "low";

export type PlannerItem = {
  id: string;
  title: string;
  memo?: string;
  category: Category;
  completed: boolean;
  createdAt: string;
  priority: Priority;
  isImportant: boolean;
  progress: number;
};

export type PlannerData = {
  todayTodos: PlannerItem[];
  weeklyTodos: PlannerItem[];
  weeklyGoals: PlannerItem[];
};

export const initialPlannerData: PlannerData = {
  todayTodos: [],
  weeklyTodos: [],
  weeklyGoals: [],
};
