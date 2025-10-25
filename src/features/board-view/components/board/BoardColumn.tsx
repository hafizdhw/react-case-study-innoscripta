import { Text } from "../../../../components/ui/text/Text";
import { useBoardState } from "../../context/BoardContext";
import { IssuePriority, IssueStatus } from "../../models/BoardView.model";
import { DraggableCard } from "../draggable-card/DraggableCard";

import "./BoardColumn.css";

type BoardColumnProps = {
  status: IssueStatus;
};

export const BoardColumn = ({ status }: BoardColumnProps) => {
  const { issues } = useBoardState();
  return (
    <div className="board-column">
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
      </div>
    </div>
  );
};
