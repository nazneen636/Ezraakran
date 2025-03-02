import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Member {
  id: string;
  name: string;
  username: string;
  role: string;
  joinedDate: string;
  avatar: StaticImageData;
  status: "online" | "offline";
}

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  // const [isPopupVisible, setIsPopupVisible] = useState(false);

  // const togglePopup = () => {
  //   setIsPopupVisible((prev) => !prev);
  // };

  // const handleAddFriend = () => {
  //   console.log("Add Friend clicked for:", member.name);
  //   setIsPopupVisible(false); // Close the popup after the action
  // };

  // const handleFollow = () => {
  //   console.log("Follow clicked for:", member.name);
  //   setIsPopupVisible(false); // Close the popup after the action
  // };

  return (
    <div className="bg-red rounded-3xl p-4 md:p-10 relative">
      {/* MoreVertical Button */}
      {/* <button
        className="absolute right-4 top-4 md:right-10 md:top-10"
        onClick={togglePopup} 
      >
        <MoreVertical className="h-5 w-5 text-gray-500" />
      </button> */}

      {/* Popup */}
      {/* {isPopupVisible && (
        <div className="absolute right-10 top-16 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 space-y-2">
          <button
            onClick={handleAddFriend}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded"
          >
            Add Friend
          </button>
          <button
            onClick={handleFollow}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded"
          >
            Follow
          </button>
        </div>
      )} */}

      <div className="space-y-6">
        <div className="space-y-4">
          <span className="px-3 py-0.5 text-xs font-medium bg-yellow-100 rounded bg-yellow">
            {member.role}
          </span>

          <div className="space-y-1">
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight">
              {member.name}
            </h3>
            <p className="text-darkBlue text-xl md:text-2xl font-bold">
              {member.username}
            </p>
          </div>

          <p className="text-sm text-darkBlue font-bold">
            Joined {member.joinedDate}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20 md:h-32 md:w-32">
              <Image src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                member.status === "online" ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </div>
          <Link href='/messages'>
            <Button
              variant="outline"
              className="flex-1 font-bold py-3 sm:py-6 hover:bg-darkBlue hover:border-none"
            >
              Send Message
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
