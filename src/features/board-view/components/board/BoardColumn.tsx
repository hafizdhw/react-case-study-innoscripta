import React from "react";
import { PlaceholderCard } from "../../../../components/ui/placeholder-card/PlaceholderCard";
import { Text } from "../../../../components/ui/text/Text";
import { useBoardState } from "../../context/BoardContext";
import { useHasPermissionToDrop } from "../../hooks/useHasPermissionToDrop";
import { IssuePriority, IssueStatus } from "../../models/BoardView.model";
import { DraggableCard } from "../draggable-card/DraggableCard";

import "./BoardColumn.css";
import { useDroppable } from "@dnd-kit/core";

type BoardColumnProps = {
  status: IssueStatus;
};

export const BoardColumn = ({ status }: BoardColumnProps) => {
  const { issues } = useBoardState();
  const { hasPermissionToDrop } = useHasPermissionToDrop(status);
  const { setNodeRef, active } = useDroppable({
    id: status,
    disabled: !hasPermissionToDrop,
  });

  const filteredIssues = React.useMemo(() => {
    return issues.filter((issue) => issue.status === status);
  }, [issues, status]);

  const shouldShowPlaceholder = React.useMemo(() => {
    return !!active && active.data.current?.status !== status;
  }, [active, status]);

  return (
    <div ref={setNodeRef} className="board-column">
      <div className="board-column__header">
        <Text variant="body" className="board-column__header-text">
          {status}
        </Text>
        <Text variant="body">{filteredIssues.length}</Text>
      </div>
      <div className="board-column__cards">
        {filteredIssues.map((issue) => (
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
          />
        )}
      </div>
    </div>
  );
};
