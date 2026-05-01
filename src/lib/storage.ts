import { PlannerData, PlannerItem, Priority, initialPlannerData } from "@/types/planner";
import { clampProgress } from "@/lib/utils";

export const STORAGE_KEY = "life-planner-mobile-data";

const normalizePriority = (priority: unknown): Priority => {
  if (priority === "high" || priority === "medium" || priority === "low") return priority;
  return "medium";
};

const normalizeItem = (item: Partial<PlannerItem>): PlannerItem => {
  const completed = Boolean(item.completed);
  const progress = clampProgress(typeof item.progress === "number" ? item.progress : completed ? 100 : 0);

  return {
    id: item.id ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: item.title ?? "",
    memo: item.memo,
    category: item.category ?? "その他",
    priority: normalizePriority(item.priority),
    isImportant: Boolean(item.isImportant),
    progress,
    completed: progress === 100,
    createdAt: item.createdAt ?? new Date().toISOString(),
  };
};

const normalizeItems = (items: unknown): PlannerItem[] => {
  if (!Array.isArray(items)) return [];
  return items.map((item) => normalizeItem((item ?? {}) as Partial<PlannerItem>));
};

export function loadPlannerData(): PlannerData {
  if (typeof window === "undefined") {
    return initialPlannerData;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialPlannerData;

    const parsed = JSON.parse(raw) as Partial<PlannerData>;
    return {
      todayTodos: normalizeItems(parsed.todayTodos),
      weeklyTodos: normalizeItems(parsed.weeklyTodos),
      weeklyGoals: normalizeItems(parsed.weeklyGoals),
    };
  } catch {
    return initialPlannerData;
  }
}

export function savePlannerData(data: PlannerData): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // noop
  }
}
