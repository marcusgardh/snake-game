import React from "react";
import "./GameBoard.css";

const GameBoard: React.FC = () => {
  let rows: number[][] = [];

  function createGameBoard() {
    const numberOfColumnsAndRows: number = 8;

    for (let i: number = 0; i < numberOfColumnsAndRows; i++) {
      let column: number[] = [];

      let first: number = 0;

      for (let u: number = 0; u < numberOfColumnsAndRows; u++) {
        if (u === 0) {
          first = u + i + 1;
        }
        u === 0
          ? column.push(first)
          : column.push(first + numberOfColumnsAndRows * u);
      }
      rows.push(column);
    }

    console.log(rows);
  }

  createGameBoard();

  return (
    <div className="container">
      {rows.map((column, index) => (
        <div key={index} className="row">
          {column.map((number) => (
            <div key={number} className="cube">
              {number}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
