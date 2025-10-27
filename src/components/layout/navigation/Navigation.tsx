import React from "react";
import { Link } from "react-router-dom";
import { SyncStatus } from "../../../features/board/components/board-view/sync-status/SyncStatus";

export const Navigation = () => (
  <nav style={{ padding: "1rem", background: "#eee" }}>
    <Link to="/board" style={{ marginRight: "1rem" }}>
      Board
    </Link>
    <Link to="/settings">Settings</Link>
  </nav>
);
