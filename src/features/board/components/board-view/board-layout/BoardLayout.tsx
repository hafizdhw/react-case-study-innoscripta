import React from "react";
import "./BoardLayout.css";
import { Text } from "../../../../../components/ui/text/Text";
import {
  BoardLayoutProvider,
  useBoardLayout,
} from "../../../context/BoardLayoutContext";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

type LayoutCompoundProps = {
  children: React.ReactNode;
};

const LayoutLeftSidebar = ({ children }: LayoutCompoundProps) => {
  const { isExpanded, toggleSidebar } = useBoardLayout();

  return (
    <div
      className={`board-layout__left-sidebar ${
        isExpanded
          ? "board-layout__left-sidebar--expanded"
          : "board-layout__left-sidebar--collapsed"
      }`}
      style={{
        minWidth: isExpanded ? "22rem" : "4rem",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="board-layout__sidebar-header">
        <button
          onClick={toggleSidebar}
          className="board-layout__toggle"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <div className="board-layout__toggle-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isExpanded ? (
                <path
                  d="M10 4L6 8L10 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>
        </button>
      </div>
      <div
        className="board-layout__sidebar-content"
        style={{
          padding: isExpanded ? "var(--spacing-md)" : "var(--spacing-xs)",
        }}
      >
        {children}
      </div>
    </div>
  );
};
LayoutLeftSidebar.displayName = "LayoutLeftSidebar";

const LayoutToolbar = ({ children }: LayoutCompoundProps) => (
  <div className="board-layout__actions">{children}</div>
);
LayoutToolbar.displayName = "LayoutToolbar";

const LayoutMain = ({ children }: LayoutCompoundProps) => <>{children}</>;
LayoutMain.displayName = "LayoutMain";

export const Layout = ({ children, title = "Project Name" }: LayoutProps) => {
  // Extracting compound children
  const LeftSidebar = React.Children.toArray(children).filter(
    (child: any) =>
      child.type &&
      (child.type.displayName || child.type.name) === "LayoutLeftSidebar"
  );
  const Toolbar = React.Children.toArray(children).filter(
    (child: any) =>
      child.type &&
      (child.type.displayName || child.type.name) === "LayoutToolbar"
  );
  const Main = React.Children.toArray(children).filter(
    (child: any) =>
      child.type && (child.type.displayName || child.type.name) === "LayoutMain"
  );

  return (
    <BoardLayoutProvider>
      <div className="board-layout">
        {LeftSidebar}
        <div className="board-layout__content">
          <div className="board-layout__title">
            <Text variant="h1" size="2xl" weight="semibold" className="board-layout__title-text">
              {title}
            </Text>
          </div>
          {Toolbar}
          <div className="board-layout__body">{Main}</div>
        </div>
      </div>
    </BoardLayoutProvider>
  );
};

Layout.LeftSidebar = LayoutLeftSidebar;
Layout.Toolbar = LayoutToolbar;
Layout.Main = LayoutMain;
