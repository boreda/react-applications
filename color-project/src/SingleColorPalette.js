import React from 'react'
import ColorBox from './ColorBox'
import NavBar from './NavBar'
import PaletteFooter from './PaletteFooter'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/styles' 
import styles from './styles/PaletteStyles'

class SingleColorPalette extends React.Component{
    constructor(props){
        super(props)
        this._shades= this.gatherShades(this.props.palette, this.props.colorId);
        this.state={format: "hex"}
        this.changeFormat = this.changeFormat.bind(this)
        console.log(this._shades)
    }
    gatherShades(palette, colorToFilterBy){
        let shades=[];
        let allColors = palette.colors;
        for(let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color=> color.id === colorToFilterBy)
            );
        }
        return shades.slice(1)
    }
    changeFormat(val){
        this.setState({format: val})
    }
    render(){
        const {paletteName, emoji, id} = this.props.palette;
        const {classes} = this.props;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                id={color.id} 
                name={color.name} 
                key={color.name} 
                background={color[this.state.format]}
                showingFullPalette={false}
            />
        ))
        return(
            <div className={classes.Palette}>
                <NavBar 
                    level={this.state.level} 
                    changeLevel={this.changeLevel} 
                    handleChange={this.changeFormat}
                    showingAllColors={false}
                />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} className="back-button">Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}
export default withStyles(styles)(SingleColorPalette)