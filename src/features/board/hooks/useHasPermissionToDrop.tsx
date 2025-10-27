import { useDndContext } from "@dnd-kit/core";
import React from "react";
import { IssueStatus, IssueStatusEnum } from "../../../models/Issue.model";
import { useGetCurrentUser } from "../../login/context/AuthContext";

/**
 * Custom hook that determines if a dragged issue can be dropped on a specific column
 *
 * This hook enforces workflow rules for issue status transitions:
 * - Issues can only move from Backlog -> In Progress
 * - Issues can only move from In Progress -> Done
 * - No other transitions are allowed (prevents skipping workflow steps)
 *
 * This ensures proper workflow management and prevents users from accidentally
 * skipping important steps in the issue lifecycle.
 *
 * @param status - The target column status where the issue would be dropped
 * @returns Object containing hasPermissionToDrop boolean
 */
export const useHasPermissionToDrop = (status: IssueStatus) => {
  const { active } = useDndContext();
  const user = useGetCurrentUser();
  const hasPermissionToDrop = React.useMemo(() => {
    // If no active drag operation or user is not admin, no permission
    if (!active?.data.current?.status || user?.role !== "admin") return false;

    const currentActiveStatus: IssueStatus = active.data.current.status;

    // Enforce workflow rules: only allow specific transitions
    if (status === IssueStatusEnum.InProgress) {
      // Only allow Backlog -> In Progress
      return currentActiveStatus === IssueStatusEnum.Backlog;
    }
    if (status === IssueStatusEnum.Done) {
      // Only allow In Progress -> Done
      return currentActiveStatus === IssueStatusEnum.InProgress;
    }

    // No other transitions allowed
    return false;
  }, [active?.data, status, user?.role]);

  return { hasPermissionToDrop };
};
