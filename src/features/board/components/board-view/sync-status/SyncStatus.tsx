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

  if (!isExpanded) {
    return (
      <div className="sync-status__icon-only">
        <SyncIcon isSyncing={isSyncing} />
      </div>
    );
  }

  return (
    <div className="sync-status">
      <span className="sync-status__icon">
        <SyncIcon isSyncing={isSyncing} />
        {isSyncing && (
          <Text variant="span" size="sm" className="sync-status__text">
            Syncing...
          </Text>
        )}
        {!isSyncing && (
          <Text variant="span" size="sm" className="sync-status__text">
            Synced
          </Text>
        )}
      </span>
      <Text variant="span" size="sm" className="sync-status__text">
        Last updated at:{" "}
        {lastUpdatedAt
          ? new Date(lastUpdatedAt).toLocaleString([], {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "-"}
      </Text>
    </div>
  );
};

export default SyncStatus;
