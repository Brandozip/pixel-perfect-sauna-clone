import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FullPageSkeleton } from "@/components/ui/page-skeleton";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<FullPageSkeleton />}>
    <App />
  </Suspense>
);
