import { useMemo } from "react";
import { useIssuesState } from "../context/IssuesContext";

export const useGetFiltersOptions = () => {
  const { issues } = useIssuesState();

  const assigneeOptions = useMemo(() => {
    return issues.map((issue) => ({
      value: issue.assignee,
      label: issue.assignee,
    }));
  }, [issues]);

  const severityOptions = useMemo(() => {
    return issues.map((issue) => ({
      value: String(issue.severity),
      label: String(issue.severity),
    }));
  }, [issues]);

  return {
    assigneeOptions,
    severityOptions,
  };
};
