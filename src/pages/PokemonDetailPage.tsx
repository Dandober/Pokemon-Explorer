import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchPokemonDetail } from '../api/pokemon';
import Spinner from '../components/Spinner';
import TypeBadge from '../components/TypeBadge';
import { useFavorites } from '../context/FavoritesContext';
import type { PokemonDetail } from '../types/pokemon';
import { capitalize, decimetresToMetres, formatPokemonId, hectogramsToKg } from '../utils/format';

export default function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    setError(null);
    fetchPokemonDetail(name)
      .then(setPokemon)
      .catch(() => setError('Could not load this Pokémon.'))
      .finally(() => setLoading(false));
  }, [name]);

  function playCry() {
    const cryUrl = pokemon?.cries?.latest ?? pokemon?.cries?.legacy;
    if (!cryUrl) return;
    if (!audioRef.current) audioRef.current = new Audio(cryUrl);
    audioRef.current.src = cryUrl;
    audioRef.current.play().catch(console.error);
  }

  if (loading) return <Spinner label="Loading Pokémon..." />;
  if (error || !pokemon) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-slate-500">{error ?? 'Pokémon not found.'}</p>
        <Link to="/" className="mt-4 inline-block text-red-600 hover:underline">
          ← Back to Explore
        </Link>
      </div>
    );
  }

  const image =
    pokemon.sprites.other?.['official-artwork']?.front_default ?? pokemon.sprites.front_default;
  const favorited = isFavorite(pokemon.name);
  const hasCry = Boolean(pokemon.cries?.latest ?? pokemon.cries?.legacy);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/" className="text-sm text-slate-500 hover:text-red-600 dark:text-slate-400">
        ← Back to Explore
      </Link>

      <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
        {/* Hero */}
        <div className="flex flex-col items-center gap-4 bg-gradient-to-br from-red-50 to-slate-50 p-8 text-center dark:from-slate-700 dark:to-slate-800">
          {image && <img src={image} alt={pokemon.name} className="h-48 w-48 object-contain drop-shadow-lg" />}
          <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
            {formatPokemonId(pokemon.id)}
          </p>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{capitalize(pokemon.name)}</h1>
          <div className="flex gap-2">
            {pokemon.types.map(t => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={() => toggleFavorite(pokemon.name)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:shadow dark:border-slate-600 dark:bg-slate-700"
            >
              {favorited ? '❤️ Favorited' : '🤍 Add to favorites'}
            </button>
            <button
              type="button"
              onClick={playCry}
              disabled={!hasCry}
              className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              🔊 Play cry
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-4 border-t border-slate-200 p-6 text-center dark:border-slate-700 sm:grid-cols-4">
          <Stat label="Height" value={`${decimetresToMetres(pokemon.height)} m`} />
          <Stat label="Weight" value={`${hectogramsToKg(pokemon.weight)} kg`} />
          <Stat label="Base XP" value={String(pokemon.base_experience)} />
          <Stat
            label="Abilities"
            value={pokemon.abilities.map(a => capitalize(a.ability.name)).join(', ')}
          />
        </div>

        {/* Base stats */}
        <div className="border-t border-slate-200 p-6 dark:border-slate-700">
          <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Base stats</h2>
          <div className="flex flex-col gap-3">
            {pokemon.stats.map(stat => (
              <div key={stat.stat.name} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {stat.stat.name.replace('-', ' ')}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{ width: `${Math.min(100, (stat.base_stat / 180) * 100)}%` }}
                  />
                </div>
                <span className="w-8 text-right text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {stat.base_stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 font-semibold capitalize text-slate-800 dark:text-slate-100">{value}</p>
    </div>
  );
}
