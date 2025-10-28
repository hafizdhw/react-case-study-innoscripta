import React from "react";
import { useIssuesState } from "../../../context/IssuesContext";
import { SyncIcon } from "./SyncIcon";
import "./SyncStatus.css";
import { Text } from "../../../../../components/ui/text/Text";
import { useBoardLayout } from "../../../context/BoardLayoutContext";

/**
 * Renders a sync status bar that displays a spinning sync icon
 * while syncing, as well as last updated time.
 */
export const SyncStatus = () => {
  const { isSyncing, lastUpdatedAt } = useIssuesState();
  const { isExpanded } = useBoardLayout();

  const getStatusColor = () => {
    if (isSyncing) return "var(--color-warning)";
    return "var(--color-success)";
  };

  const getStatusText = () => {
    if (isSyncing) return "Syncing...";
    return "Synced";
  };

  const formatLastUpdated = () => {
    if (!lastUpdatedAt) return "Never";
    
    const updated = new Date(lastUpdatedAt);
    return updated.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (!isExpanded) {
    return (
      <div className="sync-status__icon-only">
        <div className="sync-status__compact">
          <SyncIcon isSyncing={isSyncing} />
          <div 
            className="sync-status__indicator" 
            style={{ backgroundColor: getStatusColor() }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="sync-status">
      <div className="sync-status__content">
        <div className="sync-status__status-group">
          <div className="sync-status__icon-container">
            <SyncIcon isSyncing={isSyncing} />
            <div 
              className="sync-status__status-indicator" 
              style={{ backgroundColor: getStatusColor() }}
            />
          </div>
          <Text variant="span" size="md" weight="semibold" className="sync-status__status">
            {getStatusText()}
          </Text>
        </div>
        
        <div className="sync-status__details">
          <Text variant="span" size="xs" className="sync-status__detail-label">
            Last updated
          </Text>
          <Text variant="span" size="sm" weight="medium" className="sync-status__detail-value">
            {formatLastUpdated()}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default SyncStatus;
