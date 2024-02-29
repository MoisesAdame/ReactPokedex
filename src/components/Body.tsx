import './body.css';
import React, { useEffect, useRef, useState } from 'react'; // Agregar useRef y useState
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

export default function Body() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [nextPageUrl, setNextPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
    const loadMoreRef = useRef(null);

    const getPokemons = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        setNextPageUrl(data.next); // Actualizar la URL de la próxima página
        const pokemonDetails: Pokemon[] = await Promise.all(
            data.results.map(async (item: PokemonListItem) => {
                const pokemonResponse = await fetch(item.url);
                const pokemon = await pokemonResponse.json();
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.front_default
                };
            })
        );
        setPokemons(prev => [...prev, ...pokemonDetails]); // Concatenar los nuevos Pokémon con los existentes
    };

    useEffect(() => {
        getPokemons(nextPageUrl);
    }, []); // Eliminar la dependencia de nextPageUrl aquí para evitar cargas iniciales múltiples

    // Intersection Observer para cargar más pokemons cuando se llega al final de la página
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && nextPageUrl) {
                    getPokemons(nextPageUrl);
                }
            },
            { threshold: 0.1 }
        );
        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        // Limpiar el observer al desmontar el componente
        return () => observer.disconnect();
    }, [nextPageUrl]); // Se activará nuevamente cuando 'nextPageUrl' cambie

    return (
        <div className='main-body p-4'>
            <InputPokemon />
            <h1 className="text-3xl font-bold text-center mb-8">Pokemons</h1>
            <div className="pokemon-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pokemons.map(pokemon => (
                    <div key={pokemon.id} className="pokemon bg-white rounded-lg overflow-hidden shadow-lg p-4">
                        <p className="text-sm font-semibold">ID: {pokemon.id}</p>
                        <h2 className="text-xl font-bold">{pokemon.name}</h2>
                        <img src={pokemon.image} alt={pokemon.name} className="mx-auto"/>
                    </div>
                ))}
                {/* Elemento para la observación del Intersection Observer */}
                <div ref={loadMoreRef} className="h-20"></div>
            </div>
        </div>
    );
}
