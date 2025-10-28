# 🧠 Issue Board – React Engineering Assessment

Welcome! This is a React case study designed to assess your skills in frontend architecture, state management, component design, and algorithmic
thinking.

You’ll build a **Kanban-style issue board** with interactive functionality, sorting logic, and user access control — similar to a simplified Jira or
GitHub Projects board.

---

## 🎯 Objective

Build a **React application** that lets users:

- View, search, and filter a list of issues
- Drag and drop issues between columns
- Automatically **sort issues** using a custom priority score
- **Undo** issue updates with rollback behavior
- Track and display **recently accessed issues**
- Apply **role-based permissions**
- Handle real-time updates (via polling or simulated sockets)

---

## 🛠️ Tech Stack

- React + TypeScript
- React Router
- Mock API via JSON
- LocalStorage
- (Optional) Drag & Drop: `@dnd-kit/core` or equivalent

---

## 📋 Requirements Status

| Requirement | Status | Notes |
|-------------|--------|-------|
| **Board View** | ✅ Complete | 3 columns with drag & drop, optimistic updates, undo functionality |
| **Search, Filter & Sort** | ✅ Complete | Live search, filtering by assignee/severity, priority score sorting |
| **Recently Accessed Sidebar** | ✅ Complete | Tracks last 5 visited issues, stored in localStorage |
| **Issue Detail Page** | ✅ Complete | Full issue info with "Mark as Resolved" action |
| **Role-Based Access** | ✅ Complete | Admin/contributor permissions implemented |
| **Polling / Real-Time** | ✅ Complete | 10-second polling with sync status display |
| **Pagination/Virtual Scroll** | ⏳ Pending | Bonus feature - not implemented yet |
| **Dark Mode Toggle** | ✅ Complete | Theme switching functionality implemented |
| **Unit Tests** | ✅ Complete | Tests for sorting algorithm and critical logic |


---

## 🎥 Demo Video

*This section will be used for demo testing and showcasing the application functionality.*
1. **Board View** 
   - Show the three columns (Backlog, In Progress, Done)
   - Demonstrate drag & drop between columns
   - Show optimistic updates and undo functionality

   https://www.loom.com/share/df25011dddb347b98d27135733c3c674

3. **Search & Filtering** 
   - Live search by title/tags
   - Filter by assignee and severity
   - Show priority-based sorting

   https://www.loom.com/share/4cc932a60c1d4f9689effaf2da50733a

4. **Issue Details** 
   - Navigate to issue detail page
   - Show "Mark as Resolved" functionality
   - Demonstrate role-based access restrictions

   https://www.loom.com/share/b0b9c7ba0d9c4a808c97d46b6dc0ffbe

5. **Additional Features** 
   - Recently accessed issues sidebar
   - Real-time polling indicator
   - Settings page (if applicable)

   https://www.loom.com/share/6e55f4b117ed4c1886b0dc08bcf9106c


---

## ✅ Functional Requirements

### 1. **Board View (`/board`)**

- Display issues in 3 columns: `Backlog`, `In Progress`, `Done`
- Support drag & drop or button-based movement between columns
- Optimistically update UI (simulate async save with 500ms delay)
- Allow undo within 5 seconds (use a toast or button)

### 2. **Search, Filter & Sort**

- Live search by title or tags
- Filter by assignee or severity
- Sort issues **by a priority score**, computed as:
  ```
  score = severity * 10 + (daysSinceCreated * -1) + userDefinedRank
  ```
    - Highest score appears first
    - If scores match, newer issues should appear higher

### 3. **Recently Accessed Sidebar**

- Track last 5 visited issues (clicks)
- Store in `localStorage`
- Display in a sidebar or modal

### 4. **Issue Detail Page (`/issue/:id`)**

- Show full issue info
- Include a “Mark as Resolved” action
- Clicking this updates status to `Done` and triggers UI update

### 5. **Role-Based Access**

- Use provided mock user:
  ```ts
  const currentUser = { name: "Alice", role: "admin" } // or "contributor"
  ```
- Only `admin` users can:
    - Move issues between columns
    - Update priority/status
    - Mark as resolved
- `contributor` users see a read-only view

### 6. **Polling / Real-Time**

- Poll issue list every 10 seconds OR simulate live updates
- Show last sync time in the UI

---

## ⚙️ Starter Code

This repo includes:

- All page routes wired with `React Router`
- Sample issues in `src/data/issues.json`
- Mock API with delay + simulated error in `src/utils/api.ts`
- User context in `src/constants/currentUser.ts`
- Navigation bar
- TypeScript types in `src/types.ts`

You're expected to build the real functionality and logic on top of this foundation.

---

## ✨ Bonus Features

- ✅ Custom hook for polling
- ✅ Dark mode toggle
- ✅ Unit test for sorting algorithm or update logic
- ⏳ Pagination or virtual scroll (pending)

---

## 🧪 Evaluation Criteria

| Area              | What We’re Looking For                                    |
|-------------------|-----------------------------------------------------------|
| Code Quality      | Clear, idiomatic React code                               |
| Component Design  | Reusable, maintainable architecture                       |
| Algorithmic Logic | Priority score, sort stability, undo rollback             |
| State Management  | Clean handling of async and optimistic updates            |
| Access Control    | Role-based UI behavior                                    |
| UX Decisions      | Error handling, undo feedback, loading states             |
| Performance       | Avoiding unnecessary re-renders, memoization where needed |
| Testing (Bonus)   | Tests for critical logic                                  |

---

## ⏱️ Time Limit

This challenge is designed for **~90 minutes**. If you need a bit more time for polish, that’s okay — just let us know.

---

## 🔒 Dependency Rules

You may only use the dependencies already included in the project.

> ❗ No additional libraries or external packages are allowed — **except** for state management libraries such as:
> - [Zustand](https://github.com/pmndrs/zustand)
> - [Jotai](https://github.com/pmndrs/jotai)
> - [Recoil](https://recoiljs.org/)
> - or similar minimal state libraries

Please do **not** add other UI kits, form libraries, animation frameworks, etc.

The goal is to evaluate your architecture, state design, and React fundamentals — not your ability to wire up third-party tools.

## 🚀 Getting Started

```bash
npm install
npm start
```

You’re good to go! Let us know when it’s ready for review.

---

Good luck — and have fun building!
