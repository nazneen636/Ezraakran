"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "./CourseCard";

const courses = [
  {
    id: 1,
    category: "UX/UI",
    title: "Designing a Low Prototype in Figma",
    rating: 4.5,
    lessons: 6,
    students: 21,
    instructor: "Anthony Clark",
    imageUrl: "/path-to-image1.jpg",
    price: 65,
  },
  {
    id: 2,
    category: "Illustration",
    title: "Creative Thinking: Techniques and Tools",
    rating: 4.5,
    lessons: 6,
    students: 21,
    instructor: "Philippa Bush",
    imageUrl: "/path-to-image2.jpg",
    price: 20,
  },
  {
    id: 3,
    category: "Illustration",
    title: "Advanced Techniques for Artists",
    rating: 4.8,
    lessons: 8,
    students: 32,
    instructor: "Sam Carter",
    imageUrl: "/path-to-image3.jpg",
    price: 45,
  },
  {
    id: 4,
    category: "3D Design",
    title: "Blender Basics: From Zero to Hero",
    rating: 4.9,
    lessons: 10,
    students: 50,
    instructor: "Taylor Swift",
    imageUrl: "/path-to-image4.jpg",
    price: 75,
  },
];

export default function CourseCardCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of items per slide
  const itemsPerSlide = 2;

  const totalSlides = Math.ceil(courses.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleCourses = () => {
    const start = currentIndex * itemsPerSlide;
    const end = start + itemsPerSlide;
    return courses.slice(start, end);
  };

  return (
    <section className="px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-6xl font-bold tracking-tight">New Courses</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {getVisibleCourses().map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
