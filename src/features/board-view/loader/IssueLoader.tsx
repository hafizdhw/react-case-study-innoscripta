import { useEffect } from "react";
import { mockFetchIssues } from "../../../utils/api";
import { IssuesActionType, useIssuesDispatch } from "../context/IssuesContext";

export const IssueLoader = () => {
  const dispatch = useIssuesDispatch();
  useEffect(() => {
    mockFetchIssues().then((issues) => {
      dispatch({ type: IssuesActionType.LOAD_ISSUES, payload: issues });
    });
  }, [dispatch]);
  return null;
};
