import React from 'react'
import clsx from 'clsx';
import PaletteFormNav from './PaletteFormNav'
import ColorPickerForm from './ColorPickerForm'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button'
import DraggableColorList from './DraggableColorList'
import {arrayMove} from 'react-sortable-hoc' 
import styles from './styles/NewPaletteFormStyles'


class NewPaletteForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            currentColor: 'teal',
            colors: this.props.palettes[0].colors,
            newColorName: '',
            newPaletteName: ""
        }
        this.addNewColors=this.addNewColors.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.removeColor=this.removeColor.bind(this)
        this.clearColors=this.clearColors.bind(this)
        this.addRandomColors=this.addRandomColors.bind(this)
    }
    handleDrawerOpen = ()=>{
        this.setState({open:true})
    }
    handleDrawerClose = ()=>{
        this.setState({open: false})
    }
    addNewColors(newColor){
        this.setState({colors: [...this.state.colors, newColor], newColorName: ''})
    }
    handleChange(evt){
        this.setState({
          [evt.target.name]: evt.target.value
        })
    }
    clearColors(){
      this.setState({colors: []})
    }
    addRandomColors(){
      const allColors = this.props.palettes.map(p=>p.colors).flat();
      var rand = Math.floor(Math.random()*allColors.length)
      const randomColor = allColors[rand]
      this.setState({colors: [...this.state.colors, randomColor]})
    }
    handleSubmit(newPalette){
      newPalette.id= newPalette.paletteName.toLowerCase().replace(/ /g, '-' )
      newPalette.colors= this.state.colors
      this.props.savePalette(newPalette)
      this.props.history.push('/')
    }
    removeColor(colorName) {
      this.setState({
        colors: this.state.colors.filter(color=> color.name !== colorName)
      })
    }

    onSortEnd= ({oldIndex, newIndex}) =>{
      this.setState(({colors})=>({
        colors: arrayMove(colors, oldIndex, newIndex)
      }))
    }
    render(){
        const {classes, maxColors, palettes} = this.props;
        const {open, colors} = this.state;
        console.log(this.state.colors)
        return (
            <div className={classes.root}>
            <PaletteFormNav 
              open={open} 
              palettes={palettes} 
              handleSubmit={this.handleSubmit}
              handleDrawerOpen={this.handleDrawerOpen}
            />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}><ChevronLeftIcon /></IconButton>
                </div>
                <Divider />
                <div className={classes.container}>
                  <Typography variant="h4" gutterBottom>Design your palette</Typography>
                  <div className={classes.buttons}>
                    <Button variant="contained" color="secondary" onClick={this.clearColors} className={classes.button}>Clear Palette</Button>
                    <Button variant="contained" color="primary" onClick={this.addRandomColors} disabled={colors.length >= maxColors} className={classes.button}>Random Colors</Button>
                    <ColorPickerForm colors={this.state.colors} addNewColors={this.addNewColors} colors={colors}/>
                  </div>
                  <Divider />
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                [classes.contentShift]: open,
                })}
                style={{marginTop: 100}}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList 
                colors={this.state.colors} 
                removeColor={this.removeColor}
                axis="xy" 
                onSortEnd={this.onSortEnd}
                />
            </main>
            </div>
    )}
}
export default withStyles(styles, {withTheme: true})(NewPaletteForm);