import { useDraggable } from "@dnd-kit/core";
import { Card, CardProps } from "../../../../components/ui/card/Card";

import "./DraggableCard.css";
import { memo } from "react";

type DraggableCardProps = CardProps & {
  id: string;
  onClick?: () => void;
};

const DraggableCard = ({
  id,
  title,
  status,
  priority,
  severity,
  createdAt,
  assignee,
  tags,
  onClick,
}: DraggableCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging, active } =
    useDraggable({
      id,
      data: {
        status,
      },
    });

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
      <Card
        title={title}
        status={status}
        priority={priority}
        severity={severity}
        createdAt={createdAt}
        assignee={assignee}
        tags={tags}
      />
    </div>
  );
};

export default memo(DraggableCard);
