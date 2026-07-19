// Shared loading indicator used by every async view (list, search, detail, favorites).
export default function Spinner({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-slate-400">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-red-500 dark:border-slate-700" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
