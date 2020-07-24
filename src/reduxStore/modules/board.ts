// function overloads and generics
export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

type BoardState = {
  board: string[][] | undefined;
};
const initialState: BoardState = { board: undefined };

export const makeMove = (board: string[][]) => {
  return typedAction('game/MOVE', board);
};

type BoardAction = ReturnType<typeof makeMove>;

export function boardReducer(
  state = initialState,
  action: BoardAction
): BoardState {
  switch (action.type) {
    case 'game/MOVE':
      return { board: action.payload };
    default:
      return state;
  }
}