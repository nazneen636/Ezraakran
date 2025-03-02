"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { useCreateGroupPostMutation } from "@/redux/api/baseApi";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";

const CreateGroupPost = ({
  setCreatePost,
}: {
  setCreatePost: (val: boolean) => void;
}) => {
  const params = useParams();
  const groupId = params?.id;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<(string | StaticImageData)[]>([]);
  const [title, setTitle] = useState("");
  const [createPost, { isLoading }] = useCreateGroupPostMutation();

  // Handle file selection and generate image previews
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];

    if (files.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]); // Append new files
      const imagePreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...imagePreviews]); // Append new previews
    }
  };

  // Handle post creation
  const handlePostClick = async () => {
    if (!title.trim() || selectedFiles.length === 0) {
      alert("Please enter a title and upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    selectedFiles.forEach((file) => formData.append("images", file)); // Append all images

    console.log("FormData Entries:", formData);

    try {
      const res = await createPost({ groupId, formData }).unwrap();
      console.log("Post Response:", res);
      toast("Uploaded post successfully!");
      setCreatePost(false); // Close modal on success
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="bg-white text-gray-700 rounded-3xl shadow-customMd py-6 px-6 md:px-7 top-[60%] left-[50%] absolute w-[340px] md:w-[800px] -translate-y-1/2 -translate-x-1/2 z-[1000]">
      {/* Close Button */}
      <div
        className="absolute right-10 top-8 cursor-pointer"
        onClick={() => setCreatePost(false)}
      >
        <RiCloseLargeFill className="text-base font-bold" />
      </div>

      <div className="flex flex-col">
        {/* User Info (Placeholder) */}
        <div className="flex gap-6 items-center">
          <div className="w-16 h-16 bg-black rounded-full flex-shrink-0">
            <Image src="" alt="" />
          </div>
          <div className="details flex flex-col gap-2 w-full">
            <h2 className="text-base md:text-xl font-bold">Name</h2>
          </div>
        </div>

        {/* Post Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="border border-gray-50 rounded-3xl py-4 mt-5 flex flex-col gap-3"
        >
          {/* Title Input */}
          <input
            type="text"
            placeholder="Title for your post"
            className="font-bold text-base md:text-xl block border border-gray-200 rounded-md py-2 px-5 outline-none focus:ring-1 focus:ring-blue-600 shadow-sm w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* File Upload */}
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className="hidden"
              multiple // Allows multiple image selection
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex items-center gap-4 bg-blue-500 px-5 py-2 rounded-lg font-bold shadow-md hover:bg-blue-600 transition text-gray-700"
            >
              <FaUpload className="text-gray-700" />
              Upload Images
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handlePostClick}
            className="mt-4 bg-[#3c55c2] py-2 px-8 rounded-md text-white w-full"
            disabled={isLoading}
          >
            {isLoading ? "Posting..." : "Post"}
          </button>

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm md:text-lg font-bold">Image Preview:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previews?.map((src, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={src}
                      alt={`Uploaded Preview ${index + 1}`}
                      width={200}
                      height={200}
                      className="rounded-lg shadow-md w-full h-40 md:h-40 object-cover"
                    />
                    <div
                      className="absolute right-2 top-2 text-white bg-gray-400 rounded-full h-7 w-7 cursor-pointer flex items-center justify-center"
                      onClick={() => {
                        setPreviews((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                        setSelectedFiles((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <IoClose className="text-black" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateGroupPost;
