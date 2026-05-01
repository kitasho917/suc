export type Category =
  | "TOEIC"
  | "院試"
  | "筋トレ"
  | "就職準備"
  | "生活習慣"
  | "その他";

export type PlannerItem = {
  id: string;
  title: string;
  memo?: string;
  category: Category;
  completed: boolean;
  createdAt: string;
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
