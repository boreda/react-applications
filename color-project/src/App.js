import {Route, Switch} from 'react-router-dom'
import React from 'react'
import Palette from './Palette'
import PaletteList from './PaletteList'
import seedColors from './SeedColors'
import {generatePalette} from './ColorHelpers'

class App extends React.Component{
  findPalette(id){
    return seedColors.find(function(palette){
      return palette.id === id
    })
  }
  render(){
    return (
      <Switch>
        <Route exact path='/' render={()=><PaletteList palettes={seedColors}/>} />
        <Route exact path='/palette/:id' render={(routeProps)=><Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>} />
      </Switch>
    );
  }
}

export default App;
