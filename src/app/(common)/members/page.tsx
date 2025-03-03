"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import MemberCard from "@/components/members/member-card";
import { Pagination } from "@/components/members/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetAllUsersQuery } from "@/redux/api/baseApi";

interface Member {
  id: string;
  name: string;
  username: string;
  role: string;
  joinedDate: string;
  avatar: any;
  status: "online" | "offline";
  createdAt: string;
}

export default function Members() {
  const { data: allUsers } = useGetAllUsersQuery({});
  console.log(allUsers?.data, "all users");

  // Format the date
  const formattedDate = (createdAt: string) => {
    const joinedDate = new Date(createdAt);
    return joinedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sortOption, setSortOption] = useState("newest"); // State for sorting option
  const itemsPerPage = 9; // Set items per page to 10

  // Filter the users based on the search query
  const filteredUsers = allUsers?.data.filter((member: any) => {
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  // Sorting logic based on the selected option
  const sortUsers = (users: any[], option: string) => {
    switch (option) {
      case "newest":
        return users.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return users.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "az":
        return users.sort((a, b) => {
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });
      default:
        return users;
    }
  };

  // Sort the filtered users based on the selected sorting option
  const sortedUsers = sortUsers(filteredUsers || [], sortOption);

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  // Slice the sorted users for the current page
  const currentMembers = sortedUsers.slice(
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
              {filteredUsers?.length}
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
              value={searchQuery} // Bind the search query to the input field
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
          </div>

          {/* Sort Select */}
          <Select defaultValue="newest" onValueChange={setSortOption}>
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
        {currentMembers?.map((member: any) => (
          <MemberCard
            key={member.id}
            firstName={member.firstName}
            lastName={member.lastName}
            role={member.role}
            profilePicture={member.profilePicture}
            joinedDate={`${formattedDate(member.createdAt)}`}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={sortedUsers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
