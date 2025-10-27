import React from "react";
import "./BaseLayout.css";
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
      className="board-layout__left-sidebar"
      style={{
        width: isExpanded ? "18rem" : "3.5rem",
        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <button onClick={toggleSidebar} className="board-layout__toggle">
        {isExpanded ? "▼" : "▶"}
      </button>
      {children}
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
            <Text variant="h1" size="2xl" className="board-layout__title-text">
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
