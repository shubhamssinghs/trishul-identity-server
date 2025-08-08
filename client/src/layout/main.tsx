import { useEffect, useState } from "react";
import clsx from "clsx";
import { Outlet } from "react-router-dom";

import { useBreakpoint, useRouteMetadata } from "@hooks";
import { Header, Navbar, Sidebar } from "@components";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [headerActions, setHeaderActions] = useState<React.ReactNode[]>([]);

  const breakpoint = useBreakpoint();
  const metaData = useRouteMetadata();

  useEffect(() => {
    if (breakpoint === "base") {
      setSidebarOpen(false);
    }
  }, [breakpoint]);

  return (
    <div className="min-h-screen min-w-full flex flex-col bg-base-100 box-border">
      <Navbar
        isSidebarOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        className={clsx(
          "flex flex-col flex-1 transition-all duration-300 bg-container dark:bg-container-dark min-h-[calc(100vh-55px)]",
          sidebarOpen ? "sm:ml-64" : "ml-0"
        )}
      >
        <Header metaData={metaData} actions={headerActions} />
        <section className="flex-1 p-4 overflow-y-auto">
          <Outlet context={{ setHeaderActions }} />
        </section>
      </main>
    </div>
  );
}
