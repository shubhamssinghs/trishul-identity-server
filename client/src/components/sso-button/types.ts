import type { NativeButtonProps } from "../ui/button/types";

export type SSOProvider =
  | "google"
  | "github"
  | "facebook"
  | "apple"
  | "microsoft";

export type SSOIconAndLabelMap = Record<
  SSOProvider,
  {
    icon: React.ReactElement<React.SVGProps<SVGAElement>>;
    label: string;
  }
>;

export interface SSOButtonProps extends Omit<NativeButtonProps, "children"> {
  provider: SSOProvider;
  label?: string;
  hideLabel?: boolean;
}
