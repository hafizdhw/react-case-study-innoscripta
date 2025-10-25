import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { IssueStatus, IssueStatusEnum } from "../models/BoardView.model";

export const useDroppableBoardColumn = (status: IssueStatus) => {
  const { setNodeRef, active } = useDroppable({
    id: status,
  });
  const hasPermissionToDrop = React.useMemo(() => {
    if (!active?.data.current?.status) return false;
    const currentActiveStatus: IssueStatus = active.data.current.status;
    if (status === IssueStatusEnum.Backlog) {
      return currentActiveStatus === IssueStatusEnum.InProgress;
    }
    if (status === IssueStatusEnum.InProgress) {
      return currentActiveStatus === IssueStatusEnum.Backlog;
    }
    if (status === IssueStatusEnum.Done) {
      return currentActiveStatus === IssueStatusEnum.InProgress;
    }
  }, [active, status]);

  return { setNodeRef, hasPermissionToDrop, active };
};
