import React from "react";
import { Layout } from "../features/board-view/components/base-layout/BaseLayout";
import { BoardProvider } from "../features/board-view/context/BoardContext";
import { Board } from "../features/board-view/components/board/Board";
import { IssueLoader } from "../features/board-view/loader/IssueLoader";
import { SearchBar } from "../features/board-view/components/search-bar/SearchBar";

export const BoardPage = () => {
  return (
    <BoardProvider>
      <IssueLoader />
      <Layout>
        <Layout.LeftSidebar>
          <div>Sidebar</div>
        </Layout.LeftSidebar>
        <Layout.Toolbar>
          <SearchBar />
          <div>Filter</div>
          <div>Sort</div>
        </Layout.Toolbar>
        <Layout.Main>
          <Board />
        </Layout.Main>
      </Layout>
    </BoardProvider>
  );
};
