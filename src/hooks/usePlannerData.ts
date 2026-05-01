import { useEffect, useState } from "react";
import { loadPlannerData, savePlannerData } from "@/lib/storage";
import { clampProgress } from "@/lib/utils";
import { Category, PlannerData, PlannerItem, Priority, initialPlannerData } from "@/types/planner";

type NewItemInput = {
  title: string;
  memo?: string;
  category: Category;
  priority: Priority;
  isImportant: boolean;
  progress: number;
};

const createId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const buildItem = ({ title, memo, category, priority, isImportant, progress }: NewItemInput): PlannerItem => {
  const normalizedProgress = clampProgress(progress);
  return {
    id: createId(),
    title,
    memo,
    category,
    completed: normalizedProgress === 100,
    createdAt: new Date().toISOString(),
    priority,
    isImportant,
    progress: normalizedProgress,
  };
};

const updateItem = (item: PlannerItem, updates: Partial<PlannerItem>): PlannerItem => {
  const next = { ...item, ...updates };
  const progress = updates.progress !== undefined ? clampProgress(updates.progress) : next.progress;
  next.progress = progress;
  next.completed = progress === 100;
  return next;
};

const updateById = (items: PlannerItem[], id: string, updates: Partial<PlannerItem>) =>
  items.map((item) => (item.id === id ? updateItem(item, updates) : item));

const remove = (items: PlannerItem[], id: string) => items.filter((item) => item.id !== id);

const toggleComplete = (items: PlannerItem[], id: string) =>
  items.map((item) => {
    if (item.id !== id) return item;
    const willComplete = !item.completed;
    return { ...item, completed: willComplete, progress: willComplete ? 100 : 0 };
  });

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
    addTodayTodo: (item: NewItemInput) => setData((prev) => ({ ...prev, todayTodos: [buildItem(item), ...prev.todayTodos] })),
    addWeeklyTodo: (item: NewItemInput) => setData((prev) => ({ ...prev, weeklyTodos: [buildItem(item), ...prev.weeklyTodos] })),
    addWeeklyGoal: (item: NewItemInput) => setData((prev) => ({ ...prev, weeklyGoals: [buildItem(item), ...prev.weeklyGoals] })),
    updateTodayTodo: (id: string, updates: Partial<PlannerItem>) => setData((prev) => ({ ...prev, todayTodos: updateById(prev.todayTodos, id, updates) })),
    updateWeeklyTodo: (id: string, updates: Partial<PlannerItem>) => setData((prev) => ({ ...prev, weeklyTodos: updateById(prev.weeklyTodos, id, updates) })),
    updateWeeklyGoal: (id: string, updates: Partial<PlannerItem>) => setData((prev) => ({ ...prev, weeklyGoals: updateById(prev.weeklyGoals, id, updates) })),
    toggleTodayTodo: (id: string) => setData((prev) => ({ ...prev, todayTodos: toggleComplete(prev.todayTodos, id) })),
    toggleWeeklyTodo: (id: string) => setData((prev) => ({ ...prev, weeklyTodos: toggleComplete(prev.weeklyTodos, id) })),
    toggleWeeklyGoal: (id: string) => setData((prev) => ({ ...prev, weeklyGoals: toggleComplete(prev.weeklyGoals, id) })),
    deleteTodayTodo: (id: string) => setData((prev) => ({ ...prev, todayTodos: remove(prev.todayTodos, id) })),
    deleteWeeklyTodo: (id: string) => setData((prev) => ({ ...prev, weeklyTodos: remove(prev.weeklyTodos, id) })),
    deleteWeeklyGoal: (id: string) => setData((prev) => ({ ...prev, weeklyGoals: remove(prev.weeklyGoals, id) })),
  };
}
