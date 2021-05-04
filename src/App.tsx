import React, { useState } from "react";
import Difficulty from "./components/Difficulty/Difficulty";
import GameBoard from "./components/GameBoard/GameBoard";
import Score from "./components/Score/Score";

const App: React.FC = () => {
  const [score, setScore] = useState(0);

  function updateScore() {
    setScore(score + +1);
  }

  return (
    <div>
      <Score score={score} />
      <Difficulty />
      <GameBoard score={updateScore} />
    </div>
  );
};

export default App;
