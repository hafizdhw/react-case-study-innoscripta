import React from "react";
import { Text } from "../text/Text";
import "./Card.css";
import { Issue } from "../../../models/Issue.model";
import { PriorityBadge } from "../priority-badge/PriorityBadge";
import { SeverityBadge } from "../severity-badge/SeverityBadge";
export type CardProps = Pick<Issue, "title" | "priority" | "assignee" | "severity" | "tags">;

export const Card = ({ title, priority, assignee, severity, tags }: CardProps) => {
  return (
    <div className="card">
      {/* TITLE */}
      <Text variant="span" size="md">
        {title}
      </Text>
      
      {/* TAGS */}
      {tags && tags.length > 0 && (
        <div className="card__tags">
          {tags.map((tag, index) => (
            <span key={index} className="card__tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="card__details">
        <div className="card__badges">
          <div className="card__badge-group">
            <span className="card__badge-label">Priority</span>
            <PriorityBadge priority={priority} />
          </div>
          <div className="card__badge-group">
            <span className="card__badge-label">Severity</span>
            <SeverityBadge severity={severity} />
          </div>
        </div>
        <div className="card__assignee">
          {assignee ? assignee.charAt(0).toUpperCase() + assignee.slice(1) : "Unassigned"}
        </div>
      </div>
    </div>
  );
};
