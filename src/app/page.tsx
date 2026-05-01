"use client";

import { AppHeader } from "@/components/AppHeader";
import { BottomNav, Tab } from "@/components/BottomNav";
import { ItemForm } from "@/components/ItemForm";
import { ItemList } from "@/components/ItemList";
import { ProgressSummary } from "@/components/ProgressSummary";
import { usePlannerData } from "@/hooks/usePlannerData";
import { calculateProgress } from "@/lib/utils";
import { useMemo, useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("today");
  const planner = usePlannerData();

  const current = useMemo(() => {
    if (activeTab === "today") return { key: "today", title: "今日のToDo", items: planner.data.todayTodos };
    if (activeTab === "week") return { key: "week", title: "今週のToDo", items: planner.data.weeklyTodos };
    return { key: "goals", title: "今週の目標", items: planner.data.weeklyGoals };
  }, [activeTab, planner.data]);

  const progress = calculateProgress(current.items);

  return (
    <main className="mx-auto min-h-screen max-w-md space-y-4 p-4 pb-28">
      <AppHeader />
      <ProgressSummary title={`${current.title}の進捗`} completedCount={progress.completedCount} totalCount={progress.totalCount} />
      <ItemForm
        onAdd={activeTab === "today" ? planner.addTodayTodo : activeTab === "week" ? planner.addWeeklyTodo : planner.addWeeklyGoal}
        placeholder={`${current.title}を追加`}
      />
      <ItemList
        items={current.items}
        onToggle={activeTab === "today" ? planner.toggleTodayTodo : activeTab === "week" ? planner.toggleWeeklyTodo : planner.toggleWeeklyGoal}
        onDelete={activeTab === "today" ? planner.deleteTodayTodo : activeTab === "week" ? planner.deleteWeeklyTodo : planner.deleteWeeklyGoal}
      />
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
    </main>
  );
}
