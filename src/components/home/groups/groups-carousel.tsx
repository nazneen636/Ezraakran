"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { GroupCard } from "./group-card";
import group1 from "@/assets/groups/group1.png";
import group2 from "@/assets/groups/group2.png";
import group3 from "@/assets/groups/group3.png";
import Link from "next/link";

const groups = [
  {
    title: "Group 1",
    type: "Community Group",
    activeTime: "2 days ago",
    members: "10k Members",
    imageUrl: group1,
  },
];

export function GroupsCarousel() {
  const popularGroups = groups.slice(-3);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of items to display per slide
  const itemsPerSlide = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerSlide < groups.length ? prev + itemsPerSlide : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerSlide >= 0
        ? prev - itemsPerSlide
        : groups.length - itemsPerSlide
    );
  };

  return (
    <div className="space-y-8 sm:w-full px-4 md:pl-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Popular Groups
        </h2>
        <div className="flex gap-2">
          {/* Previous Slide Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full w-12 h-12 border-2"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          {/* Next Slide Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full w-12 h-12 border-2"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Carousel Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 ">
        <Link href="/groups/1">
          {groups
            .slice(currentIndex, currentIndex + itemsPerSlide)
            .map((group, idx) => (
              <GroupCard
                key={`${group.title}-${idx}`}
                {...{
                  ...group,
                  type:
                    group.type === "Community Group" ||
                    group.type === "PUBLIC GROUP"
                      ? group.type
                      : "Community Group", // Fallback to a default value
                }}
              />
            ))}
        </Link>
      </div>
    </div>
  );
}
