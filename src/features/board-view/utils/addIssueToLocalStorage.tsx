import { LOCAL_STORAGE_KEYS } from "../../../utils/constant";
import { Issue } from "../../../models/Issue.model";

export const addIssueToLocalStorage = (issue: Issue) => {
  const recentAccessedIssues = localStorage.getItem(
    LOCAL_STORAGE_KEYS.RECENT_ACCESSED_ISSUES
  );
  if (recentAccessedIssues) {
    const parsedIssues: Issue[] = JSON.parse(recentAccessedIssues);
    if (parsedIssues.find((i) => i.id === issue.id)) {
      const currentIndex = parsedIssues.findIndex((i) => i.id === issue.id);
      if (currentIndex !== -1) {
        parsedIssues.splice(currentIndex, 1);
      }
    }
    if (parsedIssues.length >= 5) {
      parsedIssues.pop();
    }
    parsedIssues.unshift(issue);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.RECENT_ACCESSED_ISSUES,
      JSON.stringify(parsedIssues)
    );
  } else {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.RECENT_ACCESSED_ISSUES,
      JSON.stringify([issue])
    );
  }
};
