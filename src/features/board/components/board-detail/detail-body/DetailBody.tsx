import React from "react";
import "./DetailBody.css";

import { Text } from "../../../../../components/ui/text/Text";
import { Badge } from "../../../../../components/ui/badge/Badge";

export const DetailBody = () => {
  const tags = ["auth", "bug"];

  return (
    <div className="detail-body">
      <div className="detail-body__section">
        <Text variant="h3" size="lg">
          Details
        </Text>

        <div className="detail-body__field">
          <Text variant="label" size="sm">
            Assignee
          </Text>
          <Text variant="paragraph" size="md">
            Alice
          </Text>
        </div>

        <div className="detail-body__field">
          <Text variant="label" size="sm">
            Created
          </Text>
          <Text variant="paragraph" size="md">
            {new Date("2025-07-09T10:00:00Z").toLocaleDateString([], {
              month: "short",
              day: "numeric",
            })}
            &nbsp;
            {new Date("2025-07-09T10:00:00Z").toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </div>

        <div className="detail-body__field">
          <Text variant="label" size="sm">
            Tags
          </Text>
          <div className="detail-body__tags">
            {tags && tags.length > 0 ? (
              tags.map((tag) => (
                <Badge variant="info" key={tag}>
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
  );
};
