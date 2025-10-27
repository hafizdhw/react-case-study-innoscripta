import { useMemo } from "react";
import { Issue } from "../../../models/Issue.model";

/**
 * Custom hook that sorts issues based on a priority scoring algorithm
 * 
 * This hook implements a sophisticated sorting algorithm that considers:
 * 1. Severity level (higher severity = higher priority)
 * 2. Age of the issue (older issues get slight priority boost)
 * 3. Creation date as a tiebreaker (newer issues first when scores are equal)
 * 
 * The scoring formula: severity * 10 + (days_since_created * -1)
 * This means:
 * - Higher severity issues always rank higher
 * - Older issues get a small priority boost (negative multiplier)
 * - Within the same severity/age, newer issues appear first
 * 
 * @param issues - Array of issues to sort
 * @returns Array of issues sorted by priority score (highest first)
 */
export const useGetSortedIssues = (issues: Issue[]) => {
  const sortedIssues = useMemo(() => {
    const now = new Date();

    return [...issues].sort((a, b) => {
      // Calculate creation dates
      const aCreated = new Date(a.createdAt);
      const bCreated = new Date(b.createdAt);

      // Calculate days since creation for each issue
      const aDaysSinceCreated = Math.floor(
        (now.getTime() - aCreated.getTime()) / (1000 * 60 * 60 * 24)
      );
      const bDaysSinceCreated = Math.floor(
        (now.getTime() - bCreated.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Calculate priority scores
      // Higher severity and older issues get higher scores
      const aScore = a.severity * 10 + aDaysSinceCreated * -1;
      const bScore = b.severity * 10 + bDaysSinceCreated * -1;

      // Primary sort: by priority score (highest first)
      if (bScore !== aScore) {
        return bScore - aScore;
      }

      // Secondary sort: by creation date (newest first) when scores are equal
      return bCreated.getTime() - aCreated.getTime();
    });
  }, [issues]);

  return sortedIssues;
};
