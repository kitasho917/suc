export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="mt-1 h-2.5 rounded-full bg-gray-100">
      <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
    </div>
  );
}
