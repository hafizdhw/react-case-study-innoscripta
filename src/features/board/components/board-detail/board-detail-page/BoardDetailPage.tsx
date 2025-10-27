import React from "react";
import "./BoardDetailPage.css";
import { DetailBody } from "../detail-body/DetailBody";
import { ActionButton } from "../action-button/ActionButton";
import { DetailHeader } from "../detail-header/DetailHeader";
import { useGetIssue } from "../../../hooks/useGetIssue";
import { useNavigate } from "react-router-dom";

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
        <button
          type="button"
          onClick={handleBack}
          className="board-detail-page__back-button"
        >
          ← Back
        </button>
        <DetailHeader />
        <div className="board-detail-page__main">
          <DetailBody />
          <ActionButton />
        </div>
      </div>
    </div>
  );
};
