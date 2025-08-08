import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

import { useTheme } from "@hooks";
import { ToggleButton } from "../ui/toggle-button";
import type { ThemeTogglerProps } from "./types";

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({
  className,
  size = "sm",
  color = "primary",
  backgroundColor = {
    active: "bg-text-muted focus:ring-text-muted",
    inactive: "bg-yellow-500 focus:ring-yellow-500",
  },
  ...rest
}) => {
  const { isDark, setIsDark } = useTheme();

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <ToggleButton
        as="knob"
        isActive={isDark}
        onToggleChange={setIsDark}
        size={size}
        color={color}
        backgroundColor={backgroundColor}
        renderKnobIcon={(isActive) => {
          return isActive ? (
            <MoonIcon className="w-3 h-3 fill-container-dark animate-fade-in-scale-rotate-anti-clock-wise" />
          ) : (
            <SunIcon className="w-3 h-3 fill-yellow-800 animate-fade-in-scale-rotate-clock-wise" />
          );
        }}
        {...rest}
      />
    </div>
  );
};
