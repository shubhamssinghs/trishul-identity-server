import clsx from "clsx";

import type { AvatarProps } from "./types";

export const Avatar = ({
  name,
  imageUrl,
  size = 25,
  className = "",
  rounded = true,
}: AvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const styleSize = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      className={clsx(
        "bg-primary flex items-center justify-center overflow-hidden",
        rounded && "rounded-full",
        className
      )}
      style={{
        width: styleSize,
        height: styleSize,
        fontSize: `calc(${styleSize} / 2.5)`,
      }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-white font-semibold">{initials}</span>
      )}
    </div>
  );
};
