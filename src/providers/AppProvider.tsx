"use client"

import { Target } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

// Define what data will be available globally
interface AppContextType {
  targets: Target[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
  refreshTargets: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [targets, setTargets] = useState<Target[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadTargets = async () => {
    try {
      //TODO: add queries
      const res = await fetch('/api/targets');
      const result = await res.json();
      if (result.success) {
        setTargets(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch targets", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTargets();
  }, []);

  return (
    <AppContext.Provider value={{ targets, searchQuery, setSearchQuery, isLoading, refreshTargets: loadTargets }}>
      {children}
    </AppContext.Provider>
  );
}

// Helper hook to easily grab this data in other files
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};