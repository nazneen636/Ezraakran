"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaEdit } from "react-icons/fa";
import {
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
} from "@/redux/api/baseApi";
import { toast } from "sonner";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: null as File | null,
  });
  const { data: userData, refetch } = useGetUserByIdQuery(user?.user?.id);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  console.log(userData, "userData");
  const userFirstName = userData?.data?.firstName;
  const userLastName = userData?.data?.lastName;
  const userProfilePicture = userData?.data?.profilePicture;
  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle profile image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0] as File;
      setFormData({ ...formData, profileImage: file });
    }
  };

  // Fetch user data on component mount

  // Handle form submission to update profile
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("firstName", formData.firstName);
    updatedData.append("lastName", formData.lastName);

    if (formData.profileImage) {
      updatedData.append("profilePicture", formData.profileImage);
    } else if (userProfilePicture) {
      updatedData.append("profilePicture", userProfilePicture); // Keep existing profile picture
    }

    try {
      const res = await updateUserProfile(updatedData).unwrap();
      toast.success(res?.message || "Profile updated successfully!");
      setEditMode(false);
    } catch (error: any) {
      toast.error(
        error.data.message || "Profile update failed. Please try again."
      );
    }
  };

  return (
    <div className="text-white min-h-[calc(100vh-82px)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-customGreen shadow-lg rounded-xl p-16">
        <div className="flex justify-between">
          <div className="flex items-center space-x-6 mb-10">
            {/* Profile Image Section */}
            <div className="relative">
              <Avatar className="h-20 w-20 rounded-full border-2 border-black shadow-md">
                <AvatarImage
                  src={
                    editMode && formData.profileImage
                      ? URL.createObjectURL(formData.profileImage)
                      : userProfilePicture
                  }
                />
                <AvatarFallback>
                  {user?.user?.firstName?.charAt(0)}
                  {user?.user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-all"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {formData?.firstName || userFirstName}{" "}
                {formData?.lastName || userLastName}
              </h1>
              <p className="text-lg">{user?.user?.email}</p>
            </div>
          </div>
          <div
            onClick={() => setEditMode(true)}
            className="px-4 py-2 text-gray-800 bg-yellow h-fit rounded-lg cursor-pointer flex items-center justify-center"
          >
            <FaEdit className="text-xl" />
          </div>
        </div>

        {/* About Section */}
        {!editMode ? (
          <div className="mt-6 space-y-6">
            <h2 className="text-2xl font-semibold">About Me</h2>
            <p className="text-lg">
              Welcome to your profile page. Here you can view your personal
              information and make updates as needed.
            </p>
          </div>
        ) : (
          // Edit Form
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <h2 className="text-2xl font-semibold">Edit Profile</h2>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 rounded-md bg-darkBlue border border-gray-600 text-white"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-3 rounded-md bg-darkBlue border border-gray-600 text-white"
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full p-3 bg-yellow text-black hover:bg-darkBlue rounded-md font-semibold duration-300 transition-all"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="w-full p-3 bg-yellow text-black hover:bg-darkBlue rounded-md duration-300 transition-all font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
