import React from "react";
import "./DetailBody.css";

import { Text } from "../../../../../components/ui/text/Text";
import { Badge } from "../../../../../components/ui/badge/Badge";
import { PriorityBadge } from "../../../../../components/ui/priority-badge/PriorityBadge";
import { SeverityBadge } from "../../../../../components/ui/severity-badge/SeverityBadge";
import { IssuePriority, Issue } from "../../../../../models/Issue.model";

export const DetailBody = ({
  assignee,
  createdAt,
  priority,
  severity,
  tags,
}: {
  assignee: Issue["assignee"];
  createdAt: Issue["createdAt"];
  priority: IssuePriority;
  severity: Issue["severity"];
  tags: Issue["tags"];
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="detail-body">
      <div className="detail-body__section">
        <div className="detail-body__header">
          <Text variant="h3" size="lg" weight="semibold" className="detail-body__title">
            Details
          </Text>
        </div>

        <div className="detail-body__fields-container">
          <div className="detail-body__field">
            <div className="detail-body__field-label">
              <div className="detail-body__field-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <Text variant="label" size="sm" weight="medium" className="detail-body__field-label-text">
                Assignee
              </Text>
            </div>
            <div className="detail-body__field-value">
              {assignee ? (
                <div className="detail-body__assignee">
                  <div className="detail-body__assignee-avatar">
                    {assignee.charAt(0).toUpperCase()}
                  </div>
                  <Text variant="paragraph" size="md" weight="medium">
                    {assignee.charAt(0).toUpperCase() + assignee.slice(1)}
                  </Text>
                </div>
              ) : (
                <Text variant="paragraph" size="sm" className="detail-body__empty-state">
                  Unassigned
                </Text>
              )}
            </div>
          </div>

          <div className="detail-body__field">
            <div className="detail-body__field-label">
              <div className="detail-body__field-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8 4V8L11 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Text variant="label" size="sm" weight="medium" className="detail-body__field-label-text">
                Created
              </Text>
            </div>
            <div className="detail-body__field-value">
              <div className="detail-body__date">
                <Text variant="paragraph" size="md" weight="medium">
                  {formatDate(createdAt)}
                </Text>
                <Text variant="paragraph" size="sm" className="detail-body__time">
                  {formatTime(createdAt)}
                </Text>
              </div>
            </div>
          </div>

          <div className="detail-body__field">
            <div className="detail-body__field-label">
              <div className="detail-body__field-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 0L10.5 5.5L16 8L10.5 10.5L8 16L5.5 10.5L0 8L5.5 5.5L8 0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <Text variant="label" size="sm" weight="medium" className="detail-body__field-label-text">
                Priority
              </Text>
            </div>
            <div className="detail-body__field-value">
              <PriorityBadge priority={priority} />
            </div>
          </div>

          <div className="detail-body__field">
            <div className="detail-body__field-label">
              <div className="detail-body__field-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 0L9.5 6H16L11 9.5L12.5 16L8 12L3.5 16L5 9.5L0 6H6.5L8 0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <Text variant="label" size="sm" weight="medium" className="detail-body__field-label-text">
                Severity
              </Text>
            </div>
            <div className="detail-body__field-value">
              <SeverityBadge severity={severity} />
            </div>
          </div>

          <div className="detail-body__field detail-body__field--tags">
            <div className="detail-body__field-label">
              <div className="detail-body__field-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M6 6H10M6 8H10M6 10H8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <Text variant="label" size="sm" weight="medium" className="detail-body__field-label-text">
                Tags
              </Text>
            </div>
            <div className="detail-body__field-value">
              <div className="detail-body__tags">
                {tags && tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <Badge 
                      variant="secondary-dark" 
                      key={tag}
                    >
                      #{tag}
                    </Badge>
                  ))
                ) : (
                  <Text variant="paragraph" size="sm" className="detail-body__empty-state">
                    No tags assigned
                  </Text>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
