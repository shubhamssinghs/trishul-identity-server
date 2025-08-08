import type { UI_Color, UI_Variant } from "./_styles";

const backgroundAndTextColorMap: Record<
  UI_Variant,
  Record<UI_Color, string>
> = {
  solid: {
    light:
      "!bg-menu_hover dark:!bg-menu_hover-dark text-text dark:text-text-dark ",
    primary:
      "!bg-primary !text-primary-content ![&>svg]:text-primary-content ![&>svg>path]:text-primary-content",
    secondary:
      "!bg-secondary text-secondary-content [&>svg]:stroke-secondary-content",
    success: "!bg-success text-success-content [&>svg]:stroke-success-content",
    warning: "!bg-warning text-warning-content [&>svg]:stroke-warning-content",
    error: "!bg-error text-error-content [&>svg]:stroke-error-content",
    accent: "!bg-accent text-accent-content [&>svg]:stroke-accent-content",
    neutral: "!bg-neutral text-neutral-content [&>svg]:stroke-neutral-content",
  },
  outline: {
    light:
      "!bg-transparent !border !border-gray-300 dark:!border-border-dark text-text dark:text-text-dark",
    primary:
      "!bg-transparent !border !border-primary text-primary [&>svg]:stroke-primary",
    secondary:
      "!bg-transparent !border !border-secondary text-secondary [&>svg]:stroke-secondary",
    success:
      "!bg-transparent !border !border-success text-success [&>svg]:stroke-success",
    warning:
      "!bg-transparent !border !border-warning text-warning [&>svg]:stroke-warning",
    error:
      "!bg-transparent !border !border-error text-error [&>svg]:stroke-error",
    accent:
      "!bg-transparent !border !border-accent text-accent [&>svg]:stroke-accent",
    neutral:
      "!bg-transparent !border !border-neutral dark:!border-border text-neutral dark:!text-text-dark [&>svg]:stroke-neutral dark:[&>svg]:stroke-text-dark",
  },
  ghost: {
    light: "!bg-transparent text-text dark:text-white",
    primary: "!bg-transparent text-text dark:text-white",
    secondary: "!bg-transparent text-text dark:text-white",
    success: "!bg-transparent text-text dark:text-white",
    warning: "!bg-transparent text-text dark:text-white",
    error: "!bg-transparent text-text dark:text-white",
    accent: "!bg-transparent text-text dark:text-white",
    neutral: "!bg-transparent text-text dark:text-white",
  },
};

const focusRing = (clr: string) =>
  `focus:outline-none focus:ring-2  focus:ring-${clr} focus:ring-offset-1 focus:ring-offset-container dark:ring-offset-container-dark`;

export const buttonVariantClasses = (
  variant: UI_Variant,
  color: UI_Color,
  isBadge = false
): string => {
  const styles = backgroundAndTextColorMap[variant][color] ?? "";
  return isBadge
    ? styles.replace(/hover:[^\s]+/g, "").trim()
    : `${focusRing(color)}  ${styles}`;
};

export const inputVariantClasses = (
  variant: UI_Variant,
  color: UI_Color
): string => {
  let styles = backgroundAndTextColorMap[variant][color] ?? "";

  switch (variant) {
    case "solid":
      styles += " hover:opacity-90";
      break;
    case "outline":
      styles += " hover:!bg-border/10";
      break;
    case "ghost":
      break;
    default:
      styles = "";
  }

  return `${focusRing(color)} dark:caret-white caret-black ${styles} `;
};

export const selectVariantClasses = (
  variant: UI_Variant,
  color: UI_Color
): Record<string, string> => {
  const baseColor = backgroundAndTextColorMap[variant][color] ?? "";
  return {
    control: `${baseColor} !min-h-auto ${focusRing(color)}`,
    placeholder: "!text-text/50 dark:!text-white/70",
    singleValue: "!text-text dark:!text-white",
    multiValue:
      "!bg-primary [&>div]:!text-text-dark [&>div>svg>path]:!text-text-dark hover:[&>div[role='button']]:!bg-inherit",
    option: "hover:!bg-border dark:hover:!bg-border-dark !bg-inherit",
    menu: "!mt-1 !rounded-md !border !border-border !bg-container dark:!bg-container-dark !shadow-lg",
  };
};
