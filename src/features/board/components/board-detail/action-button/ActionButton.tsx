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
        {user?.role !== "admin" && (
          <div className="action-button__permission-hint">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z"
                fill="currentColor"
              />
              <path
                d="M8 4V8L11 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Text variant="span" size="xs" className="action-button__hint-text">
              Admin only
            </Text>
          </div>
        )}
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
