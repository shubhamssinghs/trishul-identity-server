import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.tsx";
import { AlertProvider, ThemeProvider } from "./providers";
import { Tooltip } from "./components/ui/tooltip/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AlertProvider>
        <Toaster
          toastOptions={{
            position: "bottom-center",
            className:
              "!rounded-full text-sm font-semibold dark:!bg-zinc-900 dark:!text-white dark:!shadow-sm dark:!shadow-zinc-800 ",
          }}
        />
        <Tooltip />
        <App />
      </AlertProvider>
    </ThemeProvider>
  </StrictMode>
);
