import pokeball from '../images/pokeball.svg';
import './pokemon-button.css';

interface PokemonButtonProps {
  color: string | 'red' | 'blue';
}

export default function PokemonButton(props: PokemonButtonProps) {
  return (
    <button
      className={`pokemon-button ${props.color === 'red' ? 'red' : ''} ${props.color === 'red2' ? 'red__small__btn' : ''}`}
    >
      <img src={pokeball} alt="pokeball" />
    </button>
  );
}
