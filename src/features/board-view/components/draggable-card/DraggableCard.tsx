import { useDraggable } from "@dnd-kit/core";
import { Card, CardProps } from "../../../../components/ui/card/Card";

type DraggableCardProps = CardProps & {
  id: string;
};

export const DraggableCard = ({
  id,
  title,
  status,
  priority,
  severity,
  createdAt,
  assignee,
  tags,
}: DraggableCardProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="draggable-card"
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
