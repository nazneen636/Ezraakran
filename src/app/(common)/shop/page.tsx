"use client";
import React, { use, useState } from "react";
import ShopCard from "@/components/home/ourShop/ShopCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Pagination } from "@/components/members/pagination";
import {
  useCreateShopPostMutation,
  useGetPostsQuery,
} from "@/redux/api/baseApi";
import CreateShopPost from "@/components/shop/CreateShopPost";
import Loading from "@/components/Loading";

interface Product {
  id: number;
  category: string;
  title: string;
  label?: string; // Optional label like "SALE" or "NEW"
  price: number;
  originalPrice?: number; // Optional original price for discounted items
  images: string[];
  postType?: string;
}

const itemsPerPage = 6;

const page = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery();
  console.log(posts);
  const [createPost] = useCreateShopPostMutation();

  const products = posts?.data?.data; // Accessing the nested "data" array
  console.log(products);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination details
  const totalItems = products?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentProducts = products?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  if (isLoading) <Loading />;
  return (
    <div className="sm:mx-auto py-10 space-y-8 sm:w-full md:px-12 px-2 mb-10 sm:container">
      <h1 className="text-4xl md:text-6xl font-semibold">Community Store</h1>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm md:text-base">
                  Sort By Highest and Lowest Price
                </h3>
                <ChevronDown className="h-4 w-4 " />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-darkBlue">
            <DropdownMenuItem>Hightest Price</DropdownMenuItem>
            <DropdownMenuItem>Lowest Price</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* create shop post */}
        <CreateShopPost />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-0 md:py-10">
        {currentProducts?.map((product: Product) => (
          <ShopCard key={product?.id} product={product} />
        ))}
      </div>
      <div className="mt-10">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default page;
