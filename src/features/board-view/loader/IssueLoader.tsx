import { useEffect } from "react";
import { mockFetchIssues } from "../../../utils/api";
import { BoardActionType, useBoardDispatch } from "../context/BoardContext";

export const IssueLoader = () => {
  const dispatch = useBoardDispatch();
  useEffect(() => {
    mockFetchIssues().then((issues) => {
      dispatch({ type: BoardActionType.LOAD_ISSUES, payload: issues });
    });
  }, [dispatch]);
  return null;
};
