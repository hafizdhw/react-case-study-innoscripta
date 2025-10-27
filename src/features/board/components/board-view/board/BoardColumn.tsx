import React from "react";
import { PlaceholderCard } from "../../../../../components/ui/placeholder-card/PlaceholderCard";
import { Text } from "../../../../../components/ui/text/Text";
import { useHasPermissionToDrop } from "../../../hooks/useHasPermissionToDrop";
import { IssuePriority, IssueStatus } from "../../../../../models/Issue.model";
import DraggableCard from "../draggable-card/DraggableCard";

import "./BoardColumn.css";
import { useDroppable } from "@dnd-kit/core";
import { useGetFilteredIssues } from "../../../hooks/useGetFilteredIssues";
import { useGetSortedIssues } from "../../../hooks/useGetSortedIssues";
import { useNavigate } from "react-router-dom";
import { addIssueToLocalStorage } from "../../../utils/addIssueToLocalStorage";

type BoardColumnProps = {
  status: IssueStatus;
};

export const BoardColumn = ({ status }: BoardColumnProps) => {
  const navigate = useNavigate();
  
  // Check if the currently dragged item can be dropped on this column
  const { hasPermissionToDrop } = useHasPermissionToDrop(status);
  
  // Set up droppable area for drag-and-drop
  const { setNodeRef, active, isOver } = useDroppable({
    id: status,
    disabled: !hasPermissionToDrop, // Disable if drop is not allowed
  });

  // Get filtered and sorted issues for this column
  const filteredIssues = useGetFilteredIssues(status);
  const sortedIssues = useGetSortedIssues(filteredIssues);

  // Determine if we should show a placeholder card during drag operations
  const shouldShowPlaceholder = React.useMemo(() => {
    return !!active && active.data.current?.status !== status;
  }, [active, status]);

  return (
    <div ref={setNodeRef} className="board-column">
      {/* Column header with status name and issue count */}
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
      
      {/* Column content area with draggable cards */}
      <div className="board-column__cards">
        {/* Render all issues in this column */}
        {sortedIssues.map((issue) => (
          <DraggableCard
            onClick={() => {
              // Track this issue as recently accessed
              addIssueToLocalStorage(issue);
              // Navigate to issue detail page
              navigate(`/issue/${issue.id}`);
            }}
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
        
        {/* Show placeholder during drag operations */}
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
