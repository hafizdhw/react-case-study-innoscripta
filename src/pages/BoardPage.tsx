import React from "react";
import { Layout } from "../features/board-view/components/base-layout/BaseLayout";
import { Board } from "../features/board-view/components/board/Board";
import { IssueLoader } from "../features/board-view/loader/IssueLoader";
import { Filters } from "../features/board-view/components/filters/Filters";
import { IssuesProvider } from "../features/board-view/context/IssuesContext";
import { FiltersProvider } from "../features/board-view/context/FiltersContext";
import { IssuesHistory } from "../features/board-view/components/issues-history/IssuesHistory";
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
