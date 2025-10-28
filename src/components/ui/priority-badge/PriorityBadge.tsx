import { useMemo } from "react";
import { Badge } from "../badge/Badge";
import { IssuePriority } from "../../../models/Issue.model";
import "./PriorityBadge.css";

export const PriorityBadge = ({ priority }: { priority: IssuePriority }) => {
  const { variant, icon, label } = useMemo(() => {
    switch (priority) {
      case "low":
        return { 
          variant: "info" as const, 
          icon: "↓", 
          label: "Low Priority" 
        };
      case "medium":
        return { 
          variant: "warning" as const, 
          icon: "→", 
          label: "Medium Priority" 
        };
      case "high":
        return { 
          variant: "danger" as const, 
          icon: "↑", 
          label: "High Priority" 
        };
      default:
        return { 
          variant: "info" as const, 
          icon: "↓", 
          label: "Low Priority" 
        };
    }
  }, [priority]);
  
  return (
    <div className="priority-badge" title={label}>
      <span className="priority-badge__icon">{icon}</span>
      <Badge variant={variant}>{priority}</Badge>
    </div>
  );
};
