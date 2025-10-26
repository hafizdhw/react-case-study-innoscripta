import React from "react";
import { BoardDetailPage } from "../features/board-detail/components/board-detail-page/BoardDetailPage";
import { useParams } from "react-router-dom";

export const IssueDetailPage = () => {
  const { id } = useParams();
  if (!id) {
    return <div>Issue not found</div>;
  }
  return <BoardDetailPage issueId={id} />;
};
