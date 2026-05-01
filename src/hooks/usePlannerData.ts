import { useEffect, useState } from "react";
import { loadPlannerData, savePlannerData } from "@/lib/storage";
import { Category, PlannerData, PlannerItem, initialPlannerData } from "@/types/planner";

type NewItemInput = {
  title: string;
  memo?: string;
  category: Category;
};

const createId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createItem = ({ title, memo, category }: NewItemInput): PlannerItem => ({
  id: createId(),
  title,
  memo,
  category,
  completed: false,
  createdAt: new Date().toISOString(),
});

const toggle = (items: PlannerItem[], id: string) =>
  items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item));

const remove = (items: PlannerItem[], id: string) => items.filter((item) => item.id !== id);

export function usePlannerData() {
  const [data, setData] = useState<PlannerData>(initialPlannerData);

  useEffect(() => {
    setData(loadPlannerData());
  }, []);

  useEffect(() => {
    savePlannerData(data);
  }, [data]);

  return {
    data,
    addTodayTodo: (item: NewItemInput) => setData((prev) => ({ ...prev, todayTodos: [createItem(item), ...prev.todayTodos] })),
    addWeeklyTodo: (item: NewItemInput) => setData((prev) => ({ ...prev, weeklyTodos: [createItem(item), ...prev.weeklyTodos] })),
    addWeeklyGoal: (item: NewItemInput) => setData((prev) => ({ ...prev, weeklyGoals: [createItem(item), ...prev.weeklyGoals] })),
    toggleTodayTodo: (id: string) => setData((prev) => ({ ...prev, todayTodos: toggle(prev.todayTodos, id) })),
    toggleWeeklyTodo: (id: string) => setData((prev) => ({ ...prev, weeklyTodos: toggle(prev.weeklyTodos, id) })),
    toggleWeeklyGoal: (id: string) => setData((prev) => ({ ...prev, weeklyGoals: toggle(prev.weeklyGoals, id) })),
    deleteTodayTodo: (id: string) => setData((prev) => ({ ...prev, todayTodos: remove(prev.todayTodos, id) })),
    deleteWeeklyTodo: (id: string) => setData((prev) => ({ ...prev, weeklyTodos: remove(prev.weeklyTodos, id) })),
    deleteWeeklyGoal: (id: string) => setData((prev) => ({ ...prev, weeklyGoals: remove(prev.weeklyGoals, id) })),
  };
}
