import React, { FC } from 'react';

interface IProps {
  condition?: number,
  setCondition: (size: number) => void,
  player: "X" | "O",
  onStart: () => void,
}

export const Start: FC<IProps> = ({ condition, setCondition, player, onStart }) => {


  return (
    <>
      <h3>Victory conditions:</h3>
      <p>
        How many items in a row vertically, horizontally or diagonally to win (should be odd number)
      </p>
      <input
        type="number"
        min={3}
        value={condition}
        onChange={(e) => setCondition(Number(e.target.value))} />
      <button className="btn" onClick={onStart}>Start!</button>
      <button className="btn" onClick={() => window.location.reload()}>Reset!</button>
      <p>{`Your turn: ${player}`}</p>
    </>
  )
}