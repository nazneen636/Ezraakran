import Image from "next/image";
import React from "react";

interface Course {
  id: number;
  category: string;
  title: string;
  rating: number;
  lessons: number;
  students: number;
  instructor: string;
  imageUrl: string;
  price: number;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div
      key={course.id}
      className="bg-[#EEF2F6] p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
    >
      <span className="text-xs uppercase font-semibold px-2 py-1 bg-[#FF99C0] text-black rounded-lg">
        {course.category}
      </span>
      <h3 className="mt-4 text-2xl font-semibold hover:text-[#F9D442]">
        {course.title}
      </h3>
      <p className="mt-2 text-gray-500 text-sm">
        {course.rating} ★ • {course.lessons} Lessons • {course.students}{" "}
        Students • by {course.instructor}
      </p>
      <div className="relative mt-4 h-40 w-full rounded-lg overflow-hidden">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black text-white text-sm font-medium px-4 py-2 rounded-full">
          ${course.price}
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
