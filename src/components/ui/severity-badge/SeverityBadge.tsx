import { useMemo } from "react";
import { Badge } from "../badge/Badge";

export const SeverityBadge = ({ severity }: { severity: number }) => {
  const severityLabel = useMemo(() => {
    switch (severity) {
      case 1:
        return "low";
      case 2:
        return "medium";
      case 3:
        return "high";
      default:
        return "low";
    }
  }, [severity]);

  return <Badge variant="primary">{severityLabel}</Badge>;
};
