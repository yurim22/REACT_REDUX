import './App.css';
import { Counter } from './components/Counter';
import Palette from './components/Palette/Palette';
import WaitingList from './components/WaitingList/WaitingList';

function App() {
  return (
    <div className="App">
      <Palette selected='red' />
      <Counter value={0} color='red'/>
      <WaitingList />
    </div>
  );
}

export default App;
