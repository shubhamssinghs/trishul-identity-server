import React from "react";
import { Button } from "../button";
import { ButtonGroup } from "../button-group";
import type { PaginationProps } from "./types";

export const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  offset,
  hasNextPage,
  hasPreviousPage,
  onChange,
}) => {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (hasPreviousPage) {
      onChange({ offset: offset - limit });
      scrollToTop();
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      onChange({ offset: offset + limit });
      scrollToTop();
    }
  };

  const handlePageClick = (page: number) => {
    onChange({ offset: (page - 1) * limit });
    scrollToTop();
  };

  const renderPageButtons = () => {
    const buttons: React.ReactNode[] = [];

    const shouldShowPage = (page: number) =>
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 2 && page <= currentPage + 2);

    let lastShownPage = 0;

    for (let i = 1; i <= totalPages; i++) {
      if (shouldShowPage(i)) {
        if (lastShownPage + 1 < i) {
          buttons.push(
            <span
              key={`ellipsis-${i}`}
              className="px-2 text-gray-500 dark:text-gray-400"
            >
              ...
            </span>
          );
        }

        buttons.push(
          <Button
            key={i}
            onClick={() => handlePageClick(i)}
            variant={i === currentPage ? "solid" : "outline"}
            className={` ${i === currentPage && "scale-110"}`}
          >
            {i}
          </Button>
        );

        lastShownPage = i;
      }
    }

    return buttons;
  };

  if (!hasNextPage && !hasPreviousPage) return null;

  return (
    <ButtonGroup>
      <Button onClick={handlePrev} disabled={!hasPreviousPage}>
        Prev
      </Button>
      {renderPageButtons()}
      <Button onClick={handleNext} disabled={!hasNextPage}>
        Next
      </Button>
    </ButtonGroup>
  );
};
