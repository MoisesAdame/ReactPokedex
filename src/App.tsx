import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Navbar from './components/Navbar';

// para procesar los datos de la api
interface PokemonListItem {
  name: string;
  url: string;
}

// objetos pokemon
interface Pokemon {
  id: number;
  name: string;
  image: string;
}

function App() {

  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [contador, setContador]= React.useState(0);

  useEffect(() => {
    const getPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();
      const pokemonDetails: Pokemon[] = await Promise.all(data.results.map(async (item: PokemonListItem) => {
        const pokemonResponse = await fetch(item.url);
        const pokemon = await pokemonResponse.json();
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default 
        };
      }));
      setPokemons(pokemonDetails);
    }
    getPokemons();
  }, []);

  function aumentar(){
    setContador(contador+1);
    console.log(contador);
  }
  function disminuir(){
    setContador(contador-1);
    console.log(contador);
  }


  return (
    <div className="App">
      <Navbar home="#" links={{'Wikipedia': 'random/link', 'Random': 'random/link'}}></Navbar>

      <h1>HELLO WORLD {contador}</h1>
      <Button onClick={aumentar} label="Aumentar" color='blue'></Button>
      <Button onClick={disminuir} label="Disminuir" color='red'></Button>

      <h1>Pokemons</h1>
      <div className="pokemon-list">
        {pokemons.map(pokemon => (
          <div key={pokemon.id} className="pokemon">
            <p>ID: {pokemon.id}</p>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
