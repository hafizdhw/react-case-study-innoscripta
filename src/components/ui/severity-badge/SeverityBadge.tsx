import { useMemo } from "react";
import { Badge } from "../badge/Badge";
import "./SeverityBadge.css";

export const SeverityBadge = ({ severity }: { severity: number }) => {
  const { label, icon, variant, color } = useMemo(() => {
    switch (severity) {
      case 1:
        return { 
          label: "Low Severity", 
          icon: "●", 
          variant: "success" as const,
          color: "#28a745"
        };
      case 2:
        return { 
          label: "Medium Severity", 
          icon: "●", 
          variant: "warning" as const,
          color: "#ffc107"
        };
      case 3:
        return { 
          label: "High Severity", 
          icon: "●", 
          variant: "danger" as const,
          color: "#dc3545"
        };
      default:
        return { 
          label: "Low Severity", 
          icon: "●", 
          variant: "success" as const,
          color: "#28a745"
        };
    }
  }, [severity]);

  return (
    <div className="severity-badge" title={label}>
      <span className="severity-badge__icon" style={{ color }}>{icon}</span>
      <Badge variant={variant}>{severity}</Badge>
    </div>
  );
};
