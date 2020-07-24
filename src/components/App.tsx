import React, { useState, useEffect } from 'react';
import './App.css';
import { Start } from './Start';
import { Board } from './Board';

function App() {
  const [playing, setPlaying] = useState(false);
  const [winningCondition, setWinningCondition] = useState<number>(3);
  const [player, setPlayer] = useState<"X" | "O">("X");

  const handleChangeCondition = (condition: number) => {
    setWinningCondition(condition);
  };

  const togglePlayer = () => {
    player === "X" ? setPlayer("O") : setPlayer("X");
  }

  const handleOnStart = () => {
    if (winningCondition < 3) {
      setWinningCondition(3);
    }
    if (winningCondition % 2 === 0) {
      setWinningCondition(winningCondition + 1);
    }
    setPlaying(true);
  }

  const handleGameOver = () => {
    setPlaying(false);
    alert(`Player ${player} win!`);
  }

  useEffect(() => {
    const handleResize = () => window.location.reload();
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  });

  return (
    <div className="App">
      <header className="App-header" id="header">
        <h1>Tic Tac Toe</h1>
        <Start
          condition={winningCondition}
          setCondition={handleChangeCondition}
          player={player}
          onStart={handleOnStart} />
      </header>
      <main>
        <Board
          tooglePlayer={togglePlayer}
          playing={playing}
          player={player}
          winningCondition={winningCondition}
          onGameOver={handleGameOver} />
      </main>
    </div>
  );
}

export default App;
