import React from "react";
import { PlaceholderCard } from "../../../../components/ui/placeholder-card/PlaceholderCard";
import { Text } from "../../../../components/ui/text/Text";
import { useBoardState } from "../../context/BoardContext";
import { useDroppableBoardColumn } from "../../hooks/useDroppableBoardColumn";
import { IssuePriority, IssueStatus } from "../../models/BoardView.model";
import { DraggableCard } from "../draggable-card/DraggableCard";

import "./BoardColumn.css";

type BoardColumnProps = {
  status: IssueStatus;
};

export const BoardColumn = ({ status }: BoardColumnProps) => {
  const { setNodeRef, hasPermissionToDrop, active } =
    useDroppableBoardColumn(status);

  const shouldShowPlaceholder = React.useMemo(() => {
    return !!active && active.data.current?.status !== status;
  }, [active, status]);

  const { issues } = useBoardState();
  return (
    <div ref={setNodeRef} className="board-column">
      <Text variant="h3">{status}</Text>
      <div className="board-column__cards">
        {issues
          .filter((issue) => issue.status === status)
          .map((issue) => (
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
