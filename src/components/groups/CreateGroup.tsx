import { useCreateGroupMutation } from "@/redux/api/baseApi";
import Image from "next/image";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { toast } from "sonner";

interface CreateGroupProps {
  setCreateGroup: (value: boolean) => void;
  onCreate: (newGroup: any) => void; // Add the onCreate prop
}

const CreateGroup: React.FC<CreateGroupProps> = ({
  setCreateGroup,
  onCreate,
}) => {
  // State for file input
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Image preview state
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  // Mutation hook
  const [createGroup, { isLoading }] = useCreateGroupMutation();

  // Input handlers
  const handleGroupName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGroupName(e.target.value);
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  // File change handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl); // Set the image preview URL
    }
  };

  // Form submit handler
  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    if (!groupName.trim() || !description.trim()) {
      alert("Please enter a group name and description.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", groupName);
      formData.append("description", description);
      if (selectedFile) formData.append("image", selectedFile);

      const newGroup = await createGroup(formData).unwrap();
      toast("Group created successfully!");
      onCreate(newGroup); // Pass the new group to the parent component
      setCreateGroup(false); // Close the modal
    } catch (err) {
      console.error("Failed to create group:", err);
    }
  };

  return (
    <div>
      <div className="bg-white text-gray-700 rounded-3xl shadow-customMd py-6 px-6 md:px-7 top-[25%] left-[40%] md:left-[50%] absolute w-[340px] md:w-[800px] -translate-y-1/2 -translate-x-1/2 z-[1000]">
        {/* Close Button */}
        <div
          className="absolute right-10 top-8 cursor-pointer"
          onClick={() => setCreateGroup(false)}
        >
          <RiCloseLargeFill className="text-base font-bold" />
        </div>

        {/* Form */}
        <div className="flex flex-col">
          <div className="flex gap-6 items-center">
            <div className="w-16 h-16 bg-black rounded-full flex-shrink-0">
              {/* Display image preview here */}
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Group Image Preview"
                  width={64}
                  height={64}
                  className="rounded-full w-full h-full"
                />
              )}
            </div>
            <div className="details flex flex-col gap-2 w-full">
              <h2 className="text-base md:text-xl font-bold">Create Group</h2>
            </div>
          </div>

          <form
            className="border border-gray-50 rounded-3xl py-4 mt-5 flex flex-col gap-3"
            onSubmit={handleCreateGroup}
          >
            <input
              type="text"
              placeholder="Group Name"
              className="font-bold text-base md:text-xl block border border-gray-200 rounded-md py-2 px-5 outline-none focus:ring-1 focus:ring-blue-600 shadow-sm w-full"
              value={groupName}
              onChange={handleGroupName}
            />
            <input
              type="text"
              placeholder="Description"
              className="font-bold text-base md:text-xl block border border-gray-200 rounded-md py-2 px-5 outline-none focus:ring-1 focus:ring-blue-600 shadow-sm w-full"
              value={description}
              onChange={handleDescription}
            />
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex items-center gap-4 bg-blue-500 px-5 py-2 rounded-lg font-bold shadow-md hover:bg-blue-600 transition text-gray-700"
              >
                <FaUpload className="text-gray-700" />
                Upload Your Profile Picture
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 bg-[#3c55c2] py-2 px-8 rounded-md text-white w-full font-bold"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Group"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
