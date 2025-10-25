import React from "react";
import "./Layout.css";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

type LayoutCompoundProps = {
  children: React.ReactNode;
};

const LayoutSidebar = ({ children }: LayoutCompoundProps) => <>{children}</>;
LayoutSidebar.displayName = "LayoutSidebar";

const LayoutSearch = ({ children }: LayoutCompoundProps) => <>{children}</>;
LayoutSearch.displayName = "LayoutSearch";

const LayoutFilter = ({ children }: LayoutCompoundProps) => <>{children}</>;
LayoutFilter.displayName = "LayoutFilter";

const LayoutSort = ({ children }: LayoutCompoundProps) => <>{children}</>;
LayoutSort.displayName = "LayoutSort";

const LayoutBoardBody = ({ children }: LayoutCompoundProps) => <>{children}</>;
LayoutBoardBody.displayName = "LayoutBoardBody";

export const Layout = ({ children, title = "Project Name" }: LayoutProps) => {
  // Extracting compound children
  const Sidebar = React.Children.toArray(children).filter(
    (child: any) =>
      child.type &&
      (child.type.displayName || child.type.name) === "LayoutSidebar"
  );
  const Search = React.Children.toArray(children).filter(
    (child: any) =>
      child.type &&
      (child.type.displayName || child.type.name) === "LayoutSearch"
  );
  const Filter = React.Children.toArray(children).filter(
    (child: any) =>
      child.type &&
      (child.type.displayName || child.type.name) === "LayoutFilter"
  );
  const Sort = React.Children.toArray(children).filter(
    (child: any) =>
      child.type && (child.type.displayName || child.type.name) === "LayoutSort"
  );
  const BoardBody = React.Children.toArray(children).filter(
    (child: any) =>
      child.type &&
      (child.type.displayName || child.type.name) === "LayoutBoardBody"
  );

  return (
    <div className="board-container">
      {Sidebar}
      <div className="board-content">
        <div className="board-title">
          <h1>{title}</h1>
        </div>
        <div className="board-actions">
          <div>{Search}</div>
          <div>{Filter}</div>
          <div>{Sort}</div>
        </div>
        <div className="board-body">{BoardBody}</div>
      </div>
    </div>
  );
};

Layout.Sidebar = LayoutSidebar;
Layout.Search = LayoutSearch;
Layout.Filter = LayoutFilter;
Layout.Sort = LayoutSort;
Layout.BoardBody = LayoutBoardBody;
