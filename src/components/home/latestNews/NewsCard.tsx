import Image, { StaticImageData } from "next/image";
import React from "react";

interface News {
  id: number;
  category: string;
  title: string;
  label?: string; // Optional label like "SALE" or "NEW"
  price: number | string;
  originalPrice?: number; // Optional original price for discounted items
  imageUrl: StaticImageData;
}

interface NewsCardProps {
  news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {
    return (
      <div className="bg-[#EFF0F2] rounded-3xl p-8 flex flex-col">
        <div className="relative aspect-square w-full mx-auto rounded-3xl overflow-hidden mb-4">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover"
          />
          {news.label && (
            <span className="absolute top-4 left-4 text-xs uppercase font-medium px-2 py-0 bg-[#F9D442] text-black rounded">
              {news.label}
            </span>
          )}
        </div>
        
        <p className="text-gray-500 text-xs font-bold mb-1">{news.category}</p>
        <h3 className="text-4xl font-bold mb-2 font-clash-display hover:text-yellow">{news.title}</h3>
        
        <div className="flex items-center gap-2 mb-4">
          {news.originalPrice && (
            <span className="text-2xl font-bold text-[#468370] line-through">
              ${news.originalPrice}
            </span>
          )}
          <span className="text-2xl font-bold text-green">
            ${news.price}
          </span>
        </div>
  
        <button className="w-full py-3 border border-gray-300 hover:bg-black hover:text-white text-sm font-bold  text-black rounded-xl transition duration-200 mt-auto">
          Add to Cart
        </button>
      </div>
    )
  }

export default NewsCard;
