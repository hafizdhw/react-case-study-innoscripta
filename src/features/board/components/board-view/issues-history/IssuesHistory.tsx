import React from "react";
import { Text } from "../../../../../components/ui/text/Text";
import { PriorityBadge } from "../../../../../components/ui/priority-badge/PriorityBadge";
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
        <Text variant="h3" size="lg" weight="semibold" className="issues-history__title">
          Recent Visited Issues
        </Text>
      </div>
      
      {recentVisttedIssues.length === 0 ? (
        <div className="issues-history__empty">
          <div className="issues-history__empty-icon">📋</div>
          <Text variant="paragraph" size="md" weight="medium" className="issues-history__empty-title">
            No recent issues
          </Text>
          <Text variant="paragraph" size="sm" className="issues-history__empty-description">
            Issues you visit will appear here for quick access
          </Text>
        </div>
      ) : (
        <div className="issues-history__list">
          {recentVisttedIssues.map((issue) => (
            <div key={issue.id} className="issues-history__item">
              <Text variant="paragraph" size="md" weight="semibold" className="issues-history__item-title">
                {issue.title}
              </Text>
              <PriorityBadge priority={issue.priority} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
