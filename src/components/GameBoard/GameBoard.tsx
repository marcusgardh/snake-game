import React, { useEffect, useState } from "react";
import { Square } from "./GameBoard.model";
import "./GameBoard.css";

export interface BoardProps {
  numberOfObstacles: number;
  tailLength: number;
  gameStarted(bool: boolean): void;
  setGameOver(bool: boolean): void;
  updateScore(): void;
}

const GameBoard: React.FC<BoardProps> = ({
  numberOfObstacles,
  tailLength,
  gameStarted,
  setGameOver,
  updateScore,
}) => {
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

  const [tail, setTail] = useState<{ row: number; col: number }[]>([]);

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
          hasTail: false,
          isMovable: false,
        };
        column.push(square);
      }
      rows.push(column);
    }
    setGrid(rows);
  }, []);

  function handleMovement(x: number, y: number): void {
    let playerMoved: boolean = false;

    gameStarted(true);

    if (
      playerRow === x &&
      (playerCol === y + +1 || playerCol === y - 1) &&
      !grid[x][y].hasObstacle.yes &&
      !grid[x][y].hasTail
    ) {
      setPlayerCol(y);
      playerMoved = true;
    } else if (
      playerCol === y &&
      (playerRow === x + +1 || playerRow === x - 1) &&
      !grid[x][y].hasObstacle.yes &&
      !grid[x][y].hasTail
    ) {
      setPlayerRow(x);
      playerMoved = true;
    }

    playerMoved && handleTail(playerRow, playerCol);
    playerMoved && updateScore();
    playerMoved && addObstacle(x, y);

    playerMoved && checkGameOver(x, y);
  }

  function checkGameOver(x: number, y: number) {
    if (
      (x + +1 > numberOfColumnsAndRows - 1 ||
        grid[x + +1][y].hasObstacle.yes ||
        grid[x + +1][y].hasTail) &&
      (x - 1 < 0 || grid[x - 1][y].hasObstacle.yes || grid[x - 1][y].hasTail) &&
      (y + +1 > numberOfColumnsAndRows - 1 ||
        grid[x][y + +1].hasObstacle.yes ||
        grid[x][y + +1].hasTail) &&
      (y - 1 < 0 || grid[x][y - 1].hasObstacle.yes || grid[x][y - 1].hasTail)
    ) {
      setGameOver(true);
      restartGame();
    }
  }

  function restartGame() {
    setTail([]);
    setPlayerRow(Math.floor(Math.random() * numberOfColumnsAndRows));
    setPlayerCol(Math.floor(Math.random() * numberOfColumnsAndRows));

    setObstacles([]);

    for (let i: number = 0; i < grid.length; i++) {
      for (let u: number = 0; u < grid[i].length; u++) {
        let square: Square = grid[i][u];

        grid[i][u] = {
          ...square,
          hasObstacle: { yes: false, removed: 0 },
          hasTail: false,
        };
      }
    }
  }

  function handleTail(x: number, y: number) {
    tail.length < tailLength && tail.push({ row: x, col: y });

    for (let i: number = tail.length - 1; i >= 0; i--) {
      if (i > 0) {
        tail[i] = { row: tail[i - 1].row, col: tail[i - 1].col };
      }
    }
    tail[0] = { row: x, col: y };

    for (let i: number = 0; i < numberOfColumnsAndRows; i++) {
      for (let u: number = 0; u < numberOfColumnsAndRows; u++) {
        let square: Square = grid[i][u];

        grid[i][u] = { ...square, hasTail: false };
      }
    }

    for (let u: number = 0; u < tail.length; u++) {
      let square: Square = grid[tail[u].row][tail[u].col];
      grid[tail[u].row][tail[u].col] = { ...square, hasTail: true };
    }
  }

  function addObstacle(playerX: number, playerY: number): void {
    let obstacleAdded: boolean = false;

    let obstacleArray: { x: number; y: number }[] = obstacles;

    let square: Square =
      obstacleArray[0] && grid[obstacleArray[0].x][obstacleArray[0].y];

    if (obstacleArray.length >= numberOfObstacles - 3) {
      if (obstacleArray.length >= numberOfObstacles) {
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

      if (obstacleArray.length >= numberOfObstacles - 2) {
        square = grid[obstacleArray[1].x][obstacleArray[1].y];

        grid[obstacleArray[1].x][obstacleArray[1].y] = {
          ...square,
          hasObstacle: { yes: true, removed: 2 },
        };
      }

      if (obstacleArray.length >= numberOfObstacles - 1) {
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
        (square.rowPosition === playerX && square.colPosition === playerY) ||
        square.hasTail
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
      !grid[x][y].hasObstacle.yes &&
      !grid[x][y].hasTail
    ) {
      adjacent = true;
    } else if (
      playerCol === y &&
      (playerRow === x + +1 || playerRow === x - 1) &&
      !grid[x][y].hasObstacle.yes &&
      !grid[x][y].hasTail
    ) {
      adjacent = true;
    }

    return adjacent;
  }

  return (
    <>
      <div className="board-container">
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
                {tail.map(
                  (tail) =>
                    tail.row === square.rowPosition &&
                    tail.col === square.colPosition && (
                      <div
                        key={`${tail.row}${tail.col}`}
                        className="tail blue"
                      />
                    )
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
