"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import avatar1 from "@/assets/members/member1.png";
import avatar2 from "@/assets/members/member2.png";
import avatar3 from "@/assets/members/member3.png";
import avatar4 from "@/assets/members/member4.png";
import avatar5 from "@/assets/members/member1.png";

import MemberCard from "@/components/members/member-card";
import { Pagination } from "@/components/members/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Member {
  id: string;
  name: string;
  username: string;
  role: string;
  joinedDate: string;
  avatar: any;
  status: "online" | "offline";
}

const members: Member[] = [
  {
    id: "1",
    name: "Tyrone Stewart",
    username: "@Tyrone-clark",
    role: "3D ARTIST",
    joinedDate: "April 2019",
    avatar: avatar1,
    status: "online",
  },
  {
    id: "2",
    name: "Ezra",
    username: "@ezra_ui",
    role: "UX/UI DESIGNER",
    joinedDate: "Oct 2020",
    avatar: avatar2,
    status: "offline",
  },
  // {
  //   id: "3",
  //   name: "Lilly-Rose Holland",
  //   username: "@lillyrose.flower",
  //   role: "ILLUSTRATOR",
  //   joinedDate: "Jan 2015",
  //   avatar: avatar3,
  //   status: "online",
  // },
  // {
  //   id: "4",
  //   name: "Valerie Ferguson",
  //   username: "@valerie_ui",
  //   role: "UX/UI DESIGNER",
  //   joinedDate: "Oct 2020",
  //   avatar: avatar4,
  //   status: "offline",
  // },
  // {
  //   id: "5",
  //   name: "Lilly-Rose Holland",
  //   username: "@lillyrose.flower",
  //   role: "ILLUSTRATOR",
  //   joinedDate: "Jan 2015",
  //   avatar: avatar5,
  //   status: "online",
  // },
  // {
  //   id: "6",
  //   name: "Valerie Ferguson",
  //   username: "@valerie_ui",
  //   role: "UX/UI DESIGNER",
  //   joinedDate: "Oct 2020",
  //   avatar: avatar1,
  //   status: "offline",
  // },
  // {
  //   id: "7",
  //   name: "Lilly-Rose Holland",
  //   username: "@lillyrose.flower",
  //   role: "ILLUSTRATOR",
  //   joinedDate: "Jan 2015",
  //   avatar: avatar2,
  //   status: "online",
  // },
  // {
  //   id: "8",
  //   name: "Valerie Ferguson",
  //   username: "@valerie_ui",
  //   role: "UX/UI DESIGNER",
  //   joinedDate: "Oct 2020",
  //   avatar: avatar3,
  //   status: "offline",
  // },
  // {
  //   id: "9",
  //   name: "Lilly-Rose Holland",
  //   username: "@lillyrose.flower",
  //   role: "ILLUSTRATOR",
  //   joinedDate: "Jan 2015",
  //   avatar: avatar4,
  //   status: "online",
  // },
];

export default function Members() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(members.length / itemsPerPage);
  const currentMembers = members.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="sm:mx-auto py-10 space-y-2 md:space-y-4 sm:w-full md:pl-12 px-4 mb-10 sm:container">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Members</h1>

      {/* Top Section: Filters */}
      <div className="flex flex-col md:flex-row items-between justify-between gap-4">
        {/* Info: All Members and Following */}
        <div className="flex flex-col sm:flex-row items-start gap-2 md:gap-4 ">
          <div className="flex items-center text-sm sm:text-base font-bold text-red cursor-pointer">
            All Members{" "}
            <span className="ml-2 text-xs bg-red px-2 text-white rounded">
              {members.length}
            </span>
          </div>
          <div className="flex items-center text-sm sm:text-base font-bold text-red cursor-pointer">
            Following{" "}
            <span className="ml-2 text-xs bg-gray-200 px-2 rounded">10</span>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative group hidden sm:block rounded-md">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search members..."
              className="text-black pl-10 pr-4 py-2 w-8 group-hover:w-[200px] border border-gray-200 
                rounded-md bg-white transition-all duration-300 ease-in-out focus:outline-none 
                focus:ring-1 focus:ring-gray-200 placeholder:opacity-0 
                group-hover:placeholder:opacity-100 group-hover:border-gray-200"
            />
          </div>

          {/* Sort Select */}
          <Select defaultValue="newest">
            <SelectTrigger
              className="md:w-[200px] md:text-base text-sm rounded-md  px-3 py-2 h-10 
                focus:ring-1 focus:ring-gray-200 focus:ring-offset-0 bg-white text-black"
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="md:text-base text-sm " value="newest">
                Newest Registered
              </SelectItem>
              <SelectItem className="md:text-base text-sm " value="oldest">
                Oldest Registered
              </SelectItem>
              <SelectItem className="md:text-base text-sm " value="az">
                Alphabetical
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={members.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
