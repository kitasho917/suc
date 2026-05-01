export type Tab = "today" | "week" | "goals";

type BottomNavProps = {
  activeTab: Tab;
  onChangeTab: (tab: Tab) => void;
};

const tabs: Array<{ key: Tab; label: string; icon: string }> = [
  { key: "today", label: "Today", icon: "☀️" },
  { key: "week", label: "Week", icon: "📅" },
  { key: "goals", label: "Goals", icon: "🎯" },
];

export function BottomNav({ activeTab, onChangeTab }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 p-3">
        {tabs.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChangeTab(tab.key)}
              className={`rounded-xl p-2 text-sm font-semibold transition ${
                active ? "bg-blue-100 text-blue-700" : "text-gray-500"
              }`}
            >
              <span className="block">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
