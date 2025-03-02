"use client";

import React from "react";
import { useGetGroupsQuery } from "@/redux/api/baseApi";

import Loading from "@/components/Loading";
import Link from "next/link";
import GroupCard from "@/components/groups/group-card";

const PopularGroups = () => {
  const { data, isLoading } = useGetGroupsQuery();

  // Ensure data exists before slicing
  const popularGroups = data?.data?.slice(0, 3) || [];

  if (isLoading) return <Loading />;
  return (
    <div className="px-2">
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
        Popular Groups
      </h2>

      <Link href="/groups">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {popularGroups.length > 0 ? (
            popularGroups.map(
              (group: {
                id: string;
                name: string;
                type: string;
                description: string;
                memberCount: number;
                image: string;
              }) => <GroupCard key={group.id} group={group} />
            )
          ) : (
            <p>No popular groups found.</p>
          )}
        </div>
      </Link>
      <div className="mt-6 text-center">
        <Link
          href="/groups"
          className="font-bold text-white hover:text-lime-800 duration-300 transition-all hover:underline"
        >
          View All Groups →
        </Link>
      </div>
    </div>
  );
};

export default PopularGroups;
