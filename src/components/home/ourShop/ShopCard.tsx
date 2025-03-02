"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: number;
  category: string;
  title: string;
  postType?: string;
  price: number | string;
  originalPrice?: number;
  images: string[];
}

interface ShopCardProps {
  product: Product;
}

const ShopCard = ({ product }: ShopCardProps) => {
  const router = useRouter();

  // console.log(product, "product id");

  const handleBuyClick = () => {
    const url = `shop/payment?postId=${product?.id}`;
    router.push(url);
  };

  return (
    <div className="bg-red rounded-3xl p-8 flex flex-col">
      <Link href={`/shop/${product.id}`} passHref>
        <div className="relative aspect-square w-full mx-auto rounded-3xl overflow-hidden mb-4">
          {product?.images.length > 0 && (
            <Image
              src={product?.images[0]}
              alt={product.title || "Product Image"}
              fill
              className="object-cover w-[250px] h-[250px] hover:scale-110 transition-all"
            />
          )}
          {/* {product.postType && (
            <span className="absolute top-4 left-4 text-xs uppercase font-medium px-2 py-0 bg-[#F9D442] text-black rounded">
              {product?.postType}
            </span>
          )} */}
        </div>

        {/* <p className="text-darkBlue text-base font-bold mb-1 text-center capitalize">
          {product?.category}
        </p> */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 font-clash-display hover:text-yellow">
          {product?.title}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          {product?.originalPrice && (
            <span className="text-2xl font-bold text-darkBlue line-through">
              ${product?.originalPrice}
            </span>
          )}
          <span className="text-2xl font-bold text-darkBlue">
            £{product?.price}
          </span>
        </div>

        <button
          onClick={handleBuyClick}
          className="w-full py-3 border border-gray-300 hover:bg-darkBlue hover:border-darkBlue hover:text-white text-sm font-bold text-black rounded-xl transition duration-200 mt-auto"
        >
          Buy Product
        </button>
      </Link>
    </div>
  );
};

export default ShopCard;
