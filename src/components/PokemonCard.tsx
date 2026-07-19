import { Link } from 'react-router-dom';
import type { PokemonCardData } from '../types/pokemon';
import { capitalize, formatPokemonId } from '../utils/format';
import { useFavorites } from '../context/FavoritesContext';

interface Props {
  pokemon: PokemonCardData;
  layout: 'grid' | 'list';
}

export default function PokemonCard({ pokemon, layout }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(pokemon.name);

  function handleFavoriteClick(e: React.MouseEvent) {
    e.preventDefault();
    toggleFavorite(pokemon.name);
  }

  const linkTo = pokemon.isCustom ? '#' : `/pokemon/${pokemon.name}`;

  const card = (
    <div
      className={
        layout === 'grid'
          ? 'group relative flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800'
          : 'group relative flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-800'
      }
    >
      <button
        type="button"
        onClick={handleFavoriteClick}
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-1.5 text-lg leading-none shadow-sm transition hover:scale-110 dark:bg-slate-700/90"
      >
        {favorited ? '❤️' : '🤍'}
      </button>

      <img
        src={pokemon.image}
        alt={pokemon.name}
        loading="lazy"
        className={layout === 'grid' ? 'h-28 w-28 object-contain' : 'h-16 w-16 shrink-0 object-contain'}
      />

      <div className={layout === 'grid' ? 'mt-2' : 'flex-1 text-left'}>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {typeof pokemon.id === 'number' ? formatPokemonId(pokemon.id) : 'Custom'}
        </p>
        <p className="font-semibold text-slate-800 dark:text-slate-100">{capitalize(pokemon.name)}</p>
      </div>
    </div>
  );

  if (pokemon.isCustom) return card;

  return <Link to={linkTo}>{card}</Link>;
}
