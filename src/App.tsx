import './App.css';
import Navbar from './components/Navbar';
import Body from './components/Body'

function App() {

  return (
    <div className="App">
      <Navbar home="#" links={{'Wikipedia': 'https://en.wikipedia.org/wiki/Pok%C3%A9mon', 'Api': 'https://pokeapi.co/', 'Random': 'random'}}></Navbar>

      <Body></Body>

    </div>
  );
}

export default App;
