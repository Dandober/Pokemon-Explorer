import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface FavoritesContextValue {
  favorites: Set<string>;
  isFavorite: (name: string) => boolean;
  toggleFavorite: (name: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const STORAGE_KEY = 'pokemon-explorer:favorites';

// Favorites (Question 5) live app-wide so the grid, list, and detail page all
// stay in sync, and persist to localStorage so they survive a page refresh.
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
  }, [favorites]);

  function toggleFavorite(name: string) {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function isFavorite(name: string) {
    return favorites.has(name);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
}
