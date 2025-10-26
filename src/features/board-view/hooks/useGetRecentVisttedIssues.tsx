import React from "react";
import { useListenLocalStorage } from "../../../hooks/useListenLocalStorage";
import { Issue } from "../models/BoardView.model";

export const useGetRecentVisttedIssues = (): Issue[] => {
  const recentVisttedIssues = useListenLocalStorage("recent-vistted-issues");
  const result = React.useMemo(() => {
    return recentVisttedIssues ? JSON.parse(recentVisttedIssues) : [];
  }, [recentVisttedIssues]);
  return result;
};
