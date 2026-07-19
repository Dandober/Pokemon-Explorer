import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <span className="text-2xl">🔴</span>
          Pokédex
        </NavLink>
        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive ? 'bg-red-600 text-white' : 'text-slate-600 hover:bg-red-50 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive ? 'bg-red-600 text-white' : 'text-slate-600 hover:bg-red-50 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            Favorites
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive ? 'bg-red-600 text-white' : 'text-slate-600 hover:bg-red-50 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            Create
          </NavLink>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="ml-1 rounded-full border border-slate-200 p-2 text-base leading-none transition hover:bg-red-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}
