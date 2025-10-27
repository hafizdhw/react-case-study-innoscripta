import React from "react";
import { Text } from "../text/Text";
import "./Card.css";
import { Issue } from "../../../models/Issue.model";
import { PriorityBadge } from "../priority-badge/PriorityBadge";
export type CardProps = Pick<Issue, "title" | "priority" | "assignee">;

export const Card = ({ title, priority, assignee }: CardProps) => {
  return (
    <div className="card">
      {/* TITLE */}
      <Text variant="span" size="md">
        {title}
      </Text>
      <div className="card__details">
        <PriorityBadge priority={priority} />
        <Text variant="paragraph" size="sm">
          {assignee ? assignee.charAt(0).toUpperCase() + assignee.slice(1) : ""}
        </Text>
      </div>
    </div>
  );
};
