import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

export enum FiltersActionType {
  UPDATE_FILTERS = "UPDATE_FILTERS",
  CLEAR_FILTERS = "CLEAR_FILTERS",
}

interface FiltersState {
  searchValue?: string;
  assignee?: string;
  severity?: number;
}

type FiltersAction =
  | {
      type: FiltersActionType.UPDATE_FILTERS;
      searchValue?: string;
      assignee?: string;
      severity?: number;
    }
  | { type: FiltersActionType.CLEAR_FILTERS };

const FiltersStateContext = createContext<FiltersState | undefined>(undefined);
const FiltersDispatchContext = createContext<Dispatch<FiltersAction> | undefined>(
  undefined
);

function filtersReducer(state: FiltersState, action: FiltersAction): FiltersState {
  switch (action.type) {
    case FiltersActionType.UPDATE_FILTERS:
      const {
        searchValue = state.searchValue,
        assignee = state.assignee,
        severity = state.severity,
      } = action;
      return {
        ...state,
        searchValue,
        assignee,
        severity,
      };
    
    case FiltersActionType.CLEAR_FILTERS:
      return {
        searchValue: undefined,
        assignee: undefined,
        severity: undefined,
      };
    
    default:
      return state;
  }
}

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(filtersReducer, {});
  return (
    <FiltersStateContext.Provider value={state}>
      <FiltersDispatchContext.Provider value={dispatch}>
        {children}
      </FiltersDispatchContext.Provider>
    </FiltersStateContext.Provider>
  );
};

export function useFiltersState() {
  const context = useContext(FiltersStateContext);
  if (context === undefined) {
    throw new Error("useFiltersState must be used within a FiltersProvider");
  }
  return context;
}

export function useFiltersDispatch() {
  const context = useContext(FiltersDispatchContext);
  if (context === undefined) {
    throw new Error("useFiltersDispatch must be used within a FiltersProvider");
  }
  return context;
}
