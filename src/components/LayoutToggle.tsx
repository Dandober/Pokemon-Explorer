interface Props {
  layout: 'grid' | 'list';
  onChange: (layout: 'grid' | 'list') => void;
}

export default function LayoutToggle({ layout, onChange }: Props) {
  return (
    <div className="flex items-center rounded-full border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-800">
      {(['grid', 'list'] as const).map(option => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={layout === option}
          className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
            layout === option
              ? 'bg-red-600 text-white'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          {option === 'grid' ? '▦ Grid' : '☰ List'}
        </button>
      ))}
    </div>
  );
}
