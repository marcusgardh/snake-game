import React from "react";

export interface DifficultyProps {
  updateDifficulty(x: number): void;
}

const Difficulty: React.FC<DifficultyProps> = ({ updateDifficulty }) => {
  return (
    <div>
      <label htmlFor="difficuly">Difficulty</label>
      <select
        id="difficulty"
        name="difficulty"
        onChange={(e) => updateDifficulty(parseInt(e.target.value))}
        defaultValue={1}
      >
        <option value={0}>Easy</option>
        <option value={1}>Medium</option>
        <option value={2}>Hard</option>
        <option value={3}>Insane</option>
      </select>
    </div>
  );
};

export default Difficulty;
