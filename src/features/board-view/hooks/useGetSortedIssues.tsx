import { useMemo } from "react";
import { Issue } from "../models/BoardView.model";

export const useGetSortedIssues = (issues: Issue[]) => {
  const sortedIssues = useMemo(() => {
    const now = new Date();

    return [...issues].sort((a, b) => {
      const aCreated = new Date(a.createdAt);
      const bCreated = new Date(b.createdAt);

      const aDaysSinceCreated = Math.floor(
        (now.getTime() - aCreated.getTime()) / (1000 * 60 * 60 * 24)
      );
      const bDaysSinceCreated = Math.floor(
        (now.getTime() - bCreated.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Priority score
      const aScore = a.severity * 10 + aDaysSinceCreated * -1;
      const bScore = b.severity * 10 + bDaysSinceCreated * -1;

      if (bScore !== aScore) {
        return bScore - aScore;
      }

      // If scores match, newer issues (createdAt most recent) should come first
      return bCreated.getTime() - aCreated.getTime();
    });
  }, [issues]);

  return sortedIssues;
};
