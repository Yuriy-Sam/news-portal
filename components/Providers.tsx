"use client";

import { store } from "@/store";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
