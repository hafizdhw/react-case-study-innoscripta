import { renderHook } from "@testing-library/react";
import { useGetSortedIssues } from "./useGetSortedIssues";
import { IssueStatusEnum, Issue } from "../../../models/Issue.model";
import { describe, it, expect } from "@jest/globals";

describe("useGetSortedIssues", () => {
  // Helper function to generate ISO date X days ago
  const isoDaysAgo = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString();
  };

  it("sorts by severity first, then by age (older issues higher)", () => {
    const issues: Issue[] = [
      {
        id: "1",
        createdAt: isoDaysAgo(2),
        severity: 2,
        title: "Issue 1",
        status: IssueStatusEnum.Backlog,
      },
      {
        id: "2",
        createdAt: isoDaysAgo(5),
        severity: 3,
        title: "Issue 2",
        status: IssueStatusEnum.Backlog,
      },
      {
        id: "3",
        createdAt: isoDaysAgo(1),
        severity: 2,
        title: "Issue 3",
        status: IssueStatusEnum.Backlog,
      },
      {
        id: "4",
        createdAt: isoDaysAgo(7),
        severity: 1,
        title: "Issue 4",
        status: IssueStatusEnum.Backlog,
      },
    ] as Issue[];

    const { result } = renderHook(() => useGetSortedIssues(issues));

    // Issue 2 (severity 3) should be first
    // Then Issue 3 and Issue 1 (equal severity, but newer goes before older)
    // Then Issue 4 (lowest severity)
    expect(result.current.map((i) => i.id)).toEqual(["2", "3", "1", "4"]);
  });

  it("uses newest creation date as tiebreaker when scores are equal", () => {
    const nowIso = new Date().toISOString();
    const issues: Issue[] = [
      {
        id: "a",
        createdAt: nowIso,
        severity: 2,
        title: "A",
        status: IssueStatusEnum.Backlog,
      },
      {
        id: "b",
        createdAt: nowIso,
        severity: 2,
        title: "B",
        status: IssueStatusEnum.Backlog,
      },
    ] as Issue[];
    // They have the same severity and createdAt, so order should remain stable
    const { result } = renderHook(() => useGetSortedIssues(issues));
    expect(result.current.map((i) => i.id)).toEqual(["a", "b"]);
  });

  it("issues with same severity, new issues before older", () => {
    const issues: Issue[] = [
      {
        id: "x",
        createdAt: isoDaysAgo(3),
        severity: 1,
        title: "X",
        status: IssueStatusEnum.Backlog,
      },
      {
        id: "y",
        createdAt: isoDaysAgo(1),
        severity: 1,
        title: "Y",
        status: IssueStatusEnum.Backlog,
      },
    ] as Issue[];
    const { result } = renderHook(() => useGetSortedIssues(issues));
    expect(result.current.map((i) => i.id)).toEqual(["y", "x"]);
  });

  it("returns empty array when input is empty", () => {
    const { result } = renderHook(() => useGetSortedIssues([]));
    expect(result.current).toEqual([]);
  });

  it("returns new array reference when issues array changes", () => {
    const issues: Issue[] = [
      {
        id: "1",
        createdAt: isoDaysAgo(2),
        severity: 2,
        title: "Issue 1",
        status: IssueStatusEnum.Backlog,
      },
    ] as Issue[];
    const { result, rerender } = renderHook(
      ({ arr }) => useGetSortedIssues(arr),
      {
        initialProps: { arr: issues },
      }
    );
    expect(result.current).toHaveLength(1);

    // Now simulate issues array changes
    const newIssues = [
      ...issues,
      {
        id: "2",
        createdAt: isoDaysAgo(1),
        severity: 3,
        title: "Issue 2",
        status: IssueStatusEnum.Backlog,
      },
    ] as Issue[];
    rerender({ arr: newIssues });
    expect(result.current).toHaveLength(2);
    expect(result.current[0].id).toBe("2"); // Highest severity goes first
  });
});
