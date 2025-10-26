import React from "react";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import "./Board.css";

import { IssueStatus, IssueStatusEnum } from "../../models/BoardView.model";
import { BoardColumn } from "./BoardColumn";
import {
  IssuesActionType,
  useIssuesDispatch,
} from "../../context/IssuesContext";
import { mockUpdateIssue } from "../../../../utils/api";

export const Board = () => {
  const dispatch = useIssuesDispatch();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(mouseSensor);

  async function handleDragEnd(event: DragEndEvent) {
    const targetStatus = event.over?.id;
    const activeIssueId = event.active.id;
    if (targetStatus && activeIssueId) {
      const activeIssue = event.active.data.current;
      if (activeIssue) {
        dispatch({
          type: IssuesActionType.UPDATE_ISSUE,
          issueId: String(activeIssueId),
          newStatus: targetStatus as IssueStatus,
        });
        try {
          await mockUpdateIssue(String(activeIssueId), {
            status: targetStatus as IssueStatus,
          });
        } catch (error) {
          dispatch({
            type: IssuesActionType.UNDO_ISSUE,
            issueId: String(activeIssueId),
          });
        } finally {
          dispatch({
            type: IssuesActionType.REMOVE_LAST_UPDATED_ISSUE,
            issueId: String(activeIssueId),
          });
        }
      }
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="board">
        {Object.values(IssueStatusEnum).map((status, idx) => (
          <BoardColumn key={`${status}-${idx}`} status={status} />
        ))}
      </div>
    </DndContext>
  );
};
