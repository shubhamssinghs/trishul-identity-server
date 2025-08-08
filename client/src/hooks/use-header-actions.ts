import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

type Ctx = { setHeaderActions: (actions: React.ReactNode[]) => void };

export function useHeaderActions(actions: React.ReactNode[]) {
  const { setHeaderActions } = useOutletContext<Ctx>();

  useEffect(() => {
    setHeaderActions(actions);
    return () => {
      setHeaderActions([]);
    };
  }, [actions, setHeaderActions]);
}
