// One page of Pokémon names
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface NamedResource {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: NamedResource;
}

export interface PokemonAbility {
  ability: NamedResource;
  is_hidden: boolean;
}

export interface PokemonStat {
  base_stat: number;
  stat: NamedResource;
}

// Full info for one Pokémon
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string | null;
    other?: {
      ['official-artwork']?: { front_default: string | null };
      home?: { front_default: string | null };
    };
  };
  cries?: {
    latest: string | null;
    legacy: string | null;
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}

// Shared shape for a Pokémon card, so real and custom Pokémon look the same
export interface PokemonCardData {
  id: number | string;
  name: string;
  image: string;
  isCustom?: boolean;
  height?: number;
  weight?: number;
}
