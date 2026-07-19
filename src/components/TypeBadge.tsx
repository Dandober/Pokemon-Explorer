import { capitalize } from '../utils/format';
import { typeColor } from '../utils/typeColors';

// Colored pill for a Pokémon type (e.g. "Water"), color looked up from typeColors.ts.
export default function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm"
      style={{ backgroundColor: typeColor(type) }}
    >
      {capitalize(type)}
    </span>
  );
}
