import './body.css';
import Button from './Button';
import React, { useEffect, useRef, useState } from 'react'; // Agregar useRef y useState
import InputPokemon from './InputPokemon';
import PokemonDetails from './PokemonDetails';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    function verInfo(id: number) {
        navigate(`/pokemon/${id}`);
    }

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [nextPageUrl, setNextPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
    const loadMoreRef = useRef(null);
    const [mode, setMode] = useState('all');

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
                    image: pokemon.sprites.other['official-artwork'].front_default
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
            <InputPokemon />;
            <div className="pokemon-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10">
                {pokemons.map(pokemon => (
                    <div className="card__centered__box">
                        <div className="card__circle">
                            <img className="card__img" src={pokemon.image} alt="Card"/>
                        </div>
                        <div key = {pokemon.id} className='card__box'>
                            <div className="card__frame">
                                <div className="card__txt">{pokemon.id}</div>
                                <div className="card__name">{pokemon.name}</div>
                                <Button onClick={() => verInfo(pokemon.id)} label="Ver Información" color='redness'></Button>
                            </div>
                        </div>
                    </div>

                ))}
                {/* Elemento para la observación del Intersection Observer */}
                <div ref={loadMoreRef} className="h-20"></div>
            </div>
        </div>
    );
}
