"use client";

import { Button } from "@/components/ui/button";
import { ChevronsRight, ChevronsLeft } from "lucide-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className=" md:space-y-4">
      {/* Display Range */}
      <p className="text-gray-600 text-sm">
        Viewing {startItem}-{endItem} of {totalItems} active members
      </p>

      {/* Pagination Buttons */}
      <div className="flex flex-wrap  items-center gap-2">
        {/* Previous Button */}
        <button
          className="md:w-16 w-10 md:h-10 h-10 rounded-xl hover:bg-customYellow duration-300 transition-all flex items-center justify-center text-black bg-white border"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <IoIosArrowBack className="h-4 w-4" />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? "default" : "outline"}
              size="lg"
              className={`md:w-16 w-10 md:h-10 h-10 rounded-xl text-sm md:text-base font-medium ${
                currentPage === pageNumber
                  ? "bg-customGreen text-white"
                  : "hover:bg-customGreen hover:text-white"
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}

        {/* Next Button */}
        <button
          className="md:w-16 w-12 md:h-10 h-10 rounded-xl hover:bg-customYellow hover:text-white duration-300 transition-all flex items-center justify-center text-black bg-white border"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <IoIosArrowForward className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
