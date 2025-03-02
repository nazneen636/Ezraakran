import React from "react";
import GroupPost from "@/components/groupDetails/GroupPost";
import GroupBanner from "@/components/groupDetails/GroupBanner";

const page = () => {
  return (
    <div className="container px-4 md:px-0 ">
      <GroupBanner />
      <div className="flex gap-4">
        <div className="w-full">
          <GroupPost groupPostId="someId" />
        </div>
      </div>
    </div>
  );
};

export default page;
