"use client";

import { useEffect } from "react";
import { useKentAccessStore } from "@/hooks/use-kent-access";

export const KentAccessInitializer = () => {
  const { fetchAccess } = useKentAccessStore();

  useEffect(() => {
    fetchAccess();
  }, [fetchAccess]);

  return null;
};
