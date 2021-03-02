import React from 'react'
import ColorBox from './ColorBox'
import './Palette.css'
import NavBar from './NavBar'

class Palette extends React.Component{
    constructor(props){
        super(props)
        this.state={
            level: 500
        }
        this.changeLevel = this.changeLevel.bind(this)
    }

    changeLevel(level){
        this.setState({level})
    }
    render(){
        const {colors} = this.props.palette;
        const {level} = this.state.level;
        const colorBoxes = this.props.palette.colors[this.state.level].map(color=>(
            <ColorBox background={color.hex} name={color.name} key={color.name}/>
        ))
        return(
            <div className="Palette">
                <NavBar level={this.state.level} changeLevel={this.changeLevel} />
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
            </div>

        )
    }
}
export default Palette