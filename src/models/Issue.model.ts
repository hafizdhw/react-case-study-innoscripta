export enum IssueStatusEnum {
  Backlog = "Backlog",
  InProgress = "In Progress",
  Done = "Done",
}
export type IssueStatus =
  | IssueStatusEnum.Backlog
  | IssueStatusEnum.InProgress
  | IssueStatusEnum.Done;

export enum IssuePriorityEnum {
  Low = "low",
  Medium = "medium",
  High = "high",
}
export type IssuePriority =
  | IssuePriorityEnum.Low
  | IssuePriorityEnum.Medium
  | IssuePriorityEnum.High;

export interface Issue {
  id: string;
  title: string;
  status: IssueStatus;
  priority: IssuePriority;
  severity: number;
  createdAt: string;
  assignee: string;
  tags: string[];
}
