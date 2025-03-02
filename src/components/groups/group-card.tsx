"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import {
  useJoinGroupMutation,
  useLeaveGroupMutation,
} from "@/redux/api/baseApi";
import { toast } from "sonner";

interface Group {
  id: string;
  name: string;
  type: string;
  description: string;
  memberCount: number;
  image: string;
}

interface GroupCardProps {
  group: Group;
}

export default function GroupCard({ group }: GroupCardProps) {
  const [joinGroup] = useJoinGroupMutation();
  const [leaveGroup] = useLeaveGroupMutation();
  // State for popup visibility
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Function to toggle popup visibility
  const togglePopup = () => {
    setIsPopupVisible((prev: boolean) => !prev);
  };

  // Function to handle subscribe action
  const handleJoinGroup = async () => {
    if (!group?.id) {
      console.error("Error: Group ID is undefined.");
      return;
    }

    try {
      const response = await joinGroup({ id: group.id }).unwrap(); // Await response properly
      console.log("Joined group:");
      setIsPopupVisible(false); // Close popup after action
      toast.success(`Joined group: ${group.name}`);
    } catch (error) {
      const response = await joinGroup({ id: group.id }).unwrap();
      console.error("Error joining group:", error);
      toast.error(response.data.message);
      console.log(response.data.data.message);
    }
  };

  // Function to handle leave group action
  const handleLeaveGroup = async () => {
    if (!group?.id) {
      console.error("Error: Group ID is undefined.");
      return;
    }

    try {
      const response = await leaveGroup({ id: group.id }).unwrap(); // Await response properly
      console.log("Left group:", group.name, response);
      setIsPopupVisible(false); // Close popup after action
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };

  return (
    <div className="bg-red rounded-3xl p-4 md:p-10 relative">
      {/* MoreVertical Button */}
      <button
        className="absolute md:right-10 md:top-10 right-4 top-4"
        onClick={togglePopup} // Toggle popup on click
      >
        <MoreVertical className="h-5 w-5 text-white" />
      </button>

      {/* Popup */}
      {isPopupVisible && (
        <div className="absolute right-10 top-16 bg-bgUpdate  rounded-lg shadow-lg p-4 z-50 space-y-2">
          <button
            onClick={handleJoinGroup}
            className="w-full text-left px-4 py-2 text-sm hover:bg-red rounded"
          >
            Join Group
          </button>
          <button
            onClick={handleLeaveGroup}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red rounded"
          >
            Leave Group
          </button>
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-4 h-[150px] flex flex-col gap-1">
          <span
            className={`px-3 py-2  text-xs rounded-full font-bold w-fit ${
              group?.type === "Community Group"
                ? "bg-green text-black"
                : "bg-pink text-black"
            }`}
          >
            {group?.type || "Community Group"}
          </span>

          <div className="space-y-2">
            <Link
              href="/groups/1"
              className="text-xl md:text-3xl font-bold capitalize tracking-tight
              "
            >
              {group?.name}
            </Link>
            <p className="text-sm  opacity-80 mt-4 capitalize">
              {group?.description}
            </p>
          </div>

          {/* <p className="text-sm text-darkBlue font-bold">
            {group.memberCount} Members
          </p> */}
        </div>

        <Link href={`/groups/${group?.id}`} className="relative group">
          <div className="w-full h-full absolute left-0 right-0 rounded-2xl bg-[#00000076] z-20 opacity-0 group-hover:opacity-100 duration-300 transition-all" />
          <div className="w-12 h-12 rounded-full bg-customYellow text-gray-600 flex items-center justify-center absolute z-[30] left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] opacity-0 group-hover:opacity-100 duration-300 transition-all">
            <FaLongArrowAltRight />
          </div>
          <div>
            <div className="relative h-44 sm:h-64 overflow-hidden w-full rounded-2xl mt-4 ">
              {group?.image ? (
                <Image
                  src={group?.image}
                  alt="Card Image"
                  width={500}
                  height={500}
                  className="md:h-full md:w-full w-[200px] object-cover rounded-2xl hover:scale-110 transition-all"
                />
              ) : (
                <div
                  className="h-full w-full bg-gray-200 rounded-2xl flex items-center justify-center text-gray-600
              "
                >
                  No Image Found
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
