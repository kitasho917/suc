import { categories } from "@/lib/categories";
import { clampProgress } from "@/lib/utils";
import { Category, PlannerData, PlannerItem, Priority, initialPlannerData } from "@/types/planner";

export const STORAGE_KEY = "life-planner-mobile-data";

const isPriority = (value: unknown): value is Priority => value === "high" || value === "medium" || value === "low";
const isCategory = (value: unknown): value is Category => typeof value === "string" && categories.includes(value as Category);

const normalizeItem = (raw: unknown): PlannerItem | null => {
  if (!raw || typeof raw !== "object") return null;
  const source = raw as Partial<PlannerItem>;
  if (!source.id || !source.title || !source.createdAt || !isCategory(source.category)) return null;

  const completed = Boolean(source.completed);
  const progress = typeof source.progress === "number" ? clampProgress(source.progress) : completed ? 100 : 0;

  return {
    id: String(source.id),
    title: String(source.title),
    memo: source.memo ? String(source.memo) : undefined,
    category: source.category,
    completed: progress === 100,
    createdAt: String(source.createdAt),
    priority: isPriority(source.priority) ? source.priority : "medium",
    isImportant: Boolean(source.isImportant),
    progress,
  };
};

const normalizeItems = (items: unknown): PlannerItem[] => {
  if (!Array.isArray(items)) return [];
  return items.map(normalizeItem).filter((item): item is PlannerItem => item !== null);
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
