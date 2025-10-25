import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import { Issue, IssueStatus } from "../models/BoardView.model";

export enum BoardActionType {
  LOAD_ISSUES = "LOAD_ISSUES",
  UPDATE_ISSUE = "UPDATE_ISSUE",
  UNDO_ISSUE = "UNDO_ISSUE",
  REMOVE_LAST_UPDATED_ISSUE = "REMOVE_LAST_UPDATED_ISSUE",
}

interface BoardState {
  issues: Issue[];
  lastUpdatedIssues: {
    originalIndex: number;
    originalIssue: Issue;
  }[];
}

type BoardAction =
  | { type: BoardActionType.LOAD_ISSUES; payload: Issue[] }
  | {
      type: BoardActionType.UPDATE_ISSUE;
      issueId: Issue["id"];
      newStatus: IssueStatus;
    }
  | { type: BoardActionType.UNDO_ISSUE; issueId: Issue["id"] }
  | { type: BoardActionType.REMOVE_LAST_UPDATED_ISSUE; issueId: Issue["id"] };

const BoardStateContext = createContext<BoardState | undefined>(undefined);
const BoardDispatchContext = createContext<Dispatch<BoardAction> | undefined>(
  undefined
);

function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case BoardActionType.LOAD_ISSUES:
      return { ...state, issues: action.payload };
    case BoardActionType.UPDATE_ISSUE:
      const { issueId, newStatus } = action;
      const originalIndex = state.issues.findIndex((issue) => issue.id === issueId);
      const newIssues = [...state.issues];
      const updatedIssue = newIssues.find((issue) => issue.id === issueId);
      if (updatedIssue) {
        newIssues.splice(newIssues.indexOf(updatedIssue), 1);
        return {
          ...state,
          issues: [{ ...updatedIssue, status: newStatus }, ...newIssues],
          lastUpdatedIssues: [
            ...state.lastUpdatedIssues,
            {
              originalIssue: updatedIssue,
              originalIndex,
            },
          ],
        };
      }
      return state;
    case BoardActionType.REMOVE_LAST_UPDATED_ISSUE:
      const { issueId: tempIssueId } = action;
      const newLastUpdatedIssues = state.lastUpdatedIssues.filter(
        (item) => item.originalIssue.id !== tempIssueId
      );
      return {
        ...state,
        lastUpdatedIssues: newLastUpdatedIssues,
      };
    case BoardActionType.UNDO_ISSUE:
      const { issueId: undoIssueId } = action;
      const tempIssue = state.lastUpdatedIssues.find(
        (item) => item.originalIssue.id === undoIssueId
      );
      if (!tempIssue) return state;

      const newUndoneIssues = [...state.issues];

      const currentIndex = newUndoneIssues.findIndex(
        (issue) => issue.id === undoIssueId
      );

      if (currentIndex !== -1) {
        newUndoneIssues.splice(currentIndex, 1);
      }

      newUndoneIssues.splice(tempIssue.originalIndex, 0, {
        ...tempIssue.originalIssue,
      });

      return {
        ...state,
        issues: newUndoneIssues,
      };
    default:
      return state;
  }
}

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(boardReducer, {
    issues: [],
    lastUpdatedIssues: [],
  });
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
    throw new Error("useBoardState must be used within a BoardProvider");
  }
  return context;
}

export function useBoardDispatch() {
  const context = useContext(BoardDispatchContext);
  if (context === undefined) {
    throw new Error("useBoardDispatch must be used within a BoardProvider");
  }
  return context;
}
