import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import { Issue, IssueStatus } from "../../../models/Issue.model";

export enum IssuesActionType {
  LOAD_ISSUES = "LOAD_ISSUES",
  UPDATE_ISSUE = "UPDATE_ISSUE",
  UNDO_ISSUE = "UNDO_ISSUE",
  REMOVE_LAST_UPDATED_ISSUE = "REMOVE_LAST_UPDATED_ISSUE",
}

interface IssuesState {
  issues: Issue[];
  lastUpdatedIssues: {
    originalIndex: number;
    originalIssue: Issue;
  }[];
}

type IssuesAction =
  | {
      type: IssuesActionType.LOAD_ISSUES;
      payload: Issue[];
    }
  | {
      type: IssuesActionType.UPDATE_ISSUE;
      issueId: Issue["id"];
      newStatus: IssueStatus;
    }
  | { type: IssuesActionType.UNDO_ISSUE; issueId: Issue["id"] }
  | { type: IssuesActionType.REMOVE_LAST_UPDATED_ISSUE; issueId: Issue["id"] };

const IssuesStateContext = createContext<IssuesState | undefined>(undefined);
const IssuesDispatchContext = createContext<Dispatch<IssuesAction> | undefined>(
  undefined
);

function issuesReducer(state: IssuesState, action: IssuesAction): IssuesState {
  switch (action.type) {
    case IssuesActionType.LOAD_ISSUES:
      return { ...state, issues: action.payload };
    
    case IssuesActionType.UPDATE_ISSUE:
      const { issueId, newStatus } = action;
      // Find the original position of the issue before updating
      const originalIndex = state.issues.findIndex(
        (issue) => issue.id === issueId
      );
      const newIssues = [...state.issues];
      const updatedIssue = newIssues.find((issue) => issue.id === issueId);
      
      if (updatedIssue) {
        // Remove the issue from its current position
        newIssues.splice(newIssues.indexOf(updatedIssue), 1);
        
        return {
          ...state,
          // Add the updated issue to the beginning of the list
          issues: [{ ...updatedIssue, status: newStatus }, ...newIssues],
          // Track this update for potential undo
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
    
    case IssuesActionType.REMOVE_LAST_UPDATED_ISSUE:
      const { issueId: tempIssueId } = action;
      // Remove the undo tracking for a specific issue
      const newLastUpdatedIssues = state.lastUpdatedIssues.filter(
        (item) => item.originalIssue.id !== tempIssueId
      );
      return {
        ...state,
        lastUpdatedIssues: newLastUpdatedIssues,
      };
    
    case IssuesActionType.UNDO_ISSUE:
      const { issueId: undoIssueId } = action;
      // Find the original state of the issue to undo
      const tempIssue = state.lastUpdatedIssues.find(
        (item) => item.originalIssue.id === undoIssueId
      );
      if (!tempIssue) return state;

      const newUndoneIssues = [...state.issues];

      // Remove the issue from its current position
      const currentIndex = newUndoneIssues.findIndex(
        (issue) => issue.id === undoIssueId
      );

      if (currentIndex !== -1) {
        newUndoneIssues.splice(currentIndex, 1);
      }

      // Restore the issue to its original position and state
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

export const IssuesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(issuesReducer, {
    issues: [],
    lastUpdatedIssues: [],
  });
  return (
    <IssuesStateContext.Provider value={state}>
      <IssuesDispatchContext.Provider value={dispatch}>
        {children}
      </IssuesDispatchContext.Provider>
    </IssuesStateContext.Provider>
  );
};

/**
 * Hook to access the issues state from context
 * 
 * @returns Current issues state
 * @throws Error if used outside of IssuesProvider
 */
export function useIssuesState() {
  const context = useContext(IssuesStateContext);
  if (context === undefined) {
    throw new Error("useIssuesState must be used within an IssuesProvider");
  }
  return context;
}

/**
 * Hook to access the issues dispatch function from context
 * 
 * @returns Dispatch function for updating issues state
 * @throws Error if used outside of IssuesProvider
 */
export function useIssuesDispatch() {
  const context = useContext(IssuesDispatchContext);
  if (context === undefined) {
    throw new Error("useIssuesDispatch must be used within an IssuesProvider");
  }
  return context;
}
