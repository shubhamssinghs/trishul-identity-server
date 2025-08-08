import { createContext, useState, type ReactNode } from "react";

import { AlertContainer, type AlertOptions } from "@components";

type AlertContextType = {
  showAlert: (options: AlertOptions) => void;
};

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertOptions | null>(null);

  const showAlert = (options: AlertOptions) => {
    setAlert(options);
    const autoHide = options.autoDismiss ?? false;
    if (options.type !== "confirm" && autoHide) {
      setTimeout(() => setAlert(null), options.duration ?? 3000);
    }
  };

  const closeAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <AlertContainer alert={alert} onClose={closeAlert} />}
    </AlertContext.Provider>
  );
};
