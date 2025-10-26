import React from "react";
import "./BoardDetailPage.css";
import { DetailBody } from "../detail-body/DetailBody";
import { ActionButton } from "../action-button/ActionButton";
import { DetailHeader } from "../detail-header/DetailHeader";

export const BoardDetailPage = () => {
  return (
    <div className="board-detail-page">
      <div className="board-detail-page__content">
        <div className="board-detail-page__main">
          <DetailHeader />
          <DetailBody />
        </div>
        <div className="board-detail-page__sidebar">
          <ActionButton />
        </div>
      </div>
    </div>
  );
};
