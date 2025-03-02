"use client";
import { useGetPostByIdQuery } from "@/redux/api/baseApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import product from "../../../../assets/our shop/refridge.png";
import Image from "next/image";
import Loading from "@/components/Loading";

const page = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostByIdQuery(id);
  const [currentImage, setCurrentImage] = React.useState(post?.data?.images[0]);
  console.log(post?.data?.images, "post");

  useEffect(() => {
    if (post?.data?.images?.length > 0) {
      setCurrentImage(post.data.images[0]);
    }
  }, [post]); // Add dependency on 'post' to update the image correctly when the post data changes.
  if (isLoading) {
    <Loading />;
  }
  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="w-[80%] bg-customGreen rounded-xl flex items-center justify-center gap-5 h-auto">
        {/* Image Gallery */}
        <div className="w-[500px] h-fit rounded-xl overflow-hidden p-8">
          <Image
            src={currentImage} // Fallback to 'product' image if currentImage is undefined
            alt="product image"
            width={500}
            height={500}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="flex justify-center items-center gap-5 mt-5 h-full">
            {post?.data?.images?.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImage(image)} // Update the main image on thumbnail click
                className="rounded-md overflow-hidden border-2 transform hover:scale-110 transition-all"
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index}`}
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 px-10">
          <div className="mb-10">
            <h1 className="font-bold uppercase text-3xl mb-5">
              {post?.data?.title}
            </h1>
            <p className="text-base">{post?.data?.description}</p>
          </div>

          <div className="flex items-center">
            <div className="inline-block align-bottom mr-5">
              <span className="text-2xl font-bold leading-none align-baseline">
                £{post?.data?.price}
              </span>
            </div>
            <div className="inline-block align-bottom">
              <button className="bg-yellow hover:opacity-75 opacity-100 text-gray-700 hover:bg-darkBlue rounded-full px-10 py-2 font-semibold duration-300 transition-all">
                <i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
