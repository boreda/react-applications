import React from 'react'
import Box from './Box'

class ColorBoxes extends React.Component{
    static defaultProps = {
        data: ['red', 'yellow', 'violet', 'blue', 'teal', 'thistle', 'tomato', 'transparent', 'turquoise', 'unset', 'wheat', 'white', 'whitesmoke', 'yellowgreen']
    }
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e){
        e.target.style.backgroundColor = this.props.data[Math.floor(Math.random()*this.props.data.length +1)]
    }

    render(){
        
        const boxComponent = this.props.data.map((c, index)=> {
            return <Box key={index} color={c} number={index} click = {this.handleClick}/>
        })
        return(
            <div>
                {boxComponent}
            </div>
        )
    }
}

export default ColorBoxes