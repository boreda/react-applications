import React from 'react'
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import MiniPalette from './MiniPalette'
import styles from './styles/PaletteListStyles'

class PaletteList extends React.Component{
    goToPalette(id){
        this.props.history.push(`/palette/${id}`);
    }
    render(){
            const {palettes, classes} = this.props;
        return(
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Palette List colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(p=>(
                            <MiniPalette 
                                {...p} 
                                handleClick={()=>this.goToPalette(p.id)}
                                handleDelete = {this.props.deletePalette}
                                key={p.id}
                                id={p.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(PaletteList)