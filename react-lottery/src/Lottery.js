import React from 'react'
import Ball from './Ball'

class Lottery extends React.Component{
    static defaultProps = {
        title: "Lotto",
        numBalls: 6,
        maxNum: 30
    }
    constructor(props){
        super(props)
        this.state={
            num: Array.from({length: this.props.numBalls})
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.setState(prevState=>({
            num: prevState.num.map(n=>Math.floor(Math.random() * (this.props.maxNum) +1))
        }))
    }
    render(){
        return(
            <section>
                <h2>{this.props.title}</h2>
                {this.state.num.map(n=>{
                    return <Ball num={n}/>
                })}<br/>
                <button onClick={this.handleClick}>Generate</button>
            </section>
        )
    }
}
export default Lottery