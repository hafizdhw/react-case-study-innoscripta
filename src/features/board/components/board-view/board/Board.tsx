import React from "react";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import "./Board.css";

import {
  IssueStatus,
  IssueStatusEnum,
} from "../../../../../models/Issue.model";
import { BoardColumn } from "./BoardColumn";
import {
  IssuesActionType,
  useIssuesDispatch,
} from "../../../context/IssuesContext";
import { mockUpdateIssue } from "../../../../../utils/api";
import { useToast } from "../../../../../components/ui/toaster/useToast";

const UNDO_DURATION = 5000;

export const Board = () => {
  const dispatch = useIssuesDispatch();
  const toast = useToast();

  // Configure mouse sensor with activation constraint to prevent accidental drags
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // Require 5px movement before drag starts
    },
  });

  const sensors = useSensors(mouseSensor);

  /**
   * Handles the end of a drag operation
   *
   * This function:
   * 1. Extracts the target status and dragged issue ID
   * 2. Optimistically updates the issue status in the UI
   * 3. Attempts to persist the change via API call
   * 4. Shows a toast with undo option
   * 5. Handles API failures by automatically undoing the change
   *
   * @param event - Drag end event containing source and target information
   */
  async function handleDragEnd(event: DragEndEvent) {
    const targetStatus = event.over?.id;
    const activeIssueId = event.active.id;

    if (targetStatus && activeIssueId) {
      const activeIssue = event.active.data.current;
      if (activeIssue) {
        // Optimistically update the issue status in the UI
        dispatch({
          type: IssuesActionType.UPDATE_ISSUE,
          issueId: String(activeIssueId),
          newStatus: targetStatus as IssueStatus,
        });

        // Attempt to persist the change to the backend
        const proceedUpdate = async () => {
          try {
            await mockUpdateIssue(String(activeIssueId), {
              status: targetStatus as IssueStatus,
            });
          } catch (error) {
            // If API call fails, automatically undo the change
            dispatch({
              type: IssuesActionType.UNDO_ISSUE,
              issueId: String(activeIssueId),
            });
            toast.show({
              message: "Failed to update issue",
              type: "error",
              duration: UNDO_DURATION,
            });
          }
        };

        // Set up automatic API call after a short delay
        const timeout = setTimeout(() => proceedUpdate(), UNDO_DURATION);

        // Show success toast with undo option
        toast.show({
          message: "Issue updated",
          type: "success",
          duration: UNDO_DURATION,
          action: {
            text: "Undo",
            onClick: () => {
              // Manual undo: restore original state and cancel API call
              dispatch({
                type: IssuesActionType.UNDO_ISSUE,
                issueId: String(activeIssueId),
              });
              clearTimeout(timeout);
            },
          },
        });
      }
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="board">
        {/* Render three columns for each issue status */}
        {Object.values(IssueStatusEnum).map((status, idx) => (
          <BoardColumn key={`${status}-${idx}`} status={status} />
        ))}
      </div>
    </DndContext>
  );
};
