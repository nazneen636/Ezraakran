"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import news1 from "@/assets/Latest News/news1.jpg"
import news2 from "@/assets/Latest News/news2.jpg"
import news3 from "@/assets/Latest News/news3.jpg"
import news4 from "@/assets/Latest News/news4.jpg"
import NewsCard from "./NewsCard";



const newses = [
  {
    id: 1,
    category: "Decor",
    title: "Coffee Cup",
    label: "SALE",
    price: 25,
    originalPrice: 30,
    imageUrl: news1,
  },
  {
    id: 2,
    category: "Clothes",
    title: "T-Shirt",
    label: "NEW",
    price: 153,
    imageUrl: news2,
  },
  {
    id: 3,
    category: "Accessories",
    title: "Fashion Bag",
    price: "45 - 55",
    imageUrl: news3,
  },
  {
    id: 4,
    category: "Gadgets",
    title: "Smart Watch",
    label: "BESTSELLER",
    price: 199,
    imageUrl: news4,
  },
];

export default function LatestNews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of items per slide
  const itemsPerSlide = 3;

  const totalSlides = Math.ceil(newses.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisiblenewses = () => {
    const start = currentIndex * itemsPerSlide;
    const end = start + itemsPerSlide;
    return newses.slice(start, end);
  };

  return (
    <section className="">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Latest News</h2>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getVisiblenewses().map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </section>
  );
}