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
  return (
    <div className="detail-body">
      <div className="detail-body__section">
        <Text variant="h3" size="lg">
          Details
        </Text>

        <div className="detail-body__fields-container">
          <div className="detail-body__field">
            <div className="detail-body__field-label">
              <Text variant="label" size="sm">
                Assignee
              </Text>
            </div>
            <div className="detail-body__field-value">
              <Text variant="paragraph" size="md">
                {assignee ? assignee.charAt(0).toUpperCase() + assignee.slice(1) : ""}
              </Text>
            </div>
          </div>

          <div className="detail-body__field">
            <div className="detail-body__field-label">
              <Text variant="label" size="sm">
                Created
              </Text>
            </div>
            <div className="detail-body__field-value">
              <Text variant="paragraph" size="md">
                {new Date(createdAt).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })}
                &nbsp;
                {new Date(createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </div>
          </div>

          <div className="detail-body__field">
            <div className="detail-body__field-label">
              <Text variant="label" size="sm">
                Priority
              </Text>
            </div>
            <div className="detail-body__field-value">
              <PriorityBadge priority={priority} />
            </div>
          </div>

          <div className="detail-body__field">
            <div className="detail-body__field-label">
              <Text variant="label" size="sm">
                Severity
              </Text>
            </div>
            <div className="detail-body__field-value">
              <SeverityBadge severity={severity} />
            </div>
          </div>

          <div className="detail-body__field">
            <div className="detail-body__field-label">
              <Text variant="label" size="sm">
                Tags
              </Text>
            </div>
            <div className="detail-body__field-value">
              <div className="detail-body__tags">
                {tags && tags.length > 0 ? (
                  tags.map((tag) => (
                    <Badge variant="secondary-dark" key={tag}>
                      #{tag}
                    </Badge>
                  ))
                ) : (
                  <Text variant="paragraph" size="sm">
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
