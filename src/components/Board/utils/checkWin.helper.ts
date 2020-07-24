export const checkWin = (board: string[][], player: string, winningCondition: number): boolean => {

  //check row win
  for (let row of board) {
    let inRow = 0;
    row.reduce((prev, curr) => {
      if (inRow === 0) {
        if ((curr !== "") && (curr === player)) {
          inRow += 1;
        }
      } else {
        if ((curr !== "") && (curr === player) && (curr === prev)) {
          inRow += 1;
        }
      }
      return curr;
    }, "");
    if (inRow >= winningCondition) {
      return true;
    }
  }

  // check column win
  for (let c = 0; c < board[0].length; c++) {
    let inColumn = 0;
    let column = [];
    for (let r = 0; r < board.length; r++) {
      column.push(board[r][c]);
    }
    column.reduce((prev, curr) => {
      if (inColumn === 0) {
        if ((curr !== "") && (curr === player)) {
          inColumn += 1;
        }
      } else {
        if ((curr !== "") && (curr === player) && (curr === prev)) {
          inColumn += 1;
        }
      }
      return curr;
    }, "");
    if (inColumn >= winningCondition) {
      return true;
    }
  }

  // check diagonal right win
  for (let c = 0; c < board[0].length; c++) {
    let inDiagonalRightHigher = 0;
    let diagonal = [];
    for (let r = 0; r < board.length; r++) {
      if (board[r][c + r] !== undefined) {
        diagonal.push(board[r][c + r]);
      }
    }
    diagonal.reduce((prev, curr) => {
      if (inDiagonalRightHigher === 0) {
        if ((curr !== "") && (curr === player)) {
          inDiagonalRightHigher += 1;
        }
      } else {
        if ((curr !== "") && (curr === player) && (curr === prev)) {
          inDiagonalRightHigher += 1;
        }
      }
      return curr;
    }, "");
    if (inDiagonalRightHigher >= winningCondition) {
      return true;
    }
  }

  for (let r = 1; r < board.length; r++) {
    let inDiagonalRightLower = 0;
    let diagonal = [];
    for (let c = 0; r + c < board.length; c++) {
      if (board[r + c][c] !== undefined) {
        diagonal.push(board[r + c][c]);
      }
    }
    diagonal.reduce((prev, curr) => {
      if (inDiagonalRightLower === 0) {
        if ((curr !== "") && (curr === player)) {
          inDiagonalRightLower += 1;
        }
      } else {
        if ((curr !== "") && (curr === player) && (curr === prev)) {
          inDiagonalRightLower += 1;
        }
      }
      return curr;
    }, "");
    if (inDiagonalRightLower >= winningCondition) {
      return true;
    }
  }

  // check diagonal left win
  for (let r = board[0].length - 1; r >= 0; r--) {
    let inDiagonalLeftHigher = 0;
    let diagonal = [];
    for (let c = 0; c < board.length; c++) {
      if (board[c][r - c] !== undefined) {
        diagonal.push(board[c][r - c]);
      }
    }
    diagonal.reduce((prev, curr) => {
      if (inDiagonalLeftHigher === 0) {
        if ((curr !== "") && (curr === player)) {
          inDiagonalLeftHigher += 1;
        }
      } else {
        if ((curr !== "") && (curr === player) && (curr === prev)) {
          inDiagonalLeftHigher += 1;
        }
      }
      return curr;
    }, "");
    if (inDiagonalLeftHigher >= winningCondition) {
      return true;
    }
  }

  for (let c = 1; board.length > c; c++) {
    let inDiagonalLeftLower = 0;
    let diagonal = [];
    for (let r = board[0].length - 1; r >= 0; r--) {
      if (board[0].length - 1 + c - r < board.length) {
        if (board[board[0].length - 1 + c - r][r] !== undefined) {
          diagonal.push(board[board[0].length - 1 + c - r][r]);
        }
      }
    }
    diagonal.reduce((prev, curr) => {
      if (inDiagonalLeftLower === 0) {
        if ((curr !== "") && (curr === player)) {
          inDiagonalLeftLower += 1;
        }
      } else {
        if ((curr !== "") && (curr === player) && (curr === prev)) {
          inDiagonalLeftLower += 1;
        }
      }
      return curr;
    }, "");
    if (inDiagonalLeftLower >= winningCondition) {
      return true;
    }
  }


  return false

};