import React from 'react'
import Coin from './Coin'
import './Coin.css'

class Flip extends React.Component{
    constructor(){
        super()
        this.state={
            heads: true,
            count: 0,
            headsCount: 0,
            tailsCount: 0,
            flip: ["heads", "tails"],
            result: "heads"
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        const rand = Math.floor(Math.random() * this.state.flip.length);
        this.setState(prevState=>({
            heads: !prevState.heads,
            count: prevState.count+1,
            headsCount: prevState.flip[rand] === "heads" ? prevState.headsCount +1 : prevState.headsCount ,
            tailsCount: prevState.flip[rand] === "tails" ? prevState.tailsCount +1 : prevState.tailsCount ,
            result: prevState.flip[rand]
        }))
    }
    render(){
        return(
            <section>
                <h2>{this.state.result}</h2>
                <Coin heads={this.state.result}/>
                <span>Out of  {this.state.count} Flips :: Head Counts: {this.state.headsCount}  && </span> 
                <span>Tails Counts: {this.state.tailsCount}</span> <br />
                <button className="Flip-button" onClick={this.handleClick}>Flip me!!</button>
            </section>
        )
    }
}
export default Flip