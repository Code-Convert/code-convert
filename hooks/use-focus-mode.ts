"use client";

import { useState, useEffect } from "react";

export function useFocusMode() {
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    if (!isFocusMode) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isFocusMode]);

  const activate = () => setIsFocusMode(true);
  const deactivate = () => setIsFocusMode(false);

  return { isFocusMode, activate, deactivate };
}
