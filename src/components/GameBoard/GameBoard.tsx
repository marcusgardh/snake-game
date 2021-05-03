import React, { useState } from "react";
import "./GameBoard.css";
import Square from "./GameBoard.model";

const GameBoard: React.FC = () => {
  let rows: Square[][] = [];
  const numberOfColumnsAndRows: number = 8;

  function createGameBoard() {
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
          hasObstacle: false,
          playerCanMove: false,
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
    row:
      playerRow > numberOfColumnsAndRows ? numberOfColumnsAndRows : playerRow,
    col:
      playerCol > numberOfColumnsAndRows ? numberOfColumnsAndRows : playerCol,
  };

  function handleMovement(x: number, y: number) {
    // console.group();
    // console.log(`Spelaren vill till ${x}, ${y}`);
    // console.log(`Spelaren är på ${playerRow}, ${playerCol}`);
    // console.log(playerRow === x && (playerCol === y + 1 || y - 1));
    // console.log(playerCol === y && (playerRow === x + 1 || x - 1));
    // console.groupEnd();

    if (playerRow === x && (playerCol === y + +1 || playerCol === y - 1)) {
      setPlayerCol(y);
    } else if (
      playerCol === y &&
      (playerRow === x + +1 || playerRow === x - 1)
    ) {
      setPlayerRow(x);
    }
  }

  return (
    <>
      <div className="container">
        {rows.map((column, index) => (
          <div key={index} className="column">
            {column.map((square) => (
              <div
                key={square.rowPosition + square.colPosition}
                className={`cube ${square.color}`}
                onClick={() =>
                  handleMovement(square.rowPosition, square.colPosition)
                }
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
      {/* <div>
        <input
          type="number"
          value={playerCol}
          onChange={(e) => handleMovement(e, true)}
        />
        <input
          type="number"
          value={playerRow}
          onChange={(e) => handleMovement(e, false)}
        />
      </div> */}
    </>
  );
};

export default GameBoard;
