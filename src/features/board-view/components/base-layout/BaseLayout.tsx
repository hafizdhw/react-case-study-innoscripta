import React from "react";
import "./BaseLayout.css";
import { Text } from "../../../../components/ui/text/Text";

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
    <div className="board-layout">
      {Sidebar}
      <div className="board-layout__content">
        <div className="board-layout__title">
          <Text variant="h1" className="board-layout__title-text">{title}</Text>
        </div>
        <div className="board-layout__actions">
          <div>{Search}</div>
          <div>{Filter}</div>
          <div>{Sort}</div>
        </div>
        <div className="board-layout__body">{BoardBody}</div>
      </div>
    </div>
  );
};

Layout.Sidebar = LayoutSidebar;
Layout.Search = LayoutSearch;
Layout.Filter = LayoutFilter;
Layout.Sort = LayoutSort;
Layout.BoardBody = LayoutBoardBody;
