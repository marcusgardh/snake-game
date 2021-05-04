import React, { useEffect, useState } from "react";
import { Square } from "./GameBoard.model";
import "./GameBoard.css";

export interface BoardProps {
  score(): void;
}

const GameBoard: React.FC<BoardProps> = ({ score }) => {
  const [grid, setGrid] = useState<Square[][]>([]);
  const [obstacles, setObstacles] = useState<{ x: number; y: number }[]>([]);
  const numberOfColumnsAndRows: number = 8;

  const [playerRow, setPlayerRow] = useState(
    Math.floor(Math.random() * numberOfColumnsAndRows)
  );
  const [playerCol, setPlayerCol] = useState(
    Math.floor(Math.random() * numberOfColumnsAndRows)
  );

  let circle: { row: number; col: number } = {
    row:
      playerRow > numberOfColumnsAndRows ? numberOfColumnsAndRows : playerRow,
    col:
      playerCol > numberOfColumnsAndRows ? numberOfColumnsAndRows : playerCol,
  };

  useEffect(() => {
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
          hasObstacle: { yes: false, removed: 0 },
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
      !grid[x][y].hasObstacle.yes
    ) {
      setPlayerCol(y);
      playerMoved = true;
    } else if (
      playerCol === y &&
      (playerRow === x + +1 || playerRow === x - 1) &&
      !grid[x][y].hasObstacle.yes
    ) {
      setPlayerRow(x);
      playerMoved = true;
    }

    playerMoved && score();
    playerMoved && addObstacle(x, y);
  }

  function addObstacle(playerX: number, playerY: number): void {
    let obstacleAdded: boolean = false;

    let obstacleArray: { x: number; y: number }[] = obstacles;

    let square: Square =
      obstacleArray[0] && grid[obstacleArray[0].x][obstacleArray[0].y];
    if (obstacleArray.length >= 17) {
      if (obstacleArray.length >= 20) {
        grid[obstacleArray[0].x][obstacleArray[0].y] = {
          ...square,
          hasObstacle: { yes: false, removed: 0 },
        };
        obstacleArray.shift();
      }

      square = grid[obstacleArray[2].x][obstacleArray[2].y];

      grid[obstacleArray[2].x][obstacleArray[2].y] = {
        ...square,
        hasObstacle: { yes: true, removed: 3 },
      };

      if (obstacleArray.length >= 18) {
        square = grid[obstacleArray[1].x][obstacleArray[1].y];

        grid[obstacleArray[1].x][obstacleArray[1].y] = {
          ...square,
          hasObstacle: { yes: true, removed: 2 },
        };
      }

      if (obstacleArray.length >= 19) {
        square = grid[obstacleArray[0].x][obstacleArray[0].y];

        grid[obstacleArray[0].x][obstacleArray[0].y] = {
          ...square,
          hasObstacle: { yes: true, removed: 1 },
        };
      }

      setObstacles(obstacleArray);
    }

    while (!obstacleAdded) {
      let x: number = Math.floor(Math.random() * numberOfColumnsAndRows);
      let y: number = Math.floor(Math.random() * numberOfColumnsAndRows);
      square = grid[x][y];

      if (
        square.hasObstacle.yes ||
        (square.rowPosition === playerX && square.colPosition === playerY)
      ) {
        continue;
      } else {
        grid[x][y] = { ...square, hasObstacle: { yes: true, removed: 0 } };

        setObstacles([...obstacleArray, { x, y }]);

        obstacleAdded = true;

        break;
      }
    }
  }

  function isAdjacent(x: number, y: number): boolean {
    let adjacent: boolean = false;
    if (
      playerRow === x &&
      (playerCol === y + +1 || playerCol === y - 1) &&
      !grid[x][y].hasObstacle.yes
    ) {
      adjacent = true;
    } else if (
      playerCol === y &&
      (playerRow === x + +1 || playerRow === x - 1) &&
      !grid[x][y].hasObstacle.yes
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
                {square.hasObstacle.yes && (
                  <div
                    id={
                      square.hasObstacle.removed > 0
                        ? `removed-${square.hasObstacle.removed}`
                        : undefined
                    }
                    className="obstacle"
                  />
                )}
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
