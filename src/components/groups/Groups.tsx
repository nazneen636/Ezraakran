"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import group1Image from "@/assets/groups/group1.png";
import GroupCard from "@/components/groups/group-card";
import { Pagination } from "@/components/members/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetGroupsQuery } from "@/redux/api/baseApi";
import { FaPlus } from "react-icons/fa";
import Loading from "@/components/Loading";
import CreateGroup from "@/components/groups/CreateGroup";

interface Group {
  id: string;
  name: string;
  type: string;
  description: string;
  memberCount: number;
  image: any;
}

export default function Groups() {
  const [createGroup, setCreateGroup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "my">("all");
  const itemsPerPage = 6;

  const { data, isLoading } = useGetGroupsQuery();
  const apiGroups = data?.data || [];

  // Local state to track created groups
  const [groups, setGroups] = useState<Group[]>(apiGroups);
  const [createdGroups, setCreatedGroups] = useState();

  // Update groups when API data changes
  useEffect(() => {
    if (apiGroups && JSON.stringify(apiGroups) !== JSON.stringify(groups)) {
      setGroups(apiGroups);
    }
  }, [apiGroups, groups]); // Runs when either apiGroups or groups change

  const myGroups = groups.slice(-3); // Get last 3 groups as my groups

  const displayedGroups = selectedFilter === "all" ? groups : myGroups;
  // Reset pagination when groups or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, groups]);

  const totalPages = Math.max(
    1,
    Math.ceil(displayedGroups.length / itemsPerPage)
  );
  const currentGroups = displayedGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to handle newly created groups
  const handleCreateGroup = (newGroup: Group) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    setCreateGroup(false);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="relative">
      {createGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div className="sm:mx-auto py-10 space-y-2 md:space-y-4 sm:w-full md:pl-12 px-4 mb-10 sm:container">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Groups
        </h1>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row items-between justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex flex-row items-start gap-2 md:gap-4">
            <div
              className={`flex items-center text-sm sm:text-base font-bold cursor-pointer ${
                selectedFilter === "all" ? "text-red" : "text-gray-500"
              }`}
              onClick={() => setSelectedFilter("all")}
            >
              All Groups
              <span className="ml-2 text-xs bg-red px-2 text-white rounded py-[2px]">
                {groups.length}
              </span>
            </div>

            <div
              className={`flex items-center text-sm sm:text-base font-bold cursor-pointer ${
                selectedFilter === "my" ? "text-red" : "text-gray-500"
              }`}
              onClick={() => setSelectedFilter("my")}
            >
              My Groups
              <span className="ml-2 text-xs bg-gray-200 px-2 rounded py-[2px]">
                {myGroups.length}
              </span>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex items-center md:justify-center gap-5">
            {/* Create Group Button */}
            <button
              onClick={() => setCreateGroup(true)}
              className="bg-white py-2 px-5 md:text-base text-sm text-black rounded-md flex gap-2 items-center font-medium"
            >
              <FaPlus />
              <span
                className={`${
                  createGroup ? "block md:hidden" : "md:block hidden"
                }`}
              >
                Create Group
              </span>
            </button>
            {createGroup && (
              <CreateGroup
                setCreateGroup={setCreateGroup}
                onCreate={handleCreateGroup}
              />
            )}

            <div className="flex items-center gap-5">
              {/* Search Input */}

              <Select defaultValue="newest">
                <SelectTrigger className="md:min-w-[130px] md:text-base text-sm w-auto rounded-md px-3 py-2 h-10 focus:ring-1 focus:ring-gray-200 focus:ring-offset-0 bg-white text-black">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="md:text-base text-sm" value="most">
                    Most Members
                  </SelectItem>
                  <SelectItem className="md:text-base text-sm" value="newest">
                    Newest Registered
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentGroups.map((group: Group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={displayedGroups.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
