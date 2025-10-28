import { renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { useHasPermissionToDrop } from "./useHasPermissionToDrop";
import { IssueStatusEnum } from "../../../models/Issue.model";

import * as DndKitCore from "@dnd-kit/core";
import * as AuthContext from "../../login/context/AuthContext";

const mockedUseDndContextSpy = jest.spyOn(DndKitCore, "useDndContext");
const mockedUseGetCurrentUserSpy = jest.spyOn(AuthContext, "useGetCurrentUser");

describe("useHasPermissionToDrop", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns false if there is no active drag", () => {
    mockedUseDndContextSpy.mockReturnValue({ active: null } as any);
    mockedUseGetCurrentUserSpy.mockReturnValue({
      username: "admin",
      role: "admin",
    });

    const { result } = renderHook(() =>
      useHasPermissionToDrop(IssueStatusEnum.InProgress)
    );
    expect(result.current.hasPermissionToDrop).toBe(false);
  });

  it("returns false if user is not admin", () => {
    mockedUseDndContextSpy.mockReturnValue({
      active: {
        data: { current: { status: IssueStatusEnum.Backlog } } as any,
      },
    } as any);
    mockedUseGetCurrentUserSpy.mockReturnValue({
      username: "user",
      role: "contributor",
    });
    const { result } = renderHook(() =>
      useHasPermissionToDrop(IssueStatusEnum.InProgress)
    );
    expect(result.current.hasPermissionToDrop).toBe(false);
  });

  it("allows Backlog -> In Progress for admin", () => {
    mockedUseDndContextSpy.mockReturnValue({
      active: {
        data: { current: { status: IssueStatusEnum.Backlog } },
      },
    } as any);
    mockedUseGetCurrentUserSpy.mockReturnValue({
      username: "admin",
      role: "admin",
    });
    const { result } = renderHook(() =>
      useHasPermissionToDrop(IssueStatusEnum.InProgress)
    );
    expect(result.current.hasPermissionToDrop).toBe(true);
  });

  it("prevents In Progress -> In Progress (no change)", () => {
    mockedUseDndContextSpy.mockReturnValue({
      active: {
        data: { current: { status: IssueStatusEnum.InProgress } },
      },
    } as any);
    mockedUseGetCurrentUserSpy.mockReturnValue({
      username: "admin",
      role: "admin",
    });
    const { result } = renderHook(() =>
      useHasPermissionToDrop(IssueStatusEnum.InProgress)
    );
    expect(result.current.hasPermissionToDrop).toBe(false);
  });

  it("allows In Progress -> Done for admin", () => {
    mockedUseDndContextSpy.mockReturnValue({
      active: {
        data: { current: { status: IssueStatusEnum.InProgress } },
      },
    } as any);
    mockedUseGetCurrentUserSpy.mockReturnValue({
      username: "admin",
      role: "admin",
    });
    const { result } = renderHook(() =>
      useHasPermissionToDrop(IssueStatusEnum.Done)
    );
    expect(result.current.hasPermissionToDrop).toBe(true);
  });

  it("prevents Done -> In Progress for admin (not allowed)", () => {
    mockedUseDndContextSpy.mockReturnValue({
      active: {
        data: { current: { status: IssueStatusEnum.Done } },
      },
    } as any);
    mockedUseGetCurrentUserSpy.mockReturnValue({
      username: "admin",
      role: "admin",
    });
    const { result } = renderHook(() =>
      useHasPermissionToDrop(IssueStatusEnum.InProgress)
    );
    expect(result.current.hasPermissionToDrop).toBe(false);
  });

  it("prevents Skipping Backlog -> Done directly", () => {
    mockedUseDndContextSpy.mockReturnValue({
      active: {
        data: { current: { status: IssueStatusEnum.Backlog } },
      },
    } as any);
    mockedUseGetCurrentUserSpy.mockReturnValue({
      username: "admin",
      role: "admin",
    });
    const { result } = renderHook(() =>
      useHasPermissionToDrop(IssueStatusEnum.Done)
    );
    expect(result.current.hasPermissionToDrop).toBe(false);
  });

  it("prevents undefined current status", () => {
    mockedUseDndContextSpy.mockReturnValue({
      active: {
        data: { current: { status: undefined } },
      },
    } as any);
    mockedUseGetCurrentUserSpy.mockReturnValue({
      username: "admin",
      role: "admin",
    });
    const { result } = renderHook(() =>
      useHasPermissionToDrop(IssueStatusEnum.Done)
    );
    expect(result.current.hasPermissionToDrop).toBe(false);
  });

  it("prevents drop if user is null", () => {
    mockedUseDndContextSpy.mockReturnValue({
      active: {
        data: { current: { status: IssueStatusEnum.InProgress } },
      },
    } as any);
    mockedUseGetCurrentUserSpy.mockReturnValue(null);
    const { result } = renderHook(() =>
      useHasPermissionToDrop(IssueStatusEnum.Done)
    );
    expect(result.current.hasPermissionToDrop).toBe(false);
  });
});
