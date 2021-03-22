import React from 'react'
import ColorBox from './ColorBox'
import NavBar from './NavBar'
import PaletteFooter from './PaletteFooter'
import {withStyles} from '@material-ui/styles'
import styles from './styles/PaletteStyles'

class Palette extends React.Component{
    constructor(props){
        super(props)
        this.state={
            level: 500,
            format: "hex"
        }
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
    }

    changeLevel(level){
        this.setState({level})
    }
    changeFormat(val){
        this.setState({format: val})
    }
    render(){
        const {classes} = this.props;
        const {colors} = this.props.palette;
        const {level} = this.state.level;
        const colorBoxes = this.props.palette.colors[this.state.level].map(color=>(
            <ColorBox 
                background={color[this.state.format]} 
                name={color.name} 
                key={color.id} 
                id={color.id} 
                paletteId = {this.props.palette.id}
                showingFullPalette={true}
            />
        ))
        return(
            <div className={classes.Palette}>
                <NavBar level={this.state.level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors/>
                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                <PaletteFooter />
            </div>

        )
    }
}
export default withStyles(styles)(Palette)