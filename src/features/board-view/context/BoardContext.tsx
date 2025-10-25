import React, {createContext, useReducer, useContext, ReactNode, Dispatch} from 'react';
import { Issue } from '../models/BoardView.model';

interface BoardState {
  issues: Issue[];
}

type BoardAction =
  | { type: 'LOAD_ISSUES'; payload: Issue[] }
  | { type: 'MOVE_ISSUE'; id: string; status: Issue['status'] }
  | { type: 'UPDATE_ISSUE'; payload: Issue };

const BoardStateContext = createContext<BoardState | undefined>(undefined);
const BoardDispatchContext = createContext<Dispatch<BoardAction> | undefined>(undefined);

function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'LOAD_ISSUES':
      return { ...state, issues: action.payload };
    case 'MOVE_ISSUE':
      return {
        ...state,
        issues: state.issues.map(issue => issue.id === action.id ? { ...issue, status: action.status } : issue),
      };
    case 'UPDATE_ISSUE':
      return {
        ...state,
        issues: state.issues.map(issue => issue.id === action.payload.id ? action.payload : issue),
      };
    default:
      return state;
  }
}

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(boardReducer, { issues: [] });
  return (
    <BoardStateContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardStateContext.Provider>
  );
};

export function useBoardState() {
  const context = useContext(BoardStateContext);
  if (context === undefined) {
    throw new Error('useBoardState must be used within a BoardProvider');
  }
  return context;
}

export function useBoardDispatch() {
  const context = useContext(BoardDispatchContext);
  if (context === undefined) {
    throw new Error('useBoardDispatch must be used within a BoardProvider');
  }
  return context;
}
