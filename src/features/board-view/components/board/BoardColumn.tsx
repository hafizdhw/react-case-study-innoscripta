import React from "react";
import { PlaceholderCard } from "../../../../components/ui/placeholder-card/PlaceholderCard";
import { Text } from "../../../../components/ui/text/Text";
import { useHasPermissionToDrop } from "../../hooks/useHasPermissionToDrop";
import { IssuePriority, IssueStatus } from "../../models/BoardView.model";
import DraggableCard from "../draggable-card/DraggableCard";

import "./BoardColumn.css";
import { useDroppable } from "@dnd-kit/core";
import { useGetFilteredIssues } from "../../hooks/useGetFilteredIssues";
import { useGetSortedIssues } from "../../hooks/useGetSortedIssues";

type BoardColumnProps = {
  status: IssueStatus;
};

export const BoardColumn = ({ status }: BoardColumnProps) => {
  const { hasPermissionToDrop } = useHasPermissionToDrop(status);
  const { setNodeRef, active, isOver } = useDroppable({
    id: status,
    disabled: !hasPermissionToDrop,
  });

  const filteredIssues = useGetFilteredIssues(status);
  const sortedIssues = useGetSortedIssues(filteredIssues);

  const shouldShowPlaceholder = React.useMemo(() => {
    return !!active && active.data.current?.status !== status;
  }, [active, status]);

  return (
    <div ref={setNodeRef} className="board-column">
      <div className="board-column__header">
        <Text
          variant="paragraph"
          size="md"
          className="board-column__header-text"
        >
          {status}
        </Text>
        <Text variant="paragraph" size="md">
          {sortedIssues.length}
        </Text>
      </div>
      <div className="board-column__cards">
        {sortedIssues.map((issue) => (
          <DraggableCard
            key={issue.id}
            id={issue.id}
            title={issue.title}
            status={issue.status as IssueStatus}
            priority={issue.priority as IssuePriority}
            severity={issue.severity}
            createdAt={issue.createdAt}
            assignee={issue.assignee}
            tags={issue.tags}
          />
        ))}
        {shouldShowPlaceholder && (
          <PlaceholderCard
            title={hasPermissionToDrop ? status : "Not allowed"}
            variant={hasPermissionToDrop ? "primary" : "danger"}
            isActive={isOver}
          />
        )}
      </div>
    </div>
  );
};
