import { Route, Routes } from 'react-router-dom';
import BackToTop from './components/BackToTop';
import Navbar from './components/Navbar';
import { CustomPokemonProvider } from './context/CustomPokemonContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import CreatePokemon from './pages/CreatePokemon';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import PokemonDetailPage from './pages/PokemonDetailPage';

// Root layout: wraps every route in the theme/favorites/custom-pokemon
// providers so any page can read or update that state via its hook.
export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CustomPokemonProvider>
          <div className="min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/create" element={<CreatePokemon />} />
            </Routes>
            <BackToTop />
          </div>
        </CustomPokemonProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
