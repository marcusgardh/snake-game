import React from "react";

const GameBoard: React.FC = () => {
  function createGameBoard() {
    let rows: number[][] = [];

    for (let i: number = 0; i < 8; i++) {
      let column: number[] = [];

      for (let u: number = 0; u < 8; u++) {
        column.push(u);
      }
      rows.push(column);
    }

    console.log(rows);
  }

  createGameBoard();

  return <div>test</div>;
};

export default GameBoard;
