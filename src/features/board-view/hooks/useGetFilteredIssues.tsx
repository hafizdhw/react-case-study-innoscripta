import { useMemo } from "react";
import { useIssuesState } from "../context/IssuesContext";
import { useFiltersState } from "../context/FiltersContext";

export const useGetFilteredIssues = (columnStatus: string) => {
  const { issues } = useIssuesState();
  const { searchValue, assignee, severity } = useFiltersState();

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const isInThisColumn = issue.status === columnStatus;

      let isMatchesSearch = true;
      if (searchValue) {
        isMatchesSearch = issue.title
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }

      let isMatchesAssignee = true;
      if (assignee) {
        isMatchesAssignee = issue.assignee === assignee;
      }

      let isMatchesSeverity = true;
      if (severity) {
        isMatchesSeverity = issue.severity === severity;
      }

      return (
        isInThisColumn &&
        isMatchesSearch &&
        isMatchesAssignee &&
        isMatchesSeverity
      );
    });
  }, [issues, columnStatus, searchValue, assignee, severity]);

  return filteredIssues;
};
