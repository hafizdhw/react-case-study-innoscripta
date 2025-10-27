import { useMemo } from "react";
import { Badge } from "../badge/Badge";
import { IssuePriority } from "../../../models/Issue.model";

export const PriorityBadge = ({ priority }: { priority: IssuePriority }) => {
  const priorityVariant = useMemo(() => {
    switch (priority) {
      case "low":
        return "info";
      case "medium":
        return "warning";
      case "high":
        return "danger";
      default:
        return "info";
    }
  }, [priority]);
  return <Badge variant={priorityVariant}>{priority}</Badge>;
};
