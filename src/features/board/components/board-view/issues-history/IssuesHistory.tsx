import React, { useState } from "react";
import { Text } from "../../../../../components/ui/text/Text";
import "./IssuesHistory.css";
import { useGetRecentVisttedIssues } from "../../../hooks/useGetRecentVisttedIssues";

export const IssuesHistory = () => {
  const recentVisttedIssues = useGetRecentVisttedIssues();
  const [expanded, setExpanded] = useState(true);

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <div
      className="issues-history"
      style={{
        width: expanded ? "18rem" : "3.5rem",
        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="issues-history__header">
        <Text variant="h3" size="md">
          <strong>{expanded ? "Recent Visited Issues" : ""}</strong>
        </Text>
        <button onClick={handleToggle} className="issues-history__toggle">
          {expanded ? "▼" : "▶"}
        </button>
      </div>
      {expanded &&
        (recentVisttedIssues.length === 0 ? (
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
        ))}
    </div>
  );
};
