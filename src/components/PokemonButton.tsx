import pokeball from '../images/pokeball.svg';
import './pokemon-button.css';

interface PokemonButtonProps{
    onClick: ()=>void;
    color:string|'red'|'blue';
}

export default function PokemonButton(props: PokemonButtonProps){
    return (
        <button onClick={props.onClick}
            className={`pokemon-button ${props.color==='red'?'red':''} ${props.color==='blue'?'blue':''}`}
            >
            <img src={pokeball} alt="pokeball" />
        </button>
    )
}