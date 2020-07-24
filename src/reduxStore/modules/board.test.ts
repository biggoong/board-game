import { boardReducer } from './board';

describe('board reducer', () => {
  const board = [["X", "", ""], ["", "", ""], ["", "", ""]];
  it('should handle make move', () => {
    expect(boardReducer(undefined, {
      type: 'game/MOVE',
      payload: board,
    })).toEqual({
      board: board,
    })
  })
})