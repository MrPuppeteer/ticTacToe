import React from "react";
import { RxCircle as Circle, RxCross1 as Cross } from "react-icons/rx";

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { winner, value } = this.props;
    const isX = value === "X";
    const isO = value === "O";

    let style =
      "text-center h-32 w-32 m-2 border-4 border-white rounded-xl hover:bg-gray-800 ";

    if (winner) style += "bg-green-600 hover:bg-green-500 text-gray-100";
    else if (isX) style += "text-rose-600";
    else if (isO) style += "text-sky-600";

    return (
      <div className={style} onClick={this.props.onClick}>
        {isX && <Cross size="120" />}
        {isO && <Circle size="120" />}
      </div>
    );
  }
}

export default Square;
