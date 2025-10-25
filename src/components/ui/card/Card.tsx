import React from "react";
import { Text } from "../text/Text";
import "./Card.css";
import { Badge } from "../badge/Badge";

export type CardProps = {
  title: string;
  status: string;
  priority: string;
  severity: number;
  createdAt: string;
  assignee: string;
  tags: string[];
};

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
      <Text variant="h3">{title}</Text>
      {/* Assignee and Date */}
      <div className="card__assignee-date-container">
        <Text variant="body">{assignee}</Text>
        <Text variant="body">
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
        <Text variant="body" className="card__tags-none">
          No tags
        </Text>
      )}
    </div>
  );
};
