export function AppHeader() {
  const today = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date());

  return (
    <header className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
      <p className="text-xs font-medium uppercase tracking-wide text-blue-600">Life Planner Mobile</p>
      <h1 className="mt-1 text-xl font-bold text-gray-900">{today}</h1>
      <p className="mt-1 text-sm text-gray-600">今日やることを整理しよう</p>
    </header>
  );
}
