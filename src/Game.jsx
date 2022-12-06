import React from "react";
import Board from "./Board";
import Modal from "./Modal";
import { VscDebugRestart } from "react-icons/vsc";
import { HiOutlineInformationCircle } from "react-icons/hi";

const initialState = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  currentStepNumber: 0,
  xIsNext: true,
  toggle: false,
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], winnerRow: lines[i] };
      }
    }

    return { winner: null, winnerRow: null };
  }

  isDraw(squares) {
    return !squares.includes(null);
  }

  getLocation(move) {
    const locationMap = {
      0: "R1, C1",
      1: "R1, C2",
      2: "R1, C3",
      3: "R2, C1",
      4: "R2, C2",
      5: "R2, C3",
      6: "R3, C1",
      7: "R3, C2",
      8: "R3, C3",
    };

    return locationMap[move];
  }

  toggleInstruction() {
    this.setState({
      toggle: !this.state.toggle,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(
      0,
      this.state.currentStepNumber + 1
    );
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares,
          currentLocation: this.getLocation(i),
          stepNumber: history.length,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      currentStepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      currentStepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  reset() {
    this.setState(initialState);
  }

  render() {
    const { history } = this.state;
    const current = history[this.state.currentStepNumber];
    const squares = current.squares.slice();
    const { winner, winnerRow } = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const currentLocation = step.currentLocation
        ? `(${step.currentLocation})`
        : "";
      const desc = step.stepNumber ? `#${step.stepNumber}` : "Game start";
      const classButton =
        move === this.state.currentStepNumber
          ? "bg-green-500 hover:bg-green-400 text-gray-900"
          : "bg-gray-900 hover:bg-gray-800 text-white border border-white";

      return (
        <li key={move}>
          <button
            className={`${classButton} w-28 lg:w-32 py-2.5 rounded-lg font-medium`}
            onClick={() => this.jumpTo(move)}
          >
            {`${desc} ${currentLocation}`}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Player ${winner} win!`;
    } else if (this.isDraw(squares)) {
      status = "Draw.";
    } else {
      status = `Player ${this.state.xIsNext ? "X" : "O"} turn`;
    }

    return (
      <div className="flex flex-col lg:grid lg:grid-cols-3">
        <div className="flex flex-col lg:items-end lg:pr-8 order-2 lg:order-1 mb-8">
          <div>
            <p className="hidden lg:block w-56 text-4xl font-semibold mb-4">
              {status}
            </p>
            <div>
              <button
                className="w-full text-white bg-sky-600 hover:bg-sky-500 font-medium text-md rounded-md py-2.5 text-center mb-4 flex justify-center"
                onClick={() => this.reset()}
              >
                <VscDebugRestart size="20" className="mr-1" />
                <span>New game</span>
              </button>
              <button
                className="w-full text-white bg-rose-600 hover:bg-rose-500 font-medium text-md rounded-md py-2.5 text-center flex justify-center"
                onClick={() => this.toggleInstruction()}
              >
                <HiOutlineInformationCircle size="20" className="mr-1" />
                <span>Instruction</span>
              </button>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 mb-10">
          <p className="lg:hidden w-full text-4xl text-center font-semibold mb-4">
            {status}
          </p>
          <Board
            squares={current.squares}
            winnerSquares={winnerRow}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="lg:pl-8 flex flex-col items-center lg:items-start order-3">
          <h2 className="text-4xl font-semibold mb-4 text-center lg:text-left">
            History
          </h2>
          <ol className="w-fit grid grid-rows-4 lg:grid-rows-5 grid-flow-col gap-x-8 gap-y-2">
            {moves}
          </ol>
        </div>
        {this.state.toggle && (
          <Modal onClick={() => this.toggleInstruction()} />
        )}
      </div>
    );
  }
}

export default Game;
