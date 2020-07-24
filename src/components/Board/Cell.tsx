import React, { FC } from 'react';

export const Cell: FC<{ player?: string, onClick: () => void }> = ({ player, onClick }) => {
  return (
    <div id="cell-game" onClick={onClick}>{player}</div>
  )
}