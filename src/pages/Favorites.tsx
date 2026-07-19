import { useEffect, useState } from 'react';
import { fetchPokemonDetail, officialArtwork } from '../api/pokemon';
import PokemonCard from '../components/PokemonCard';
import Spinner from '../components/Spinner';
import { useFavorites } from '../context/FavoritesContext';
import type { PokemonCardData } from '../types/pokemon';

export default function Favorites() {
  const { favorites } = useFavorites();
  const [cards, setCards] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([...favorites].map(name => fetchPokemonDetail(name)))
      .then(details => {
        if (cancelled) return;
        setCards(details.map(d => ({ id: d.id, name: d.name, image: officialArtwork(d.id) })));
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [favorites]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">Your Favorites</h1>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        {favorites.size === 0 ? 'You have no favorites yet.' : `${favorites.size} Pokémon favorited.`}
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
