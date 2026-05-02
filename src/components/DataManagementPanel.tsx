"use client";

import { ChangeEvent, useRef, useState } from "react";
import { PlannerData } from "@/types/planner";
import { isPlannerDataLike, normalizePlannerData } from "@/lib/storage";

type Props = {
  data: PlannerData;
  onImport: (data: PlannerData) => void;
  onReset: () => void;
};

export function DataManagementPanel({ data, onImport, onReset }: Props) {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExport = () => {
    const date = new Date().toISOString().slice(0, 10);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `life-planner-mobile-backup-${date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed: unknown = JSON.parse(text);

      if (!isPlannerDataLike(parsed)) {
        setError("JSONの形式が正しくありません。Life Planner Mobileのバックアップファイルを選択してください。");
        return;
      }

      if (!window.confirm("このデータで現在のデータを上書きします。よろしいですか？")) {
        return;
      }

      onImport(normalizePlannerData(parsed));
      setError(null);
    } catch {
      setError("JSONの読み込みに失敗しました。ファイル内容を確認してください。");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleReset = () => {
    const ok = window.confirm("すべてのデータを初期状態に戻します。この操作は元に戻せません。実行しますか？");
    if (!ok) return;
    onReset();
    setError(null);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">データ管理</h2>
      <p className="mt-2 text-xs leading-relaxed text-slate-600">
        データはこの端末・このブラウザ内に保存されます。ブラウザデータを削除すると、タスクも消える場合があります。必要に応じてエクスポートでバックアップしてください。
      </p>

      <div className="mt-4 space-y-3">
        <button
          type="button"
          onClick={handleExport}
          className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          データをエクスポート（JSON保存）
        </button>

        <label className="block text-sm font-medium text-slate-700">
          バックアップをインポート（JSON）
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleImport}
            className="mt-2 block w-full rounded-lg border border-slate-300 p-2 text-sm text-slate-700"
          />
        </label>

        <button
          type="button"
          onClick={handleReset}
          className="w-full rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-700 hover:bg-rose-100"
        >
          データを初期化（リセット）
        </button>

        {error ? <p className="text-xs text-rose-600">{error}</p> : null}
      </div>
    </section>
  );
}
