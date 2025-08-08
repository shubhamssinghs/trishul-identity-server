// global.d.ts
import "react";
import type { TooltipPosition } from "src/components/ui/tooltip/types";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    "data-tooltip-content"?: string;
    "data-tooltip-position"?: TooltipPosition;
  }
}

import "react-router-dom";
import type { RouteHandle } from "./route-meta.types";

declare module "react-router-dom" {
  interface RouteObject {
    handle?: RouteHandle;
  }
}

import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    signal?: AbortSignal;
    skipAuthRefresh?: boolean;
    _retry?: boolean;
  }
}
