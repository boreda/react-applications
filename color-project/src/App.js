import {Route, Switch} from 'react-router-dom'
import React from 'react'
import Palette from './Palette'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import seedColors from './SeedColors'
import NewPaletteForm from './NewPaletteForm'
import {generatePalette} from './ColorHelpers'

class App extends React.Component{
  constructor(props){
    super(props)
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
    this.state={
      palettes: savedPalettes || seedColors
    }
    this.savePalette=this.savePalette.bind(this)
    this.findPalette=this.findPalette.bind(this)
    this.deletePalette=this.deletePalette.bind(this)
  }
  findPalette(id){
    return this.state.palettes.find(function(palette){
      return palette.id === id
    })
  }
  savePalette(newPalette){
    this.setState({palettes: [...this.state.palettes, newPalette]}, this.syncLocalStorage)
  }
  deletePalette(id){
    this.setState((prevState)=>({
      palettes: prevState.palettes.filter(palette=>palette.id !== id)
    }), this.syncLocalStorage)
  }
  syncLocalStorage(){
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }
  render(){
    return (
      <Switch>
        <Route exact path='/palette/new' render={(routeProps)=><NewPaletteForm savePalette={this.savePalette} {...routeProps} palettes={this.state.palettes}/>} />
        <Route exact path='/' render={(routeProps)=><PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...routeProps}/>} />
        <Route exact path='/palette/:id' render={(routeProps)=><Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>} />
        <Route exact 
          path='/palette/:paletteId/:colorId' 
          render={(routeProps)=><SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} />} />
      </Switch>
    );
  }
}

export default App;
