import { useEffect, useState } from "react";
import { useIssuesState } from "../context/IssuesContext";
import { Issue } from "../../../models/Issue.model";

export const useGetIssue = (issueId: string) => {
  const { issues } = useIssuesState();
  const [isLoading, setIsLoading] = useState(false);
  const [issue, setIssue] = useState<Issue | null>(null);

  // simulating the fetch purpose
  useEffect(() => {
    setIsLoading(true);
    const foundIssue = issues.find((issue) => issue.id === issueId);
    if (foundIssue) {
      setTimeout(() => {
        setIssue(foundIssue);
        setIsLoading(false);
      }, 500);
    }
  }, [issueId]);

  return { issue, isLoading };
};
