import { twMerge } from "tailwind-merge";

interface ClientOverviewSkeletonProps {
  className?: string;
}

export const ClientOverviewSkeleton = ({
  className,
}: ClientOverviewSkeletonProps) => {
  return (
    <div>
      <div className="inline-flex w-full gap-2 border-b border-border dark:border-border-dark pb-3 px-4">
        <div className="h-4 w-auto flex-1 bg-gray-300 dark:bg-gray-600 rounded " />
        <div className="h-4 w-auto flex-1 bg-gray-300 dark:bg-gray-600 rounded " />
        <div className="h-4 w-auto flex-1 bg-gray-300 dark:bg-gray-600 rounded " />
        <div className="h-4 w-auto flex-1 bg-gray-300 dark:bg-gray-600 rounded hidden md:block" />
        <div className="h-4 w-auto flex-1 bg-gray-300 dark:bg-gray-600 rounded hidden md:block" />
        <div className="h-4 w-auto flex-1 bg-gray-300 dark:bg-gray-600 rounded hidden md:block" />
        <div className="h-4 w-auto flex-1 bg-gray-300 dark:bg-gray-600 rounded hidden md:block" />
      </div>
      <div className="flex">
        <div className={twMerge("flex-1", className)}>
          <div className="flex flex-col gap-3 animate-pulse w-full pl-4 pr-6 pt-4 pb-4">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded mx-auto" />
            <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded mx-auto" />
            <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded mx-auto" />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded " />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
        </div>
        <div className="w-1/4 border-l border-border dark:border-border-dark  flex-col gap-3 p-4 hidden md:flex">
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
          <div className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-3 w-11/12 bg-gray-300 dark:bg-gray-600 rounded" />
          <br />
          <div className="h-3 w-10/12 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-3 w-10/12 bg-gray-300 dark:bg-gray-600 rounded" />
          <br />
          <div className="h-3 w-10/12 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-3 w-10/12 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
      </div>
    </div>
  );
};
