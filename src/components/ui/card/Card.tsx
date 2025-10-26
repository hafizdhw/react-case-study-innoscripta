import React from "react";
import { Text } from "../text/Text";
import "./Card.css";
import { Badge } from "../badge/Badge";
import { Issue } from "../../../features/board-view/models/BoardView.model";

export type CardProps = Pick<
  Issue,
  | "title"
  | "status"
  | "priority"
  | "severity"
  | "createdAt"
  | "assignee"
  | "tags"
>;

export const Card = ({
  title,
  status,
  priority,
  severity,
  createdAt,
  assignee,
  tags,
}: CardProps) => {
  return (
    <div className="card">
      {/* Status/priority pill badges */}
      <div className="card__meta-container">
        <Badge variant="primary">{status}</Badge>
        <Badge variant="info">
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
        <Badge variant="warning">Sev {severity}</Badge>
      </div>
      {/* TITLE */}
      <Text variant="h3" size="lg">{title}</Text>
      {/* Assignee and Date */}
      <div className="card__assignee-date-container">
        <Text variant="paragraph" size="sm">{assignee}</Text>
        <Text variant="paragraph" size="sm">
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
      {tags && tags.length > 0 ? (
        <div className="card__tags-container">
          {tags.map((tag) => (
            <Badge variant="info" key={tag}>
              #{tag}
            </Badge>
          ))}
        </div>
      ) : (
        <Text variant="paragraph" size="sm" className="card__tags-none">
          No tags
        </Text>
      )}
    </div>
  );
};
