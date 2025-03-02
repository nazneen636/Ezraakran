"use client";

import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface GroupCardProps {
  title: string;
  type: "Community Group" | "PUBLIC GROUP";
  activeTime: string;
  members: string;
  imageUrl: StaticImageData;
}

export function GroupCard({
  title,
  type,
  activeTime,
  members,
  imageUrl,
}: GroupCardProps) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Function to toggle popup visibility
  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  // Function to handle subscribe action
  const handleSubscribe = () => {
    // console.log("Subscribed to", title);
    setIsPopupVisible(false); // Close the popup after action
  };

  // Function to handle leave group action
  const handleLeaveGroup = () => {
    // console.log("Left group:", title);
    setIsPopupVisible(false); // Close the popup after action
  };

  return (
    <div className="bg-red rounded-3xl p-4 sm:p-6 md:p-8 space-y-4 flex flex-col justify-between relative">
      <div className="flex items-start justify-between">
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <Badge
            variant="secondary"
            className={`${
              type === "Community Group"
                ? "bg-[#ff9f84] "
                : "bg-[#ff9f84] "
            } rounded-full text-xs sm:text-sm md:text-base font-medium px-4 py-1`}
          >
            {type}
          </Badge>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            {title}
          </h3>
          <p className="text-sm sm:text-base md:text-lg ">
            Active {activeTime} • {members}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/50"
          onClick={togglePopup}
        >
          <MoreVertical className="h-6 w-6" />
        </Button>
      </div>

      <div className="relative h-60 w-full overflow-hidden rounded-2xl">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover aspect-square hover:scale-110 transition-all"
        />
      </div>

      {isPopupVisible && (
        <div className="absolute right-10 top-16 bg-bgUpdate  rounded-lg shadow-lg p-4 z-50 space-y-2">
          <button
            onClick={handleSubscribe}
            className="w-full text-left px-4 py-2 text-sm hover:bg-red rounded"
          >
            Subscribe
          </button>
          <button
            onClick={handleLeaveGroup}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red rounded"
          >
            Leave Group
          </button>
        </div>
      )}
    </div>
  );
}
