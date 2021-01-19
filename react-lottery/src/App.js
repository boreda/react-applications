import logo from './logo.svg';
import Lottery from './Lottery'
import './App.css';

function App() {
  return (
    <div className="App">
      <Lottery />
      <Lottery title="Mini Lotto" numBalls={3} maxNum={10}/>
    </div>
  );
}

export default App;
