import ConferenceBanner from "@/components/home/conferenceBanner/ConferenceBanner";
import CourseCardCarousel from "@/components/home/courses/CourseCardCarousel";
import DesignLabSection from "@/components/home/designLab/DesignLap";
import { GroupsCarousel } from "@/components/home/groups/groups-carousel";
import PopularGroups from "@/components/home/groups/PopularGroups";
import Hero from "@/components/home/hero/Hero";
import { NewWork } from "@/components/home/newWork/NewWork";
import OurShopCarousel from "@/components/home/ourShop/OurShop";
import React from "react";

const page = () => {
  return (
    <div className="mt-0 md:mt-20 mb-10 container grid gap-20 ">
      <Hero />
      {/* <GroupsCarousel /> */}
      <PopularGroups/>
      {/* <DesignLabSection /> */}
      {/* <CourseCardCarousel /> */}
      {/* <NewWork/> */}
      <ConferenceBanner/>
      <OurShopCarousel/>
    </div>
  );
};

export default page;