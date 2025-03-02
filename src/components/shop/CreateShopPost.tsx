"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/teaxtarea";
import { Dialog } from "@/components/ui/Dialog";
import { DialogContent } from "@/components/ui/DialogContent";
import { DialogHeader } from "@/components/ui/DialogHeader";
import DialogTitle from "@/components/ui/DialogTitle";
import DialogFooter from "@/components/ui/DialogFooter";
import {
  useCreateShopPostMutation,
  useCreateStripeAccountMutation,
  useCreateStripeAccountLinksMutation,
  useGetUserByIdQuery, // Add the new mutation for Stripe account links
} from "@/redux/api/baseApi";
import { toast } from "sonner";
import { FaPlus } from "react-icons/fa";
import { useGetPostsQuery } from "@/redux/api/baseApi"; // Import for refetch
import Swal from "sweetalert2"; // Import SweetAlert
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CreateShopPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectUser);

  const userId = user?.user?.id;
  const { data } = useGetUserByIdQuery(userId);

  const stripeAccountId = data?.data?.stripeAccountId;

  const router = useRouter();

  const [createShopPost, { isLoading }] = useCreateShopPostMutation();
  const { refetch } = useGetPostsQuery();
  const [createStripeAccount] = useCreateStripeAccountMutation(); // Hook for Stripe Account creation
  const [createStripeAccountLinks] = useCreateStripeAccountLinksMutation(); // Hook for creating Stripe account link

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    postType: string;
  }>({
    title: "",
    description: "",
    price: 0,
    category: "",
    images: [],
    postType: "SALE",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      let price = formData.price ? Number(formData.price) : 0;

      // If it's not a valid number, set price to 0
      if (isNaN(price)) {
        price = 0;
      }
      const updatedData = {
        title: formData?.title,
        description: formData.description,
        price: price, // Ensure it's a number here
        category: formData.category,
        postType: formData.postType,
      };

      const newFormData = new FormData();

      newFormData.append("data", JSON.stringify(updatedData));

      // Check if formData.images exists and is iterable
      if (formData && formData?.images && formData?.images.length > 0) {
        // Convert FileList to an array (if it's not already an array)
        const imagesArray = Array.from(formData.images); // Converts FileList to an array

        console.log(`aee imagess array`, imagesArray);

        // Now you can safely use map
        imagesArray.forEach((img) => {
          newFormData?.append("images", img);
        });
      }

      // Call the API request **once**, not in a loop
      const response = await createShopPost(newFormData).unwrap();

      if (response.success) {
        setIsModalOpen(false);
        refetch();
        toast.success("Shop post created successfully!");
      } else {
        toast.error(response?.message || "Error creating shop post.");
      }
    } catch (error) {
      console.error("Error creating shop post:", error);
      toast.error("Error creating shop post.");
    }
  };

  const handleClickModal = async () => {
    if (stripeAccountId === null) {
      Swal.fire({
        title: "Please Create Your Stripe Account?",
        text: "Click to Create Stripe Account create button",
        icon: "warning",
        //   showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Create Stripe Account",
        //   cancelButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          // Trigger the mutation to create a Stripe account
          createStripeAccount({ userId })
            .unwrap()
            .then((response) => {
              const accountId = response?.data?.id; // Assuming 'account_id' is returned upon success

              // Now create the Stripe account link using the account_id
              createStripeAccountLinks({ accountId }) // Pass account_id here
                .unwrap()
                .then((linkResponse) => {
                  const stripeAccountLink = linkResponse?.data?.url;
                  Swal.fire({
                    title: "Stripe Account Created",
                    text: `Your Stripe account has been successfully created. You must be setup your account here: ${stripeAccountLink}`,
                    icon: "success",
                  }).then(() => {
                    // redirect to the stripe lnk page to set up stripe account
                    router.replace(stripeAccountLink);
                  });
                })
                .catch((linkError) => {
                  console.error(
                    "Error creating Stripe account link:",
                    linkError
                  );
                  Swal.fire({
                    title: "Error",
                    text: "There was an error generating your Stripe account link.",
                    icon: "error",
                  });
                });
            })
            .catch((error) => {
              console.error("Error creating Stripe account:", error);
              Swal.fire({
                title: "Error",
                text: "There was an error creating your Stripe account.",
                icon: "error",
              });
            });
        }
      });
    } else {
      setIsModalOpen(true);
    }
  };
  return (
    <>
      <Button
        variant="outline"
        className="bg-red border-none hover:bg-darkBlue  text-white flex items-center gap-2 duration-300 transition-all"
        onClick={handleClickModal}
      >
        List product <FaPlus />
      </Button>

      {/* Modal */}
      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Shop Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              className="text-black text-base"
            />
            <Textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="text-black text-base"
            />
            <Input
              name="price"
              placeholder="Price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              className="text-black text-base"
            />
            <div>
              <label className="block mb-2">Upload Images</label>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  console.log(`see files`, files);
                  if (files?.length! > 0) {
                    // Convert FileList to an array and update the state
                    // const fileArray = Array.from(files);
                    // @ts-expect-error error
                    setFormData((prev) => ({
                      ...prev,
                      images: files,
                    }));
                  }
                }}
                multiple
                className="w-full border border-gray-200 py-2 px-2 rounded-md text-black"
              />
            </div>

            <div>
              <label className="block mb-2">Post Type</label>
              <select
                name="postType"
                value={formData.postType}
                onChange={handleInputChange}
                className="w-full border border-gray-200 py-2 px-2 rounded-md text-black"
              >
                <option value="SALE">Highest Price</option>
                <option value="INVESTMENT">Lowest Price</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="bg-black text-white"
            >
              Cancel
            </Button>
            <Button
              className="bg-black text-white"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateShopPost;
