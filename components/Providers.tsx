"use client";
// import { SessionProvider } from "next-auth/react";

import { store } from "@/store";
import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <ThemeProvider attribute="class">
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  ) : null;
}
