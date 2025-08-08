export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipState {
  visible: boolean;
  content: string;
  position: TooltipPosition;
  coords: { top: number; left: number };
}
