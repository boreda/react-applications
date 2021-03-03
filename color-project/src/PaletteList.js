import React from 'react'
import {Link} from 'react-router-dom'

class PaletteList extends React.Component{
    render(){
            const {palettes} = this.props;
        return(
            <div>
                <h1>Palette List colors</h1>
                {palettes.map(p=>(
                    <div>
                        <Link to={`/palette/${p.id}`}>{p.paletteName}</Link>
                    </div>
                ))}
            </div>
        )
    }
}
export default PaletteList