import React from "react";
import { Layout } from "../features/board-view/components/Layout";

export const BoardPage = () => {
  return (
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
        <div>Board Body</div>
      </Layout.BoardBody>
    </Layout>
  );
};
