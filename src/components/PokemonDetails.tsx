import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoCard from './InfoCard';
import InputPokemon from './InputPokemon';
import { Pokemon } from '../interfaces/Pokemon';
import { PokeApi } from '../api/PokeApi';
import './pokemon-details.css';

export default function PokemonDetails() {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null); // Estado inicial como nulo, pero tipado como Pokemon o null

  useEffect(() => {
    async function fetchPokemon() {
      PokeApi.getPokemonById(id)
        .then((response) => {
          console.log(response);

          setPokemon({
            id: response.data.id,
            name: response.data.name,
            image: response.data.sprites.other['official-artwork'].front_default,
            experience: response.data.base_experience,
            height: response.data.height,
            weight: response.data.weight,
            abilities: response.data.abilities.map(
              (ability: { ability: { name: string } }) => ability.ability.name
            ),
            stats: {
              hp: response.data.stats.find(
                (stat: { stat: { name: string } }) => stat.stat.name === 'hp'
              ).base_stat,
              attack: response.data.stats.find(
                (stat: { stat: { name: string } }) => stat.stat.name === 'attack'
              ).base_stat,
              defense: response.data.stats.find(
                (stat: { stat: { name: string } }) => stat.stat.name === 'defense'
              ).base_stat,
              specialAttack: response.data.stats.find(
                (stat: { stat: { name: string } }) => stat.stat.name === 'special-attack'
              ).base_stat,
              specialDefense: response.data.stats.find(
                (stat: { stat: { name: string } }) => stat.stat.name === 'special-defense'
              ).base_stat
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchPokemon();
  }, [id]);

  return (
    <div className='pokemon-info-wrapper'>
      {pokemon ? (
        <div className="pokemon-info-wrapper__components">
          <InputPokemon />
          <InfoCard
            id={pokemon.id.toString()}
            imageUrl={pokemon.image}
            name={pokemon.name}
            experience={pokemon.experience}
            height={pokemon.height}
            weight={pokemon.weight}
            abilities={pokemon.abilities}
            stats={pokemon.stats}
          ></InfoCard>
        </div>
      ) : (
        <div>Cargando detalles del Pokémon...</div>
      )}
    </div>
  );
}
