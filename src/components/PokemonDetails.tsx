import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoCard from './InfoCard';

interface Pokemon {
    id: number;
    name: string;
    image: string; // URL de la imagen del Pokémon
}

export default function PokemonDetails() {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null); // Estado inicial como nulo, pero tipado como Pokemon o null


  useEffect(() => {
    async function fetchPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon({
        id: data.id,
        name: data.name,
        image: data.sprites.front_default
      });
    }

    fetchPokemon();
  }, [id]); // El useEffect se ejecuta cuando el ID cambia

  return (
    <div>
      {pokemon ? (
        <div>
          <InfoCard id={pokemon.id.toString()} imageUrl={pokemon.image} name={pokemon.name}></InfoCard>
        </div>
      ) : (
        <div>Cargando detalles del Pokémon...</div>
      )}
    </div>
  );
}
