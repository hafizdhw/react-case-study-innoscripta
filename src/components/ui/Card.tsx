import React from "react";
import { Text } from "./Text";
import "./Card.css";

export type CardProps = {
  title: string;
  status: string;
  priority: string;
  severity: number;
  createdAt: string;
  assignee: string;
  tags: string[];
};

const statusColor: Record<string, string> = {
  backlog: "#cddc39", // lime
  inprogress: "#42a5f5", // blue
  done: "#81c784", // green
  Backlog: "#cddc39",
  "In Progress": "#42a5f5",
  Done: "#81c784",
};

const priorityColor: Record<string, string> = {
  high: "#e57373", // red
  medium: "#fff176", // yellow
  low: "#aed581", // light green
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
        <span
          style={{
            background: statusColor[status] || "#eee",
            color: "#222",
            fontWeight: 600,
            fontSize: 11.5,
            padding: "2.5px 10px",
            borderRadius: 12,
            letterSpacing: 0.2,
            marginRight: 4,
          }}
        >
          {status}
        </span>
        <span
          style={{
            background: priorityColor[priority] || "#e0e0e0",
            color: "#333",
            fontWeight: 600,
            fontSize: 11.5,
            padding: "2.5px 10px",
            borderRadius: 12,
            letterSpacing: 0.2,
            marginRight: 4,
          }}
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
        <span
          style={{
            background: "#f5ede5",
            color: "#a17c1c",
            fontWeight: 600,
            fontSize: 11.5,
            padding: "2.5px 10px",
            borderRadius: 12,
            letterSpacing: 0.2,
          }}
        >
          Sev {severity}
        </span>
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
            <span
              key={tag}
              style={{
                background: "#e9ecef",
                color: "#707a84",
                fontSize: 11,
                padding: "2.5px 8px",
                borderRadius: 8,
                marginRight: 2,
                marginBottom: 2,
                fontWeight: 500,
                letterSpacing: 0.1,
              }}
            >
              #{tag}
            </span>
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
