import BlogCard from "@/components/blogCard/BlogCard";
import React from "react";

const page = () => {
  return (
    <div className="container py-5">
      <h1 className="text-[128px] font-semibold">Blog</h1>
      <BlogCard />
    </div>
  );
};

export default page;
