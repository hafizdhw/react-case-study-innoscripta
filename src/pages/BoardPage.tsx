import React from "react";
import { Layout } from "../features/board-view/components/base-layout/BaseLayout";
import { BoardProvider } from "../features/board-view/context/BoardContext";
import { Board } from "../features/board-view/components/board/Board";
import { IssueLoader } from "../features/board-view/loader/IssueLoader";

export const BoardPage = () => {
  return (
    <BoardProvider>
      <IssueLoader />
      <Layout>
        <Layout.Sidebar>
          <div>Sidebar</div>
        </Layout.Sidebar>
        <Layout.Search>
          <div>Search</div>
        </Layout.Search>
        <Layout.Filter>
          <div>Filter</div>
        </Layout.Filter>
        <Layout.Sort>
          <div>Sort</div>
        </Layout.Sort>
        <Layout.BoardBody>
          <Board />
        </Layout.BoardBody>
      </Layout>
    </BoardProvider>
  );
};
