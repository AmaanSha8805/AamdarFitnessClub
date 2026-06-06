"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GENDER_STORAGE_KEY,
  type Gender,
  GENDER_CONTENT,
  type GenderContent,
} from "@/lib/gender-content";

interface GenderContextValue {
  gender: Gender | null;
  content: GenderContent;
  isLoading: boolean;
  hasSelected: boolean;
  setGender: (gender: Gender) => void;
  skipPersonalization: () => void;
  resetGender: () => void;
}

const GenderContext = createContext<GenderContextValue | null>(null);

export function GenderProvider({ children }: { children: React.ReactNode }) {
  const [gender, setGenderState] = useState<Gender | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(GENDER_STORAGE_KEY) as Gender | null;
    if (stored === "male" || stored === "female") {
      setGenderState(stored);
    }
    setIsLoading(false);
  }, []);

  const setGender = useCallback((g: Gender) => {
    localStorage.setItem(GENDER_STORAGE_KEY, g);
    setGenderState(g);
  }, []);

  const skipPersonalization = useCallback(() => {
    setGender("male");
  }, [setGender]);

  const resetGender = useCallback(() => {
    localStorage.removeItem(GENDER_STORAGE_KEY);
    setGenderState(null);
  }, []);

  const activeGender: Gender = gender ?? "male";
  const content = GENDER_CONTENT[activeGender];

  return (
    <GenderContext.Provider
      value={{
        gender,
        content,
        isLoading,
        hasSelected: gender !== null,
        setGender,
        skipPersonalization,
        resetGender,
      }}
    >
      {children}
    </GenderContext.Provider>
  );
}

export function useGender() {
  const ctx = useContext(GenderContext);
  if (!ctx) throw new Error("useGender must be used within GenderProvider");
  return ctx;
}
