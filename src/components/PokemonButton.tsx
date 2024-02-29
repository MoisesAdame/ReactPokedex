import pokeball from '../images/pokeball.svg';
import './pokemon-button.css';

interface PokemonButtonProps{
    color:string|'red'|'blue';
}

export default function PokemonButton(props: PokemonButtonProps){
    return (
        <button
            className={`pokemon-button ${props.color==='red'?'red':''} ${props.color==='blue'?'blue':''}`}
            >
            <img src={pokeball} alt="pokeball" />
        </button>
    )
}