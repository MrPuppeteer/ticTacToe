import React from "react";
import Square from "./Square";

class Board extends React.Component {
  createBoard(row, col) {
    const board = [];
    let cellCounter = 0;

    for (let i = 0; i < row * col; i += 1) {
      board.push(this.renderSquare(cellCounter++));
    }

    return board;
  }

  renderSquare(i) {
    const winner =
      this.props.winnerSquares &&
      (this.props.winnerSquares[0] === i ||
        this.props.winnerSquares[1] === i ||
        this.props.winnerSquares[2] === i);

    return (
      <Square
        winner={winner}
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="grid grid-rows-3 grid-cols-3">
        {this.createBoard(3, 3)}
      </div>
    );
  }
}

export default Board;
