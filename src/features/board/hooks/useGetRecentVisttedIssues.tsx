import React from "react";
import { useListenLocalStorage } from "../../../hooks/useListenLocalStorage";
import { Issue } from "../../../models/Issue.model";
import { LOCAL_STORAGE_KEYS } from "../../../utils/constant";

export const useGetRecentVisttedIssues = (): Issue[] => {
  const recentVisttedIssues = useListenLocalStorage(
    LOCAL_STORAGE_KEYS.RECENT_ACCESSED_ISSUES
  );
  const result = React.useMemo(() => {
    return recentVisttedIssues ? JSON.parse(recentVisttedIssues) : [];
  }, [recentVisttedIssues]);
  return result;
};
