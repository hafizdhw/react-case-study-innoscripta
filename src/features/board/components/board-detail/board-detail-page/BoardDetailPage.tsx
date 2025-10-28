import React from "react";
import "./BoardDetailPage.css";
import { DetailBody } from "../detail-body/DetailBody";
import { ActionButton } from "../action-button/ActionButton";
import { DetailHeader } from "../detail-header/DetailHeader";
import { useGetIssue } from "../../../hooks/useGetIssue";
import { Text } from "../../../../../components/ui/text/Text";
import { Skeleton } from "../../../../../components/ui/skeleton/Skeleton";

export const BoardDetailPage = ({ issueId }: { issueId: string }) => {
  const { issue, isLoading } = useGetIssue(issueId);

  if (isLoading) {
    return (
      <div className="board-detail-page">
        <div className="board-detail-page__content">
          <div className="board-detail-page__loading">
            <Skeleton
              variant="rectangular"
              size="lg"
              height="3rem"
              width="100%"
            />
            <div className="board-detail-page__loading-content">
              <Skeleton
                variant="rectangular"
                size="md"
                height="24rem"
                width="100%"
              />
              <Skeleton
                variant="rectangular"
                size="md"
                height="12rem"
                width="16rem"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="board-detail-page">
        <div className="board-detail-page__content">
          <div className="board-detail-page__not-found">
            <Text
              variant="h2"
              size="xl"
              className="board-detail-page__not-found-title"
            >
              Issue not found
            </Text>
            <Text
              variant="paragraph"
              size="md"
              className="board-detail-page__not-found-text"
            >
              The issue you're looking for doesn't exist or has been removed.
            </Text>
          </div>
        </div>
      </div>
    );
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
