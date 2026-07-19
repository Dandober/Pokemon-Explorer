import { useEffect, useState } from 'react';
import { fetchPokemonDetail, officialArtwork } from '../api/pokemon';
import PokemonCard from '../components/PokemonCard';
import Spinner from '../components/Spinner';
import { useCustomPokemon } from '../context/CustomPokemonContext';
import { useFavorites } from '../context/FavoritesContext';
import type { PokemonCardData } from '../types/pokemon';

export default function Favorites() {
  const { favorites } = useFavorites();
  const { customPokemon } = useCustomPokemon();
  const [apiCards, setApiCards] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(true);

  // Custom Pokémon aren't in the PokeAPI, so they come straight from
  // context. If one of the rest fails to load, the others still show.
  const customFavorites = customPokemon.filter(p => favorites.has(p.name));
  const apiFavoriteNames = [...favorites].filter(
    name => !customPokemon.some(p => p.name === name),
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.allSettled(apiFavoriteNames.map(name => fetchPokemonDetail(name)))
      .then(results => {
        if (cancelled) return;
        const details = results.flatMap(r => (r.status === 'fulfilled' ? [r.value] : []));
        setApiCards(details.map(d => ({ id: d.id, name: d.name, image: officialArtwork(d.id) })));
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  const cards = [...customFavorites, ...apiCards];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">Your Favorites</h1>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        {favorites.size === 0
          ? 'You have no favorites yet.'
          : loading
            ? 'Loading favorites...'
            : `${cards.length} Pokémon favorited.`}
      </p>

      {loading && favorites.size > 0 && <Spinner label="Loading favorites..." />}

      {!loading && cards.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {cards.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} layout="grid" />
          ))}
        </div>
      )}

      {!loading && favorites.size === 0 && (
        <p className="rounded-2xl border border-dashed border-slate-300 py-16 text-center text-slate-400 dark:border-slate-700">
          Tap the 🤍 on any Pokémon to add it here.
        </p>
      )}
    </div>
  );
}
