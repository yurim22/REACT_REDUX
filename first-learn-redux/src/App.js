import "./App.css";
// import { Counter } from "./components/Counter";
// import Palette from './components/Palette/Palette';
import WaitingList from "./components/WaitingList/WaitingList";
import PaletteContainer from "./containers/PaletteContainer";
import CounterContainer from "./containers/CounterContainer";

function App() {
  return (
    <div className="App">
      <PaletteContainer />
      <CounterContainer />
      <WaitingList />
    </div>
  );
}

export default App;
