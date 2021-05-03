import React, { useMemo, useState } from "react";
import "./GameBoard.css";
import Square from "./GameBoard.model";

const GameBoard: React.FC = () => {
  const [grid, setGrid] = useState<Square[][]>([]);
  const numberOfColumnsAndRows: number = 8;

  const [playerRow, setPlayerRow] = useState(0);
  const [playerCol, setPlayerCol] = useState(0);

  let circle: { row: number; col: number } = {
    row:
      playerRow > numberOfColumnsAndRows ? numberOfColumnsAndRows : playerRow,
    col:
      playerCol > numberOfColumnsAndRows ? numberOfColumnsAndRows : playerCol,
  };

  useMemo(() => {
    let rows: Square[][] = [];
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
    setGrid(rows);
  }, []);

  function handleMovement(x: number, y: number): void {
    let playerMoved: boolean = false;

    if (
      playerRow === x &&
      (playerCol === y + +1 || playerCol === y - 1) &&
      !grid[x][y].hasObstacle
    ) {
      setPlayerCol(y);
      playerMoved = true;
    } else if (
      playerCol === y &&
      (playerRow === x + +1 || playerRow === x - 1) &&
      !grid[x][y].hasObstacle
    ) {
      setPlayerRow(x);
      playerMoved = true;
    }

    playerMoved && addObstacle();
  }

  function addObstacle(): void {
    let obstacleAdded: boolean = false;
    while (!obstacleAdded) {
      let x: number = Math.floor(Math.random() * numberOfColumnsAndRows);
      let y: number = Math.floor(Math.random() * numberOfColumnsAndRows);
      let square: Square = grid[x][y];

      if (square.hasObstacle || (x === circle.row && circle.col)) {
        continue;
      } else {
        grid[x][y] = { ...square, hasObstacle: true };
        obstacleAdded = true;
      }
    }
  }

  function isAdjacent(x: number, y: number): boolean {
    let adjacent: boolean = false;
    if (
      playerRow === x &&
      (playerCol === y + +1 || playerCol === y - 1) &&
      !grid[x][y].hasObstacle
    ) {
      adjacent = true;
    } else if (
      playerCol === y &&
      (playerRow === x + +1 || playerRow === x - 1) &&
      !grid[x][y].hasObstacle
    ) {
      adjacent = true;
    }
    return adjacent;
  }

  return (
    <>
      <div className="container">
        {grid.map((column, index) => (
          <div key={index} className="column">
            {column.map((square) => (
              <div
                key={square.rowPosition + square.colPosition}
                className={`cube ${square.color} ${
                  isAdjacent(square.rowPosition, square.colPosition) && "green"
                }`}
                onClick={() =>
                  handleMovement(square.rowPosition, square.colPosition)
                }
              >
                {square.hasObstacle && <div className="obstacle" />}
                {square.rowPosition === circle.row &&
                  square.colPosition === circle.col && (
                    <div className="circle" />
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
