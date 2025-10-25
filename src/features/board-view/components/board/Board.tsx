import React from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import "./Board.css";

import { IssueStatusEnum } from "../../models/BoardView.model";
import { BoardColumn } from "./BoardColumn";

export const Board = () => {
  function handleDragStart(event: any) {
    // TODO: Implement drag start logic
  }

  function handleDragEnd(event: DragEndEvent) {
    // TODO: Implement drag end logic
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="board">
        {Object.values(IssueStatusEnum).map((status, idx) => (
          <BoardColumn key={`${status}-${idx}`} status={status} />
        ))}
      </div>
    </DndContext>
  );
};
