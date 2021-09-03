import './App.css';
import { Counter } from './components/Counter';
import Palette from './components/Palette/Palette';

function App() {
  return (
    <div className="App">
      <Palette selected='red' />
      <Counter value={0} color='red'/>
    </div>
  );
}

export default App;
