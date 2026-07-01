'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our context state
interface SidebarContextType {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

// Create the context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Set default state to true (sidebar expanded)
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Custom hook to easily use this context in any component
export function useSidebar() {
  const context = useContext(SidebarContext);
  
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  
  return context;
}