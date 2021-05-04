import React from "react";

export interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div>
      <p>Score: {score}</p>
    </div>
  );
};

export default Score;
