import React, { createContext, useContext, useState, ReactNode } from "react";

interface BoardLayoutContextType {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const BoardLayoutContext = createContext<BoardLayoutContextType | undefined>(undefined);

interface BoardLayoutProviderProps {
  children: ReactNode;
}

export const BoardLayoutProvider = ({ children }: BoardLayoutProviderProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <BoardLayoutContext.Provider value={{ isExpanded, toggleSidebar }}>
      {children}
    </BoardLayoutContext.Provider>
  );
};

export const useBoardLayout = () => {
  const context = useContext(BoardLayoutContext);
  if (context === undefined) {
    throw new Error("useBoardLayout must be used within a BoardLayoutProvider");
  }
  return context;
};
