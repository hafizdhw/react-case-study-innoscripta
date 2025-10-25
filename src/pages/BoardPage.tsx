import React from "react";
import { Layout } from "../features/board-view/components/base-layout/BaseLayout";
import { BoardProvider } from "../features/board-view/context/BoardContext";
import { Board } from "../features/board-view/components/board/Board";

export const BoardPage = () => {
  return (
    <BoardProvider>
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
