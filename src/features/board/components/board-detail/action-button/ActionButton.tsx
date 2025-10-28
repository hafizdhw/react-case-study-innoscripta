import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ActionButton.css";
import { Text } from "../../../../../components/ui/text/Text";
import { Select } from "../../../../../components/ui/select/Select";
import {
  Issue,
  IssueStatus,
  IssueStatusEnum,
} from "../../../../../models/Issue.model";
import {
  IssuesActionType,
  useIssuesDispatch,
} from "../../../context/IssuesContext";
import { useToast } from "../../../../../components/ui/toaster/useToast";
import { mockUpdateIssue } from "../../../../../utils/api";
import { useGetCurrentUser } from "../../../../login/context/AuthContext";

export const ActionButton = ({
  status: initialStatus,
  issueId,
}: {
  status: Issue["status"];
  issueId: string;
}) => {
  const user = useGetCurrentUser();
  const previousStatus = useRef<Issue["status"]>(initialStatus);
  const [status, setStatus] = useState<Issue["status"]>(initialStatus);
  const dispatch = useIssuesDispatch();
  const toast = useToast();

  const options = useMemo(() => {
    if (status === IssueStatusEnum.Backlog) {
      return [
        { value: status, label: "Backlog" },
        { value: IssueStatusEnum.InProgress, label: "Start Working" },
      ];
    }
    if (status === IssueStatusEnum.InProgress) {
      return [
        { value: status, label: "In Progress" },
        { value: IssueStatusEnum.Done, label: "Mark as Resolved" },
      ];
    }
    if (status === IssueStatusEnum.Done) {
      return [{ value: status, label: "Done" }];
    }
    return [];
  }, [status]);

  const handleStatusChange = async (value: IssueStatus) => {
    previousStatus.current = status;
    setStatus(value);
    // Optimistically update the issue status in the UI
    dispatch({
      type: IssuesActionType.UPDATE_ISSUE,
      issueId: issueId,
      newStatus: value,
    });
    // Simulate the update issue to the backend
    try {
      await mockUpdateIssue(issueId, {
        status: value,
      });
      toast.show({
        message: "Issue status updated",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      // If API call fails, automatically undo the change
      dispatch({
        type: IssuesActionType.UNDO_ISSUE,
        issueId: issueId,
      });
      toast.show({
        message: "Failed to update issue",
        type: "error",
        duration: 3000,
      });
      setStatus(previousStatus.current);
    } finally {
      dispatch({
        type: IssuesActionType.REMOVE_LAST_UPDATED_ISSUE,
        issueId: issueId,
      });
    }
  };

  return (
    <div className="action-button">
      <div className="action-button__header">
        <div className="action-button__title-container">
          <div className="action-button__icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2L12.5 7.5L18 10L12.5 12.5L10 18L7.5 12.5L2 10L7.5 7.5L10 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <Text
            variant="h3"
            size="lg"
            weight="semibold"
            className="action-button__title"
          >
            Actions
          </Text>
        </div>
      </div>

      <div className="action-button__section">
        <div className="action-button__field">
          <div className="action-button__field-value">
            <Select
              disabled={user?.role !== "admin"}
              options={options}
              value={status}
              onChange={(value) => handleStatusChange(value as IssueStatus)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
