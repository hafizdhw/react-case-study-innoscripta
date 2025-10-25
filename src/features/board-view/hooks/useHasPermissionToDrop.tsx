import { useDndContext } from "@dnd-kit/core";
import React from "react";
import { IssueStatus, IssueStatusEnum } from "../models/BoardView.model";

export const useHasPermissionToDrop = (status: IssueStatus) => {
  const { active } = useDndContext();
  const hasPermissionToDrop = React.useMemo(() => {
    if (!active?.data.current?.status) return false;
    const currentActiveStatus: IssueStatus = active.data.current.status;
    if (status === IssueStatusEnum.InProgress) {
      return currentActiveStatus === IssueStatusEnum.Backlog;
    }
    if (status === IssueStatusEnum.Done) {
      return currentActiveStatus === IssueStatusEnum.InProgress;
    }
    return false;
  }, [active, status]);

  return { hasPermissionToDrop };
};
