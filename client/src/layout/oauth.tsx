import { useTheme } from "@hooks";
import { Outlet } from "react-router-dom";

export const OAuthLayout = () => {
  const { isDark } = useTheme();

  return (
    <>
      <header className="w-full flex py-3 justify-center items-center gap-1 sticky top-0 bg-container dark:bg-container-dark border-b border-border dark:border-border-dark">
        <img
          src={isDark ? "/trishul_white_logo.svg" : "/trishul_logo.svg"}
          alt="Logo"
          className="w-5 h-5 object-contain"
        />
        <span className="font-semibold text-base tracking-wide text-text-muted dark:text-text-muted_dark">
          Trishul Inc.
        </span>
      </header>
      <section className="h-full w-full flex flex-col justify-center items-center gap-4 mt-[-48px]">
        <Outlet />
      </section>
    </>
  );
};
