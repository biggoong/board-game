import React, { FC, useEffect, useState, ReactNode, useCallback } from 'react';
import { connect } from 'react-redux';
import { Cell } from './Cell';
import { RootState } from '../../reduxStore';
import { makeMove } from '../../reduxStore/modules/board';
import { checkWin as checkWinUtil } from './utils/checkWin.helper';

interface IProps {
  tooglePlayer: () => void,
  playing: boolean,
  player: "X" | "O",
  winningCondition: number,
  onGameOver: () => void,
}

interface IState {
  rowSize: number,
  columnSize: number,
  board?: string[][],
}

const mapStateToProps = (state: RootState) => ({
  boardStore: state.board.board,
});
const mapDispatchToProps = { makeMove };
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const UnconnectedBoard: FC<IProps & Props> = ({
  tooglePlayer,
  playing,
  player,
  winningCondition,
  onGameOver,
  makeMove,
  boardStore,
}) => {
  const [state, setState] = useState<IState>({
    rowSize: 0,
    columnSize: 0,
    board: undefined,

  })

  const checkWin = useCallback((board: string[][]): boolean => {
    const winning = winningCondition > Math.min(state.columnSize, state.rowSize) ? Math.min(state.columnSize, state.rowSize) : winningCondition;
    return checkWinUtil(board, player, winning);
  }, [player, winningCondition, state.rowSize, state.columnSize]);

  const handleMakeMove = useCallback((x: number, y: number) => {
    if (playing && state.board) {
      state.board[x][y] = player;
      setState({ ...state, board: state.board });
      makeMove(state.board);
      const win = checkWin(state.board);
      if (win) {
        onGameOver();
      } else {
        tooglePlayer();
      }
    }
  }, [playing, state, player, makeMove, onGameOver, tooglePlayer, checkWin]);

  useEffect(() => {
    const fullHeight = window.innerHeight;
    const headerHeight = document.getElementById("header")?.offsetHeight;
    const boardGame = document.getElementById("board-game");
    if (boardGame && headerHeight) {
      boardGame.style.height = `${fullHeight - headerHeight - 20}px`;

      let board = [];

      for (let i = 1; i <= Math.floor(boardGame.clientHeight / 30); i++) {
        const row = [];
        for (let f = 1; f <= Math.floor(boardGame.clientWidth / 30); f++) {
          row.push('');
        }
        board.push(row);
      }

      setState({
        board,
        columnSize: Math.floor(boardGame.clientWidth / 30),
        rowSize: Math.floor(boardGame.clientHeight / 30),
      });

      makeMove(board);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // first move "X" on (0,0)
  useEffect(() => {
    if (playing && state.board && !state.board[0][0]) {
      handleMakeMove(0, 0);
    }
  }, [handleMakeMove, playing, state]);


  const renderBoard = (board: string[][]): ReactNode => {
    return (
      <>
        {
          board.map((row, rowIndex) => {
            return (
              <div id="row-game">
                {row.map((cell, columnIndex) => {
                  return <Cell player={cell} onClick={() => handleMakeMove(rowIndex, columnIndex)} />
                })}
              </div>
            )
          })
        }
      </>
    )
  }

  return (
    <div id="board-game">
      {boardStore && renderBoard(boardStore)}
    </div>
  )
}

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedBoard);
