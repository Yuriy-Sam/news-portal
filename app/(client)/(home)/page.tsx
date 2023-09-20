import {
  BreakingNews,
  CustomButton,
  Header,
  Main,
  MainTopics,
} from "@/components";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      {/* <main className=""> */}
      <Main />
      <ErrorBoundary>
        <MainTopics />
      </ErrorBoundary>
      <ErrorBoundary>
        <BreakingNews />
      </ErrorBoundary>
      {/* </main> */}
    </>
  );
}
