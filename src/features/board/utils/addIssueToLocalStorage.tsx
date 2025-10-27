import { LOCAL_STORAGE_KEYS } from "../../../utils/constant";
import { Issue } from "../../../models/Issue.model";

/**
 * Utility function to add an issue to the recent issues list in localStorage
 * 
 * This function manages a "recently accessed issues" list that:
 * - Maintains a maximum of 5 recent issues
 * - Moves existing issues to the top when accessed again
 * - Stores issues in localStorage for persistence across browser sessions
 * - Uses a FIFO (First In, First Out) approach when the list is full
 * 
 * The recent issues list is used by the IssuesHistory component to show
 * quick access to recently viewed issues.
 * 
 * @param issue - The issue to add to the recent issues list
 */
export const addIssueToLocalStorage = (issue: Issue) => {
  const recentAccessedIssues = localStorage.getItem(
    LOCAL_STORAGE_KEYS.RECENT_ACCESSED_ISSUES
  );
  
  if (recentAccessedIssues) {
    const parsedIssues: Issue[] = JSON.parse(recentAccessedIssues);
    
    // Check if this issue is already in the recent list
    if (parsedIssues.find((i) => i.id === issue.id)) {
      // Remove the existing entry to move it to the top
      const currentIndex = parsedIssues.findIndex((i) => i.id === issue.id);
      if (currentIndex !== -1) {
        parsedIssues.splice(currentIndex, 1);
      }
    }
    
    // If we're at the limit, remove the oldest item
    if (parsedIssues.length >= 5) {
      parsedIssues.pop();
    }
    
    // Add the issue to the beginning of the list
    parsedIssues.unshift(issue);
    
    // Save back to localStorage
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.RECENT_ACCESSED_ISSUES,
      JSON.stringify(parsedIssues)
    );
  } else {
    // First time - create the list with this issue
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.RECENT_ACCESSED_ISSUES,
      JSON.stringify([issue])
    );
  }
};
