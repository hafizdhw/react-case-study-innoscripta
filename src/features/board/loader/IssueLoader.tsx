import { useEffect } from "react";
import { mockFetchIssues } from "../../../utils/api";
import { IssuesActionType, useIssuesDispatch } from "../context/IssuesContext";

export const IssueLoader = () => {
  const dispatch = useIssuesDispatch();

  useEffect(() => {
    let isMounted = true;

    const fetchAndDispatch = () => {
      mockFetchIssues().then((issues) => {
        if (isMounted) {
          dispatch({ type: IssuesActionType.LOAD_ISSUES, payload: issues });
        }
      });
    };

    fetchAndDispatch();

    const intervalId = setInterval(fetchAndDispatch, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return null;
};
