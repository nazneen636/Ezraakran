"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DesignLabSection() {
  const floatingCircles = [
    { id: 1, size: 150, top: "50%", right: "70%", color: "bg-blue-500" },
    { id: 2, size: 120, top: "55%", right: "5%", color: "bg-yellow" },
    { id: 3, size: 200, top: "15%", right: "10%", color: "bg-pink" },
    { id: 4, size: 80, bottom: "10%", right: "20%", color: "bg-green" },
    { id: 5, size: 110, top: "15%", right: "60%", color: "bg-purple" },
  ];

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between min-h-[100vh] md:min-h-[70vh] bg-white  px-8 py-12 md:py-24   w-11/12 sm:w-full ">
      {/* Left Section (Text and Button) */}
      <div className="z-10 w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Elevate Your Design Game and
          <span className="text-[#6D9985]">
            {" "}
            Connect
            <br /> with Like-Minded Professionals
          </span>{" "}
          at Design Lab
        </h1>
        <div className="mt-6">
          <button className="px-6 py-3 bg-[#6D9985] text-white rounded-lg font-medium hover:bg-green text-sm sm:text-base">
            Search Freelancers
          </button>
        </div>
      </div>

      {/* Right Section (Floating Circles and Professionals Counter) */}
      <div className="relative w-3/5 md:w-1/2 h-full flex items-center justify-center mt-12 md:mt-0">
        <motion.div
          className="absolute bg-yellow rounded-full z-10 flex items-center justify-center"
          style={{
            width: 250,
            height: 250,
            top: "50%",
            right: "50%",
            transform: "translate(50%, -50%)",
          }}
        >
          <span className="text-3xl font-bold text-center">
            <span className="text-5xl font-extrabold">17K+</span> professionals
          </span>
        </motion.div>

        <div>
          {floatingCircles.map((circle) => (
            <motion.div
              key={circle.id}
              className={`absolute rounded-full ${circle.color}`}
              style={{
                width: circle.size,
                height: circle.size,
                ...circle,
              }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
