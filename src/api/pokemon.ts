import type { PokemonDetail, PokemonListItem, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Keeps already-loaded Pokémon in memory so we don't fetch them again
const detailCache = new Map<string, Promise<PokemonDetail>>();
let allPokemonIndexCache: PokemonListItem[] | null = null;

export async function fetchPokemonPage(
  limit: number,
  offset: number,
): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error(`Failed to load pokemon list (${res.status})`);
  return res.json();
}

export async function fetchPokemonDetail(nameOrId: string | number): Promise<PokemonDetail> {
  const key = String(nameOrId).toLowerCase();
  const cached = detailCache.get(key);
  if (cached) return cached;

  const promise = fetch(`${BASE_URL}/pokemon/${key}`).then(res => {
    if (!res.ok) throw new Error(`Pokemon "${nameOrId}" not found`);
    return res.json() as Promise<PokemonDetail>;
  });

  detailCache.set(key, promise);
  promise.catch(() => detailCache.delete(key));
  return promise;
}

export async function fetchAllPokemonIndex(): Promise<PokemonListItem[]> {
  if (allPokemonIndexCache) return allPokemonIndexCache;
  const res = await fetch(`${BASE_URL}/pokemon?limit=2000&offset=0`);
  if (!res.ok) throw new Error('Failed to load pokemon index');
  const data: PokemonListResponse = await res.json();
  allPokemonIndexCache = data.results;
  return allPokemonIndexCache;
}

export function idFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? Number(match[1]) : 0;
}

export function officialArtwork(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
