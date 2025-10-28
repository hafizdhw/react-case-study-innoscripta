import { useEffect, useState } from "react";
import { useIssuesState } from "../context/IssuesContext";
import { Issue } from "../../../models/Issue.model";
import { mockFetchIssues } from "../../../utils/api";

export const useGetIssue = (issueId: string) => {
  const { issues } = useIssuesState();
  const [isLoading, setIsLoading] = useState(false);
  const [issue, setIssue] = useState<Issue | null>(null);

  // simulating the fetch purpose
  useEffect(() => {
    const fetchIssue = async () => {
      setIsLoading(true);
      const issuesFromDB = await mockFetchIssues();
      const issueFromDB = issuesFromDB.find((issue) => issue.id === issueId);
      const issueFromCache = issues.find((issue) => issue.id === issueId);
      if (issueFromCache) {
        setIsLoading(false);
        return setIssue(issueFromCache);
      }
      if (issueFromDB) {
        setIsLoading(false);
        return setIssue(issueFromDB);
      }
      setIsLoading(false);
      return null;
    };

    fetchIssue();
  }, [issueId, issues]);

  return { issue, isLoading };
};
