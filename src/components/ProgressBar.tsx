export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="mt-2">
      <div className="mb-1 flex justify-between text-xs text-gray-600">
        <span>達成度</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
