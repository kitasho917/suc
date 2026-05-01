"use client";

import { useMemo, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav, Tab } from "@/components/BottomNav";
import { ItemForm } from "@/components/ItemForm";
import { ItemList } from "@/components/ItemList";
import { ProgressSummary } from "@/components/ProgressSummary";
import { TodaySummary } from "@/components/TodaySummary";
import { usePlannerData } from "@/hooks/usePlannerData";
import { calculateProgress } from "@/lib/utils";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("today");
  const planner = usePlannerData();

  const current = useMemo(() => {
    if (activeTab === "today") {
      return {
        title: "今日のToDo",
        items: planner.data.todayTodos,
        add: planner.addTodayTodo,
        toggle: planner.toggleTodayTodo,
        del: planner.deleteTodayTodo,
        update: planner.updateTodayTodo,
      };
    }
    if (activeTab === "week") {
      return {
        title: "今週のToDo",
        items: planner.data.weeklyTodos,
        add: planner.addWeeklyTodo,
        toggle: planner.toggleWeeklyTodo,
        del: planner.deleteWeeklyTodo,
        update: planner.updateWeeklyTodo,
      };
    }
    return {
      title: "今週の目標",
      items: planner.data.weeklyGoals,
      add: planner.addWeeklyGoal,
      toggle: planner.toggleWeeklyGoal,
      del: planner.deleteWeeklyGoal,
      update: planner.updateWeeklyGoal,
    };
  }, [activeTab, planner]);

  const progress = calculateProgress(current.items);
  const todayItems = planner.data.todayTodos;
  const todayCompleted = todayItems.filter((item) => item.completed).length;
  const todayPending = todayItems.length - todayCompleted;
  const importantItems = todayItems.filter((item) => item.isImportant);
  const importantPending = importantItems.filter((item) => !item.completed).length;

  return (
    <main className="mx-auto min-h-screen max-w-md space-y-4 p-4 pb-28">
      <AppHeader />
      {activeTab === "today" ? (
        <TodaySummary
          total={todayItems.length}
          completed={todayCompleted}
          pending={todayPending}
          importantTotal={importantItems.length}
          importantPending={importantPending}
        />
      ) : null}
      <ProgressSummary title={`${current.title}の進捗`} completedCount={progress.completedCount} totalCount={progress.totalCount} />
      <ItemForm onAdd={current.add} placeholder={`${current.title}を追加`} />
      <ItemList items={current.items} onToggle={current.toggle} onDelete={current.del} onUpdate={current.update} />
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
    </main>
  );
}
