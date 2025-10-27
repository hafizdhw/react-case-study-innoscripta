import { useEffect, useState } from "react";
import { mockFetchIssues } from "../../../utils/api";
import { Issue } from "../../../models/Issue.model";

export const useGetIssue = (issueId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [issue, setIssue] = useState<Issue | null>(null);
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setIsLoading(true);
        const foundIssue = await mockFetchIssues().then((issues) =>
          issues.find((issue) => issue.id === issueId)
        );
        if (foundIssue) {
          setIssue(foundIssue);
        }
      } catch (error) {
        setIssue(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIssue();
  }, [issueId]);
  return { issue, isLoading };
};
