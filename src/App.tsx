import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CustomPokemonProvider } from './context/CustomPokemonContext';
import { FavoritesProvider } from './context/FavoritesContext';
import CreatePokemon from './pages/CreatePokemon';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import PokemonDetailPage from './pages/PokemonDetailPage';

export default function App() {
  return (
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
        </div>
      </CustomPokemonProvider>
    </FavoritesProvider>
  );
}
