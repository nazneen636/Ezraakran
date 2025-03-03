import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface MemberCardProps {
  firstName: string;
  lastName: string;
  role: string;
  profilePicture?: StaticImageData | string;
  joinedDate?: string;
}

export default function MemberCard({
  firstName,
  lastName,
  role,
  profilePicture,
  joinedDate,
}: MemberCardProps) {
  const formattedDate = joinedDate
    ? new Date(joinedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;


  return (
    <div className="bg-red rounded-3xl p-4 md:p-10 relative">
      <div className="space-y-6">
        <div className="space-y-4">
          <span className="px-3 py-0.5 text-xs font-medium bg-yellow-100 rounded bg-yellow">
            {role}
          </span>

          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              <span>
                {firstName} {lastName}
              </span>
            </h3>
            {/* <p className="text-darkBlue text-xl md:text-2xl font-bold">
              {member.username}
            </p> */}
          </div>

          {formattedDate && (
            <p className="text-sm text-darkBlue font-bold">
              Joined {joinedDate}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20 md:h-28 md:w-28 border border-gray-100">
              {profilePicture ? (
                <Image
                  src={profilePicture}
                  alt={firstName}
                  width={150}
                  height={150}
                />
              ) : (
                <AvatarFallback>
                  {firstName[0]} {lastName[0]}
                </AvatarFallback>
              )}
            </Avatar>
            {/* <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                member.status === "online" ? "bg-green-500" : "bg-red-500"
              }`}
            /> */}
          </div>
          <Link href="/messages">
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
