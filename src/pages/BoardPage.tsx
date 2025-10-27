import React from "react";
import { Layout } from "../features/board/components/board-view/base-layout/BaseLayout";
import { Board } from "../features/board/components/board-view/board/Board";
import { IssueLoader } from "../features/board/loader/IssueLoader";
import { Filters } from "../features/board/components/board-view/filters/Filters";
import { IssuesProvider } from "../features/board/context/IssuesContext";
import { FiltersProvider } from "../features/board/context/FiltersContext";
import { IssuesHistory } from "../features/board/components/board-view/issues-history/IssuesHistory";
import {
  ToastRenderer,
} from "../components/ui/toaster/ToastRenderer";

export const BoardPage = () => {
  return (
    <IssuesProvider>
      <FiltersProvider>
        <IssueLoader />
        <Layout>
          <Layout.LeftSidebar>
            <IssuesHistory />
          </Layout.LeftSidebar>
          <Layout.Toolbar>
            <Filters />
          </Layout.Toolbar>
          <Layout.Main>
            <Board />
          </Layout.Main>
        </Layout>
        <ToastRenderer />
      </FiltersProvider>
    </IssuesProvider>
  );
};
