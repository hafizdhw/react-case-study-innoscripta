import React from "react";
import "./BoardDetailPage.css";
import { DetailBody } from "../detail-body/DetailBody";
import { ActionButton } from "../action-button/ActionButton";
import { DetailHeader } from "../detail-header/DetailHeader";
import { useGetIssue } from "../../../hooks/useGetIssue";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/ui/button";

export const BoardDetailPage = ({ issueId }: { issueId: string }) => {
  const { issue, isLoading } = useGetIssue(issueId);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!issue) {
    return <div>Issue not found</div>;
  }
  return (
    <div className="board-detail-page">
      <div className="board-detail-page__content">
        <DetailHeader title={issue.title} />
        <div className="board-detail-page__main">
          <DetailBody
            assignee={issue.assignee}
            createdAt={issue.createdAt}
            priority={issue.priority}
            severity={issue.severity}
            tags={issue.tags}
          />
          <ActionButton status={issue.status} issueId={issueId} />
        </div>
      </div>
    </div>
  );
};
