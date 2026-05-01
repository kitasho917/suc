import { PlannerData, initialPlannerData } from "@/types/planner";

export const STORAGE_KEY = "life-planner-mobile-data";

export function loadPlannerData(): PlannerData {
  if (typeof window === "undefined") {
    return initialPlannerData;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialPlannerData;

    const parsed = JSON.parse(raw) as Partial<PlannerData>;
    return {
      todayTodos: parsed.todayTodos ?? [],
      weeklyTodos: parsed.weeklyTodos ?? [],
      weeklyGoals: parsed.weeklyGoals ?? [],
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
