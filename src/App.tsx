import './App.css';
import Navbar from './components/Navbar';
import Body from './components/Body';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails'; // Asegúrate de crear este componente

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar
          home="/"
          links={{
            Wikipedia: 'https://en.wikipedia.org/wiki/Pok%C3%A9mon',
            Api: 'https://pokeapi.co/',
            Random: `/pokemon/${2}`
          }}
        />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
