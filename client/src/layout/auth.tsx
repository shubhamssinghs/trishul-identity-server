/* eslint-disable react-hooks/exhaustive-deps */
import { ThemeToggler } from "@components";
import { useAuth } from "@hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthLayout = () => {
  const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated]);

  return (
    <section className="h-full w-full flex flex-col justify-center items-center gap-4">
      <div className="p-1 flex flex-col items-center justify-center gap-2">
        <img
          src="/trishul.png"
          alt="Logo"
          className="w-10 h-10 object-contain "
        />
        <span className="font-bold text-xl tracking-wide">Trishul Inc.</span>
      </div>
      <div className="p-4 rounded-md min-w-full md:min-w-96">
        <Outlet />
      </div>
      <div className="fixed bottom-6 right-1/2 translate-x-1/2 flex items-center justify-between border p-2 rounded-md gap-6">
        <p className="text-sm font-semibold">Change Theme</p>
        <ThemeToggler />
      </div>
    </section>
  );
};
