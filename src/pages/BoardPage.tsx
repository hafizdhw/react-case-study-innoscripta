import React from "react";
import { Layout } from "../features/board/components/board-view/board-layout/BoardLayout";
import { Board } from "../features/board/components/board-view/board/Board";
import { Filters } from "../features/board/components/board-view/filters/Filters";
import { FiltersProvider } from "../features/board/context/FiltersContext";
import { IssuesHistory } from "../features/board/components/board-view/issues-history/IssuesHistory";
import { SyncStatus } from "../features/board/components/board-view/sync-status/SyncStatus";

export const BoardPage = () => {
  return (
    <FiltersProvider>
      <Layout title="Innoscripta Board">
        <Layout.LeftSidebar>
          <SyncStatus />
          <IssuesHistory />
        </Layout.LeftSidebar>
        <Layout.Toolbar>
          <Filters />
        </Layout.Toolbar>
        <Layout.Main>
          <Board />
        </Layout.Main>
      </Layout>
    </FiltersProvider>
  );
};
