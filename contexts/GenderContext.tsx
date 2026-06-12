"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  type Gender,
  GENDER_CONTENT,
  type GenderContent,
} from "@/lib/gender-content";

interface GenderContextValue {
  gender: Gender | null;
  content: GenderContent;
  hasSelected: boolean;
  setGender: (gender: Gender) => void;
  resetGender: () => void;
}

const GenderContext = createContext<GenderContextValue | null>(null);

export function GenderProvider({ children }: { children: React.ReactNode }) {
  const [genderState, setGenderState] = useState<Gender | null>(null);

  const setGender = useCallback((g: Gender) => {
    // Simply set memory state without persisting
    setGenderState(g);
  }, []);

  const resetGender = useCallback(() => {
    setGenderState(null);
  }, []);

  const activeGender: Gender = genderState ?? "male";
  const content = GENDER_CONTENT[activeGender];

  return (
    <GenderContext.Provider
      value={{
        gender: genderState,
        content,
        hasSelected: genderState !== null,
        setGender,
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
