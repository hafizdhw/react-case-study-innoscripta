import { useMemo } from "react";
import { useIssuesState } from "../context/IssuesContext";
import { useFiltersState } from "../context/FiltersContext";

/**
 * Custom hook that filters issues based on the current filter state and column status
 * 
 * This hook combines issues from the IssuesContext with filters from the FiltersContext
 * to return a filtered list of issues that belong to a specific column (status).
 * 
 * The filtering logic includes:
 * - Column status matching (Backlog, In Progress, Done)
 * - Text search across issue titles and tags (case-insensitive)
 * - Assignee filtering (exact match)
 * - Severity filtering (exact match)
 * 
 * @param columnStatus - The status/column to filter issues for
 * @returns Array of filtered issues that match all active filters and belong to the specified column
 */
export const useGetFilteredIssues = (columnStatus: string) => {
  const { issues } = useIssuesState();
  const { searchValue, assignee, severity } = useFiltersState();

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      // First filter: Check if issue belongs to the current column
      const isInThisColumn = issue.status === columnStatus;

      // Second filter: Text search across title and tags
      let isMatchesSearch = true;
      if (searchValue) {
        const matchByTitle = issue.title
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        const mathByTags = issue.tags.some((tag) =>
          tag.toLowerCase().includes(searchValue.toLowerCase())
        );
        isMatchesSearch = matchByTitle || mathByTags;
      }

      // Third filter: Assignee matching
      let isMatchesAssignee = true;
      if (assignee) {
        isMatchesAssignee = issue.assignee === assignee;
      }

      // Fourth filter: Severity matching
      let isMatchesSeverity = true;
      if (severity) {
        isMatchesSeverity = issue.severity === severity;
      }

      // All filters must pass for the issue to be included
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
