import logo from '../images/International_Pokémon_logo.svg.png';
import './navbar.css';

interface NavbarProps{
    home: string;
    links: { [key: string]: string };
}

export default function Navbar(props: NavbarProps){
    // Array to store JSX elements
    const elements = [];

    for (let key in props.links) {
        elements.push(
            <li className='nav__container__links__element'>
                <a href={props.links[key]}>
                    {key}
                </a>
            </li>
        )
    }
    
    return (
        <header className='nav'>
            <a href={props.home} className='nav__home-link'>
                <img src={logo} alt="Pokemon Logo" className='nav__home-link__img'/>
            </a>
            <nav className='nav__container'>
                <ul className="nav__container__links">
                    {elements}
                </ul>
            </nav>
        </header>
    )
}