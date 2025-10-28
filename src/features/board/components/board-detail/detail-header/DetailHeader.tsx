import React from "react";

import { Issue, IssuePriority } from "../../../../../models/Issue.model";
import { Text } from "../../../../../components/ui/text/Text";
import "./DetailHeader.css";

export const DetailHeader = ({ title }: { title: Issue["title"] }) => {
  return (
    <div className="detail-header">
      <Text variant="h1" size="3xl" weight="semibold">
        {title}
      </Text>
    </div>
  );
};
