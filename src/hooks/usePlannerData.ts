import { useEffect, useState } from "react";
import { loadPlannerData, normalizePlannerData, savePlannerData } from "@/lib/storage";
import { Category, PlannerData, PlannerItem, Priority, TimeBlock, initialPlannerData } from "@/types/planner";
import { clampProgress } from "@/lib/utils";

type NewItemInput = {
  title: string;
  memo?: string;
  category: Category;
  priority: Priority;
  isImportant: boolean;
  progress: number;
  timeBlock: TimeBlock;
};

export type UpdateItemInput = NewItemInput;

const createId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createItem = ({ title, memo, category, priority, isImportant, progress, timeBlock }: NewItemInput): PlannerItem => {
  const safeProgress = clampProgress(progress);
  return {
    id: createId(),
    title,
    memo,
    category,
    priority,
    isImportant,
    progress: safeProgress,
    timeBlock,
    completed: safeProgress === 100,
    createdAt: new Date().toISOString(),
  };
};

const toggle = (items: PlannerItem[], id: string) =>
  items.map((item) => {
    if (item.id !== id) return item;
    const completed = !item.completed;
    return { ...item, completed, progress: completed ? 100 : 0 };
  });

const remove = (items: PlannerItem[], id: string) => items.filter((item) => item.id !== id);

const update = (items: PlannerItem[], id: string, input: UpdateItemInput) =>
  items.map((item) => {
    if (item.id !== id) return item;
    const safeProgress = clampProgress(input.progress);
    return {
      ...item,
      title: input.title,
      memo: input.memo,
      category: input.category,
      priority: input.priority,
      isImportant: input.isImportant,
      progress: safeProgress,
      timeBlock: input.timeBlock,
      completed: safeProgress === 100,
    };
  });

export function usePlannerData() {
  const [data, setData] = useState<PlannerData>(initialPlannerData);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadedData = loadPlannerData();
    const timer = window.setTimeout(() => {
      setData(loadedData);
      setHasLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    savePlannerData(data);
  }, [data, hasLoaded]);

  return {
    data,
    exportPlannerData: () => data,
    importPlannerData: (nextData: PlannerData) => setData(normalizePlannerData(nextData)),
    resetPlannerData: () => setData(initialPlannerData),
    addTodayTodo: (item: NewItemInput) => setData((prev) => ({ ...prev, todayTodos: [createItem(item), ...prev.todayTodos] })),
    addWeeklyTodo: (item: NewItemInput) => setData((prev) => ({ ...prev, weeklyTodos: [createItem(item), ...prev.weeklyTodos] })),
    addWeeklyGoal: (item: NewItemInput) => setData((prev) => ({ ...prev, weeklyGoals: [createItem(item), ...prev.weeklyGoals] })),
    updateTodayTodo: (id: string, input: UpdateItemInput) => setData((prev) => ({ ...prev, todayTodos: update(prev.todayTodos, id, input) })),
    updateWeeklyTodo: (id: string, input: UpdateItemInput) => setData((prev) => ({ ...prev, weeklyTodos: update(prev.weeklyTodos, id, input) })),
    updateWeeklyGoal: (id: string, input: UpdateItemInput) => setData((prev) => ({ ...prev, weeklyGoals: update(prev.weeklyGoals, id, input) })),
    toggleTodayTodo: (id: string) => setData((prev) => ({ ...prev, todayTodos: toggle(prev.todayTodos, id) })),
    toggleWeeklyTodo: (id: string) => setData((prev) => ({ ...prev, weeklyTodos: toggle(prev.weeklyTodos, id) })),
    toggleWeeklyGoal: (id: string) => setData((prev) => ({ ...prev, weeklyGoals: toggle(prev.weeklyGoals, id) })),
    deleteTodayTodo: (id: string) => setData((prev) => ({ ...prev, todayTodos: remove(prev.todayTodos, id) })),
    deleteWeeklyTodo: (id: string) => setData((prev) => ({ ...prev, weeklyTodos: remove(prev.weeklyTodos, id) })),
    deleteWeeklyGoal: (id: string) => setData((prev) => ({ ...prev, weeklyGoals: remove(prev.weeklyGoals, id) })),
  };
}
