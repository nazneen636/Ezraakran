"use client";

import { StatsGrid } from "@/components/stats/stats-grid";
import React from "react";

const Hero = () => {
  return (
    <div className="px-2 md:px-0 py-4 md:py-12 sm:w-full text-black">
      <h1 className="font-bold text-3xl md:text-[128px] leading-[40px] sm:leading-[72px] md:leading-[114px] px-4 py-4 md:py-0 md:pb-8">
        <span className="text-white bg-red rounded-3xl px-2 py-1">Join</span> African People's Network to Invest, Learn{" "}
        <span className="rounded-3xl border border-red px-2 py-1">and</span> Connect
      </h1>
      <StatsGrid />
    </div>
  );
};

export default Hero;