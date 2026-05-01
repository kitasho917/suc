"use client";

import { ChangeEvent, useRef, useState } from "react";
import { PlannerData } from "@/types/planner";

type Props = {
  data: PlannerData;
  onImport: (data: PlannerData) => boolean;
  onReset: () => void;
};

export function DataManagementPanel({ data, onImport, onReset }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `life-planner-mobile-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage("データをエクスポートしました");
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw) as PlannerData;
      const imported = onImport(parsed);
      setMessage(imported ? "データをインポートしました" : "インポートに失敗しました（形式を確認してください）");
    } catch {
      setMessage("インポートに失敗しました（JSONを確認してください）");
    } finally {
      event.target.value = "";
    }
  };

  const handleReset = () => {
    if (!window.confirm("すべてのデータを削除して初期化します。よろしいですか？")) return;
    onReset();
    setMessage("データをリセットしました");
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900">データ管理</h2>
      <p className="mt-2 text-xs text-amber-700">
        このアプリのデータはブラウザのlocalStorageに保存されます。ブラウザデータ削除や端末変更前に、エクスポートでバックアップしてください。
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={handleExport} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white">エクスポート</button>
        <button onClick={handleImportClick} className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white">インポート</button>
        <button onClick={handleReset} className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-medium text-white">データリセット</button>
      </div>
      <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImport} className="hidden" />
      {message ? <p className="mt-2 text-xs text-gray-600">{message}</p> : null}
    </section>
  );
}
