"use client";

import Image, { StaticImageData } from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import workIcon from "@/assets/new Works/workIcon.png";
import work1 from "@/assets/new Works/work1.jpg";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const works: Work[] = [
  {
    id: 1,
    title: "Work 1",
    image: work1,
    author: {
      name: "Elodie Hardin",
      avatar: workIcon,
    },
  },
  {
    id: 2,
    title: "Work 1",
    image: work1,
    author: {
      name: "Elodie Hardin",
      avatar: workIcon,
    },
  },
  {
    id: 3,
    title: "Work 1",
    image: work1,
    author: {
      name: "Elodie Hardin",
      avatar: workIcon,
    },
  },
  {
    id: 4,
    title: "Work 1",
    image: work1,
    author: {
      name: "Elodie Hardin",
      avatar: workIcon,
    },
  },
  {
    id: 5,
    title: "Work 1",
    image: work1,
    author: {
      name: "Elodie Hardin",
      avatar: workIcon,
    },
  },
  {
    id: 6,
    title: "Work 1",
    image: work1,
    author: {
      name: "Elodie Hardin",
      avatar: workIcon,
    },
  },
  {
    id: 7,
    title: "Work 1",
    image: work1,
    author: {
      name: "Elodie Hardin",
      avatar: workIcon,
    },
  },
  {
    id: 8,
    title: "Work 1",
    image: work1,
    author: {
      name: "Elodie Hardin",
      avatar: workIcon,
    },
  },
  {
    id: 9,
    title: "Work 1",
    image: work1,
    author: {
      name: "Elodie Hardin",
      avatar: workIcon,
    },
  },
];

interface WorkCardProps {
  work: Work;
}

interface Work {
  id: number;
  title: string;
  image: StaticImageData;
  author: {
    name: string;
    avatar: StaticImageData;
  };
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Card className="overflow-hidden rounded-lg border-none">
      <CardContent className="p-0">
        <div className="relative overflow-hidden group">
          <Image
            src={work.image}
            alt={work.title}
            width={120}
            height={120}
            className="object-cover transition-transform group-hover:scale-105 rounded-lg w-full h-auto overflow-hidden"
          />
          <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-white text-gray-600 px-4 py-2 mx-3 rounded-xl transition-transform duration-300 group-hover:-translate-y-3 text-xs sm:text-base">
            Wallet app design
          </div>
        </div>

        <div className="flex items-center gap-3 p-4">
          <Image
            src={work.author.avatar}
            alt={work.title}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-200">
            {work.author.name}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function NewWork() {
  return (
    <section className="w-full  px-8 md:px-16 py-8">
      <div className="mb-8 md:mb-12">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black">
          New Works
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-[#2d333c] p-8 md:p-12 rounded-3xl">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
}
