import { createContext, useContext, useState, type ReactNode } from 'react';
import type { PokemonCardData } from '../types/pokemon';

interface CustomPokemonContextValue {
  customPokemon: PokemonCardData[];
  addCustomPokemon: (pokemon: Omit<PokemonCardData, 'id' | 'isCustom'>) => void;
}

const CustomPokemonContext = createContext<CustomPokemonContextValue | null>(null);

// Custom Pokémon only need to last for this session, not saved anywhere
export function CustomPokemonProvider({ children }: { children: ReactNode }) {
  const [customPokemon, setCustomPokemon] = useState<PokemonCardData[]>([]);

  function addCustomPokemon(pokemon: Omit<PokemonCardData, 'id' | 'isCustom'>) {
    setCustomPokemon(prev => [
      { ...pokemon, id: `custom-${Date.now()}`, isCustom: true },
      ...prev,
    ]);
  }

  return (
    <CustomPokemonContext.Provider value={{ customPokemon, addCustomPokemon }}>
      {children}
    </CustomPokemonContext.Provider>
  );
}

export function useCustomPokemon() {
  const ctx = useContext(CustomPokemonContext);
  if (!ctx) throw new Error('useCustomPokemon must be used within a CustomPokemonProvider');
  return ctx;
}
