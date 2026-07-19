interface Props {
  value: string;
  onChange: (value: string) => void;
}

// Controlled search input; the ✕ button clears the value so the caller can
// fall back to the original (non-searched) list.
export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative w-full max-w-sm">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search Pokémon by name..."
        className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-red-900/40"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        >
          ✕
        </button>
      )}
    </div>
  );
}
