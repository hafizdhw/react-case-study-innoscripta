import React from "react";

import "./DetailHeader.css";
import { Badge } from "../../../../components/ui/badge/Badge";
import {
  IssuePriorityEnum,
  IssueStatusEnum,
} from "../../../board-view/models/BoardView.model";
import { Text } from "../../../../components/ui/text/Text";

export const DetailHeader = () => {
  return (
    <div className="detail-header">
      <div className="detail-header__meta">
        <Badge variant="primary">{IssueStatusEnum.Backlog}</Badge>
        <Badge variant="info">
          {IssuePriorityEnum.High.charAt(0).toUpperCase() +
            IssuePriorityEnum.High.slice(1)}
        </Badge>
        <Badge variant="warning">Severity 1</Badge>
      </div>
      <Text variant="h1" size="3xl">
        Title
      </Text>
    </div>
  );
};
