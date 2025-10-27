import React from "react";
import { Text } from "../../../../../components/ui/text/Text";
import "./IssuesHistory.css";
import { useGetRecentVisttedIssues } from "../../../hooks/useGetRecentVisttedIssues";
import { useBoardLayout } from "../../../context/BoardLayoutContext";

export const IssuesHistory = () => {
  const recentVisttedIssues = useGetRecentVisttedIssues();
  const { isExpanded } = useBoardLayout();

  if (!isExpanded) {
    return null;
  }

  return (
    <div className="issues-history">
      <div className="issues-history__header">
        <Text variant="h3" size="md">
          <strong>{isExpanded ? "Recent Visited Issues" : ""}</strong>
        </Text>
      </div>
      {recentVisttedIssues.length === 0 ? (
        <div>No issues found.</div>
      ) : (
        <div className="issues-history__list">
          {recentVisttedIssues.map((issue) => (
            <Text
              key={issue.id}
              variant="paragraph"
              size="sm"
              className="issues-history__item"
            >
              <strong>{issue.title}</strong> &mdash; {issue.status} (Priority:{" "}
              {issue.priority})
            </Text>
          ))}
        </div>
      )}
    </div>
  );
};
