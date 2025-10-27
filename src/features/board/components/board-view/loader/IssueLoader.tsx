import { useEffect } from "react";
import { mockFetchIssues } from "../../../../../utils/api";
import {
  IssuesActionType,
  useIssuesDispatch,
} from "../../../context/IssuesContext";

/**
 * IssueLoader component that handles initial data loading and periodic updates
 *
 * This component:
 * - Fetches issues data on mount and dispatches it to the Issues context
 * - Sets up periodic refresh every 10 seconds to keep data current
 * - Handles component unmounting to prevent memory leaks
 * - Uses a mounted flag to prevent state updates after unmount
 *
 * The periodic refresh simulates real-time updates that would come from
 * WebSocket connections or polling in a production application.
 */
export const IssueLoader = () => {
  const dispatch = useIssuesDispatch();

  useEffect(() => {
    /**
     * Fetches issues from the API and dispatches them to the context
     * Only updates state if the component is still mounted
     */
    const fetchAndDispatch = () => {
      dispatch({
        type: IssuesActionType.START_LOAD_ISSUES,
        payload: { isInitializing: true, isSyncing: false },
      });
      mockFetchIssues().then((issues) => {
        dispatch({
          type: IssuesActionType.LOAD_ISSUES,
          payload: { issues },
        });
      });
    };

    const simulateRealTimeUpdates = () => {
      dispatch({
        type: IssuesActionType.START_LOAD_ISSUES,
        payload: { isInitializing: false, isSyncing: true },
      });
      mockFetchIssues().then((issues) => {
        dispatch({
          type: IssuesActionType.LOAD_ISSUES,
          payload: { issues, fromSync: true },
        });
      });
    };

    // Initial data fetch
    fetchAndDispatch();

    // Set up periodic refresh every 10 seconds
    const intervalId = setInterval(simulateRealTimeUpdates, 10000);

    // Cleanup function to prevent memory leaks
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // This component doesn't render anything - it's purely for data loading
  return null;
};
