import "./App.css";
import { Counter } from "./components/Counter";
// import Palette from './components/Palette/Palette';
import WaitingList from "./components/WaitingList/WaitingList";
import PaletteContainer from "./containers/PaletteContainer";

function App() {
  return (
    <div className="App">
      <PaletteContainer />
      <Counter value={0} />
      <WaitingList />
    </div>
  );
}

export default App;
