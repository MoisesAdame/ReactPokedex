// Importar el archivo CSS para estilos
import './body.css';
// Importar componentes y hooks necesarios de React
import Button from './Button';
import React, { useEffect, useRef, useState } from 'react'; // Agregar useRef y useState
import InputPokemon from './InputPokemon';
import PokemonDetails from './PokemonDetails';
// Importar hook para navegación en React Router
import { useNavigate } from 'react-router-dom';
// Importar tipos/interfaces para datos de Pokémon
import { PartialPokemon } from '../models/PartialPokemon';
import { PokemonListItem } from '../models/PokemonListItem';

// Definir el componente Body
export default function Body() {
  // Hook para navegación
  const navigate = useNavigate();

  // Función para ver la información detallada de un Pokémon
  function verInfo(id: number) {
    navigate(`/pokemon/${id}`);
  }

  // Variables de estado para almacenar datos de Pokémon y la URL de la próxima página
  const [pokemons, setPokemons] = useState<PartialPokemon[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  // Ref para cargar más Pokémon cuando se llega al final de la página
  const loadMoreRef = useRef(null);

  // Función para obtener datos de Pokémon de la API
  const getPokemons = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setNextPageUrl(data.next); // Actualizar la URL de la próxima página
    const pokemonDetails: PartialPokemon[] = await Promise.all(
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
    setPokemons((prev) => [...prev, ...pokemonDetails]); // Concatenar los nuevos Pokémon con los existentes
  };

  // Efecto para obtener datos de Pokémon inicialmente y en páginas subsecuentes
  useEffect(() => {
    getPokemons(nextPageUrl);
  }, []);

  // Efecto para usar Intersection Observer y cargar más Pokémon al llegar al final de la página
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

    // Limpiar el observer cuando se desmonta el componente
    return () => observer.disconnect();
  }, [nextPageUrl]); // Se activará nuevamente cuando 'nextPageUrl' cambie

  // Renderizar el componente
  return (
    <div className="main-body p-4">
      {/* Componente de entrada para buscar Pokémon */}
      <InputPokemon />
      {/* Mostrar lista de Pokémon */}
      <div className="pokemon-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10">
        {/* Mapear sobre los Pokémon y renderizar cada tarjeta de Pokémon */}
        {pokemons.map((pokemon) => (
          <div className="card__centered__box">
            <div className="card__circle">
              <img className="card__img" src={pokemon.image} alt="Card" />
            </div>
            <div key={pokemon.id} className="card__box">
              <div className="card__frame">
                <div className="card__txt">{pokemon.id}</div>
                <div className="card__name">{pokemon.name}</div>
                {/* Componente de botón para ver detalles del Pokémon */}
                <Button
                  onClick={() => verInfo(pokemon.id)}
                  label="Ver Información"
                  color="redness"
                ></Button>
              </div>
            </div>
          </div>
        ))}
        {/* Elemento de marcador de posición para Intersection Observer */}
        <div ref={loadMoreRef} className="h-20"></div>
      </div>
    </div>
  );
}
