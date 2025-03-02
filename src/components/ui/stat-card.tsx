"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StatCardProps {
  value: string;
  label: string;
  link: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  value,
  label,
  link,
  icon,
  className,
}: StatCardProps) {
  return (
    <Link href={link}>
      <div
        className={cn(
          "relative rounded-3xl px-8 md:px-12 py-8 h-56 md:h-80 group cursor-pointer grid items-end shadow-lg transition-all duration-300 ease-in-out",
          className
        )}
      >
        <div className="absolute  top-8 md:top-10 left-8 md:left-12 sm:h-10 sm:w-10 h-14 w-14 bg-white rounded-full flex items-center justify-center">
          {icon && (
            <div className="text-3xl md:text-8xl  text-customGreen">{icon}</div>
          )}
        </div>

        <Link
          href={link}
          className="absolute top-8 md:top-10 right-6 bg-customYellow  p-3 rounded-xl group group-hover:bg-white transition-all duration-300"
        >
          <ArrowRight className="h-5 w-5 text-gray-700 group-hover:text-black" />
        </Link>
        <div className="space-y-2">
          <h3 className="text-5xl md:text-[64px] text-white font-bold tracking-tight capitalize">
            {value}
          </h3>
          <p className="text-base md:text-2xl text-white capitalize ">
            {label}
          </p>
        </div>
      </div>
    </Link>
  );
}
