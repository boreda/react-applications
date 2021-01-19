import React from 'react'
import heads from './heads.jpg'
import tails from './tails.jpg'

class Coin extends React.Component{
    render(){
        return(
            <div>
                <img src={this.props.heads === "heads" ? heads : tails} className="Coin-img"/>
            </div>
        )
    }
}
export default Coin