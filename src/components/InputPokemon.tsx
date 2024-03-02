import './input-pokemon.css';
import './body.css';
import { useState, FormEvent } from 'react';
import PokemonButton from './PokemonButton';
import { useNavigate } from 'react-router-dom';

export default function InputPokemon() {
  const navigate = useNavigate();

  const [pokemonName, setPokemonName] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    navigate(`/pokemon/${pokemonName}`);
  };

  return (
    <div className="input-pokemon__form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pokemonName}
          placeholder="Busca a tu Pokemon"
          onChange={(e) => setPokemonName(e.target.value)}
          className="input-pokemon__form-container__text-input"
        />

        <PokemonButton color="red"></PokemonButton>
      </form>
    </div>
  );
}
