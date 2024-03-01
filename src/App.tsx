import './App.css';
import Navbar from './components/Navbar';
import Body from './components/Body'
import InfoCard from './components/InfoCard';

function App() {

  return (
    <div className="App">
      <Navbar home="#" links={{'Wikipedia': 'https://en.wikipedia.org/wiki/Pok%C3%A9mon', 'Api': 'https://pokeapi.co/', 'Random': 'random'}}></Navbar>

      <InfoCard id="1" imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" name="Pikachu"></InfoCard>
      <Body></Body>

    </div>
  );
}

export default App;
