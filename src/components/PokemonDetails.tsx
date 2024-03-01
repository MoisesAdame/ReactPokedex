import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoCard from './InfoCard';
import InputPokemon from './InputPokemon';

interface Pokemon {
    id: number;
    name: string;
    image: string; 
    experience: number; 
    height: number; 
    weight: number; 
    abilities: string[]; 
    stats: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
    };
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
                image: data.sprites.other['official-artwork'].front_default,
                experience: data.base_experience,
                height: data.height,
                weight: data.weight,
                abilities: data.abilities.map((ability: { ability: { name: string }; }) => ability.ability.name),
                stats: {
                    hp: data.stats.find((stat: { stat: { name: string; }; }) => stat.stat.name === 'hp').base_stat,
                    attack: data.stats.find((stat: { stat: { name: string; }; }) => stat.stat.name === 'attack').base_stat,
                    defense: data.stats.find((stat: { stat: { name: string; }; }) => stat.stat.name === 'defense').base_stat,
                    specialAttack: data.stats.find((stat: { stat: { name: string; }; }) => stat.stat.name === 'special-attack').base_stat,
                    specialDefense: data.stats.find((stat: { stat: { name: string; }; }) => stat.stat.name === 'special-defense').base_stat,
                }
            });
        }

        fetchPokemon();
    }, [id]);
    
    return (
        <div>
            {pokemon ? (
                <div>
                    <InputPokemon/>
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
