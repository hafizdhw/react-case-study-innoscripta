import { useDraggable } from "@dnd-kit/core";
import { Card, CardProps } from "../../../../../components/ui/card/Card";

import "./DraggableCard.css";
import { memo } from "react";
import { IssueStatus } from "../../../../../models/Issue.model";

type DraggableCardProps = CardProps & {
  id: string;
  onClick?: () => void;
  status: IssueStatus;
};

const DraggableCard = ({
  id,
  title,
  priority,
  assignee,
  onClick,
  status,
}: DraggableCardProps) => {
  // Set up drag-and-drop functionality
  const { attributes, listeners, setNodeRef, transform, isDragging, active } =
    useDraggable({
      id,
      data: {
        status,
      },
    });

  // Apply transform styles when dragging
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const isOtherCardDragging = !!active && active?.id !== id;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`draggable-card ${
        isDragging ? "draggable-card--dragging" : ""
      } 
      ${isOtherCardDragging ? "draggable-card--inactive" : ""}`}
      onClick={onClick}
    >
      <Card title={title} priority={priority} assignee={assignee} />
    </div>
  );
};

export default memo(DraggableCard);
