import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { DraggableCard } from "./DraggableCard";

const initialIssues = [
  { id: "1", title: "Issue 1", status: "backlog" },
  { id: "2", title: "Issue 2", status: "inprogress" },
  { id: "3", title: "Issue 3", status: "done" },
  { id: "4", title: "Issue 4", status: "backlog" },
];

const columns = [
  { id: "backlog", name: "Backlog" },
  { id: "inprogress", name: "In Progress" },
  { id: "done", name: "Done" },
];

export const Board = () => {
  const [issues, setIssues] = useState(initialIssues);
  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (
      over &&
      active.id !== over.id &&
      columns.some((col) => col.id === over.id)
    ) {
      setIssues((issues) =>
        issues.map((issue) =>
          issue.id === active.id ? { ...issue, status: String(over.id) } : issue
        )
      );
    }
    setActiveId(null);
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div
        style={{
          display: "flex",
          gap: 20,
          padding: 24,
          background: "#f6f8fa",
          height: "80vh",
        }}
      >
        {columns.map((column) => (
          <div
            key={column.id}
            id={column.id}
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: 8,
              padding: 16,
              minWidth: 240,
              boxShadow: "0 2px 8px #0001",
              display: "flex",
              flexDirection: "column",
              maxHeight: "100%",
              overflowY: "auto",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 18 }}>
              {column.name}
            </div>
            <div
              style={{
                flex: 1,
                minHeight: 80,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
              // "droppable"
              id={column.id}
            >
              {issues
                .filter((issue) => issue.status === column.id)
                .map((issue) => (
                  <DraggableCard
                    key={issue.id}
                    id={issue.id}
                    title={issue.title}
                    status={issue.status}
                    priority="high"
                    severity={1}
                    createdAt={new Date().toISOString()}
                    assignee="John Doe"
                    tags={["tag1", "tag2"]}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </DndContext>
  );
};
