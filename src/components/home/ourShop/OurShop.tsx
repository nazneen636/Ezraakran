"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShopCard from "./ShopCard";
import { useGetPostsQuery } from "@/redux/api/baseApi";
import Link from "next/link";
import Loading from "@/components/Loading";
interface Product {
  id: number;
  category: string;
  title: string;
  label?: string; // Optional label like "SALE" or "NEW"
  price: number | string;
  originalPrice?: number; // Optional original price for discounted items
  images: string[];
}

export default function OurShopCarousel() {
  const { data: posts, error, isLoading } = useGetPostsQuery();

  const products = posts?.data?.data;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of items per slide
  const itemsPerSlide = 3;

  const totalSlides = Math.ceil(products?.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleProducts = () => {
    const start = currentIndex * itemsPerSlide;
    const end = start + itemsPerSlide;
    return products?.slice(start, end);
  };
  if (isLoading) return <Loading />;
  return (
    <section className="sm:w-full px-2 md:px-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight">
          Our Shop
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full w-12 h-12 border-2"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full w-12 h-12 border-2"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <Link href="/shop">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getVisibleProducts()?.map((product: Product) => (
            <ShopCard key={product?.id} product={product} />
          ))}
        </div>
      </Link>
      <div className="mt-6 text-center">
        <Link
          href="/groups"
          className="font-bold text-white hover:text-lime-800 duration-300 transition-all hover:underline"
        >
          View All Products →
        </Link>
      </div>
    </section>
  );
}
