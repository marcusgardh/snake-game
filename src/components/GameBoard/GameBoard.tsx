import React, { useState } from "react";
import "./GameBoard.css";
import Square from "./GameBoard.model";

const GameBoard: React.FC = () => {
  let rows: Square[][] = [];

  function createGameBoard() {
    const numberOfColumnsAndRows: number = 8;

    for (let i: number = 0; i < numberOfColumnsAndRows; i++) {
      let column: Square[] = [];

      for (let u: number = 0; u < numberOfColumnsAndRows; u++) {
        let square: Square = {
          rowPosition: i,
          colPosition: u,
          color:
            (i % 2 === 0 && u % 2 === 0) || (i % 2 !== 0 && u % 2 !== 0)
              ? "gray"
              : "white",
        };
        column.push(square);
      }
      rows.push(column);
    }
  }

  createGameBoard();

  const [playerRow, setPlayerRow] = useState(0);
  const [playerCol, setPlayerCol] = useState(0);

  let circle: { row: number; col: number } = {
    row: playerRow,
    col: playerCol,
  };

  return (
    <>
      <div className="container">
        {rows.map((column, index) => (
          <div key={index} className="column">
            {column.map((square) => (
              <div
                key={square.rowPosition + square.colPosition}
                className={`cube ${square.color}`}
              >
                {square.colPosition === circle.col &&
                  square.rowPosition === circle.row && (
                    <div className="circle" />
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <input
          type="number"
          value={playerCol}
          onChange={(e) => setPlayerCol(parseInt(e.target.value))}
        />
        <input
          type="number"
          value={playerRow}
          onChange={(e) => setPlayerRow(parseInt(e.target.value))}
        />
      </div>
    </>
  );
};

export default GameBoard;
