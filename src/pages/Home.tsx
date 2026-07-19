import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchAllPokemonIndex, fetchPokemonPage, idFromUrl, officialArtwork } from '../api/pokemon';
import LayoutToggle from '../components/LayoutToggle';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';
import { useCustomPokemon } from '../context/CustomPokemonContext';
import { useDebounce } from '../hooks/useDebounce';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import type { PokemonCardData, PokemonListItem } from '../types/pokemon';

const PAGE_SIZE = 20;

function toCardData(item: PokemonListItem): PokemonCardData {
  const id = idFromUrl(item.url);
  return { id, name: item.name, image: officialArtwork(id) };
}

export default function Home() {
  const { customPokemon } = useCustomPokemon();
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  // Paginated "browse" list, loaded 20 at a time.
  const [items, setItems] = useState<PokemonListItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);

  // Search box — waits for the user to stop typing before filtering
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 350);
  const [searchIndex, setSearchIndex] = useState<PokemonListItem[] | null>(null);
  const [loadingIndex, setLoadingIndex] = useState(false);

  const isSearching = debouncedSearch.trim().length > 0;

  // Stops the same page from being loaded twice at once
  const isFetchingRef = useRef(false);
  const nextOffsetRef = useRef(0);

  const loadNextPage = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;
    isFetchingRef.current = true;
    setLoadingPage(true);
    try {
      const data = await fetchPokemonPage(PAGE_SIZE, nextOffsetRef.current);
      nextOffsetRef.current += PAGE_SIZE;
      setItems(prev => {
        const seen = new Set(prev.map(p => p.name));
        return [...prev, ...data.results.filter(p => !seen.has(p.name))];
      });
      setHasMore(Boolean(data.next));
    } catch (err) {
      console.error(err);
    } finally {
      isFetchingRef.current = false;
      setLoadingPage(false);
    }
  }, [hasMore]);

  // Initial page load.
  useEffect(() => {
    loadNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only load the full Pokémon list the first time the user searches
  useEffect(() => {
    if (!isSearching || searchIndex) return;
    setLoadingIndex(true);
    fetchAllPokemonIndex()
      .then(setSearchIndex)
      .catch(console.error)
      .finally(() => setLoadingIndex(false));
  }, [isSearching, searchIndex]);

  const sentinelRef = useInfiniteScroll(loadNextPage, hasMore && !isSearching);

  const filteredResults = useMemo(() => {
    if (!isSearching || !searchIndex) return [];
    const term = debouncedSearch.trim().toLowerCase();
    return searchIndex.filter(p => p.name.includes(term)).slice(0, 60);
  }, [isSearching, searchIndex, debouncedSearch]);

  const visibleCustom = useMemo(() => {
    if (!isSearching) return customPokemon;
    const term = debouncedSearch.trim().toLowerCase();
    return customPokemon.filter(p => p.name.toLowerCase().includes(term));
  }, [customPokemon, isSearching, debouncedSearch]);

  const cards: PokemonCardData[] = isSearching
    ? [...visibleCustom, ...filteredResults.map(toCardData)]
    : [...visibleCustom, ...items.map(toCardData)];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Explore Pokémon</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Browse, search, and favorite your Pokémon.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <LayoutToggle layout={layout} onChange={setLayout} />
        </div>
      </div>

      {/* Search states */}
      {isSearching && loadingIndex && <Spinner label="Searching the Pokédex..." />}

      {isSearching && !loadingIndex && cards.length === 0 && (
        <p className="py-10 text-center text-slate-400">
          No Pokémon match "{debouncedSearch}". Try a different name.
        </p>
      )}

      {/* Grid/list of results */}
      {(!isSearching || !loadingIndex) && cards.length > 0 && (
        <div
          className={
            layout === 'grid'
              ? 'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
              : 'flex flex-col gap-3'
          }
        >
          {cards.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} layout={layout} />
          ))}
        </div>
      )}

      {/* Infinite scroll sentinel */}
      {!isSearching && (
        <div ref={sentinelRef} className="mt-4">
          {loadingPage && <Spinner label="Loading more Pokémon..." />}
          {!hasMore && <p className="py-6 text-center text-slate-400">You've caught them all!</p>}
        </div>
      )}
    </div>
  );
}
