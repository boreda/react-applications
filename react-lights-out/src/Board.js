import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


class Board extends Component { 
  static defaultProps = {
   nrows: 5,
   ncols: 5,
   chanceLightStartsOn: 0.25   
  }

  constructor(props) {
    super(props);
    this.state={
      hasWon: false,
      board: this.createBoard()
    }
    // this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  createBoard() {
    let board= [];
    for(let y=0; y<this.props.nrows; y++){
      let row=[];
      for(let x=0; x<this.props.ncols; x++){
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row)
    }
    return board
  }

  flipCellsAround(coord) {
    console.log(coord)
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x)
    flipCell(y, x-1)
    flipCell(y, x+1)
    flipCell(y-1, x)
    flipCell(y+1, x)

    let hasWon = board.every(row=>(row.every(col => !col)))
    this.setState({board, hasWon: hasWon});
  }

  render() {
    if(this.state.hasWon){
      return <h1>YOU WON with NEON EFFECT !!</h1>
    }
    const boardComponent = this.state.board.map((r, index)=>(
      <tr key={index}>
        {r.map((c, ls)=>
          <Cell key={index+"-"+ls} isLit={this.state.board[index][ls]} flipCellsAroundMe={()=>this.flipCellsAround(index+"-"+ls)}/>
        )}
      </tr>
    ))
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board
    return(
      <div>
        <div className="Board-title">
          <div className="neon-orange">Light</div>
          <div className="neon-blue"> Out</div>
        </div>
        <table className="Board">
          <tbody>
            {boardComponent}
          </tbody>
        </table>
      </div>
    )

    // TODO
  }
}


export default Board;
