import './body.css';
import React, { useEffect } from 'react';
import InputPokemon from './InputPokemon';

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

export default function Body(){
    const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);

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

    return (
        <div className='main-body'>
            
            <InputPokemon></InputPokemon>


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
    )
}
