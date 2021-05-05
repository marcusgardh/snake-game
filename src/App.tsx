import React, { useState } from "react";
import "./App.css";
import Difficulty from "./components/Difficulty/Difficulty";
import GameBoard from "./components/GameBoard/GameBoard";
import Score from "./components/Score/Score";

const App: React.FC = () => {
  const [numberOfObstacles, setObstacles] = useState(8);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [tail, setTail] = useState(7);
  const [score, setScore] = useState(0);

  function updateDifficulty(x: number) {
    console.log(x);

    if (x === 0) {
      setObstacles(19);
      setTail(5);
    } else if (x === 2) {
      setObstacles(21);
      setTail(9);
    } else if (x === 3) {
      setObstacles(22);
      setTail(11);
    } else {
      setObstacles(20);
      setTail(7);
    }
  }

  function updateGameStarted(bool: boolean) {
    setGameStarted(bool);
  }

  function updateGameOver(bool: boolean) {
    if (bool) {
      setGameOver(true);
    } else {
      setScore(0);
      setGameStarted(false);
      setGameOver(false);
    }
  }

  function updateScore() {
    setScore(score + +1);
  }

  return (
    <div className="container">
      <div className={`${gameOver && "gameover-tint"}`}>
        <div className="score-area">
          <Score score={score} />
          <Difficulty
            disabled={gameStarted}
            updateDifficulty={updateDifficulty}
          />
        </div>
        <GameBoard
          gameStarted={updateGameStarted}
          gameOver={updateGameOver}
          numberOfObstacles={numberOfObstacles}
          tailLength={tail}
          updateScore={updateScore}
        />
      </div>
      {gameOver && (
        <div className="gameover-area">
          <h1>Game Over!</h1>
          <p>You got {score} points!</p>
          <button onClick={() => updateGameOver(false)}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default App;
