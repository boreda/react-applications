import Palette from './Palette'
import seedColors from './SeedColors'
import {generatePalette} from './ColorHelpers'

function App() {
  return (
    <div>
      <Palette palette={generatePalette(seedColors[4])}/>
    </div>
  );
}

export default App;
