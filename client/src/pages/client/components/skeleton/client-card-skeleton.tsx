import { twMerge } from "tailwind-merge";

interface ClientCardSkeletonProps {
  count?: number;
  className?: string;
}

export const ClientCardSkeleton = ({
  count = 4,
  className,
}: ClientCardSkeletonProps) => {
  return (
    <div
      className={twMerge(
        "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border border-border dark:border-border-dark rounded-lg p-4 flex gap-3 animate-pulse"
        >
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="flex flex-col flex-1 space-y-2">
            <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-8 w-20 ml-auto bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
