import React from "react";
import ReactDOM from "react-dom/client";
import { safeEnv } from "./lib/env.ts";
import AppRoutes from "./router.tsx";
import "./styles/index.css";

function mountApp() {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  );
}

async function enableMocking() {
  if (safeEnv.VITE_MOCK_ENABLED !== "true") {
    return;
  }

  // @ts-expect-error worker is not defined
  const { worker } = await import("./mocks/browser");
  worker.start({
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(mountApp);
