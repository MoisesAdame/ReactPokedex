import './App.css';
import Navbar from './components/Navbar';
import Body from './components/Body';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails'; // Asegúrate de crear este componente
import random from 'random';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar
          home="/"
          links={{
            Wikipedia: 'https://en.wikipedia.org/wiki/Pok%C3%A9mon',
            Api: 'https://pokeapi.co/',
            Random: `/ReactPokedex/pokemon/${random.int(1, 1025)}`
          }}
        />
        <Routes>
          <Route path="/ReactPokedex/" element={<Body />} />
          <Route path="/ReactPokedex/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
