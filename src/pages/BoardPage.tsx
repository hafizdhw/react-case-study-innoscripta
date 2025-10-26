import React from "react";
import { Layout } from "../features/board-view/components/base-layout/BaseLayout";
import { Board } from "../features/board-view/components/board/Board";
import { IssueLoader } from "../features/board-view/loader/IssueLoader";
import { SearchBar } from "../features/board-view/components/search-bar/SearchBar";
import { Filters } from "../features/board-view/components/filters/Filters";
import { IssuesProvider } from "../features/board-view/context/IssuesContext";
import { FiltersProvider } from "../features/board-view/context/FiltersContext";

export const BoardPage = () => {
  return (
    <IssuesProvider>
      <FiltersProvider>
        <IssueLoader />
        <Layout>
          <Layout.LeftSidebar>
            <div>Sidebar</div>
          </Layout.LeftSidebar>
          <Layout.Toolbar>
            <SearchBar />
            <Filters />
          </Layout.Toolbar>
          <Layout.Main>
            <Board />
          </Layout.Main>
        </Layout>
      </FiltersProvider>
    </IssuesProvider>
  );
};
