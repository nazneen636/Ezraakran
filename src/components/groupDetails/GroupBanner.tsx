"use client";
import React, { useEffect, useState } from "react";
import group1Image from "@/assets/groups/group1.png";
import Image from "next/image";
import Link from "next/link";
import CreatePost from "./CreateGroupPost";
import { useParams } from "next/navigation";
import {
  useGetGroupMemberByGroupIdQuery,
  useGetGroupStatusQuery,
  useJoinGroupMutation,
  useSingleGroupQuery,
} from "@/redux/api/baseApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { group } from "console";
import Loading from "../Loading";

const GroupBanner = () => {
  const { id: groupId } = useParams(); // Get the group ID from the URL
  const { data: singleGroup, isLoading } = useSingleGroupQuery(groupId);
  const groupName = singleGroup?.data?.name;
  const [createPost, setCreatePost] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [joinGroup, { isLoading: joinLoading }] = useJoinGroupMutation(); // Mutation hook to join group
  const user = useSelector(
    (state: { user: { user: { id: string } } }) => state.user.user
  );
  const userId = user?.id;
  console.log(userId);
  const { data } = useGetGroupMemberByGroupIdQuery(groupId);
  const member = data?.data?.data.length;
  const groupMember = data?.data?.data || [];
  // console.log(groupMember)
  // console.log(groupMember, "groupMember");

  // Filter group members based on userId
  interface GroupMember {
    userId: string;
  }

  const isUserGroupMember: GroupMember[] = groupMember?.find(
    (member: GroupMember) => member?.userId === userId
  );

  // const { data: groupStatus } = useGetGroupStatusQuery({ groupId });
  // console.log(groupStatus);

  useEffect(() => {
    // console.log(data?.isMember, "isMember");
    if (data?.isMember) {
      setIsJoined(true);
    }
  }, [data]);
  useEffect(() => {
    if (createPost) {
      document.body.style.overflow = "hidden";
      document.body.style.opacity = "50";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.opacity = "1";
    }
  }, [createPost]);

  const handleJoinGroup = async () => {
    try {
      if (isJoined) {
        toast.info("You are already a member of this group.");
        return;
      }

      const response = await joinGroup({ groupId }).unwrap();
      // console.log(response);
      toast.success("Joined group successfully!");
      setIsJoined(true); // Update state to indicate user has joined
    } catch (error) {
      console.error("Error joining group:", error);
      if (
        (error as any).data &&
        (error as any).data.message === "You are already a member of this group"
      ) {
        toast.info("You are already a member of this group.");
      } else {
        toast.error("Failed to join group. Please try again.");
      }
    }
  };
  if (isLoading) return <Loading />;
  return (
    <div className="relative">
      {createPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div className="rounded-3xl py-6 px-7 md:py-10 md:px-12 bg-customGreen text-white w-full mt-8 md:mt-20 h-auto md:h-[500px] flex md:flex-row flex-col md:items-center md:justify-center gap-5">
        {/* left */}
        <div className="left w-full md:w-1/2 flex flex-col gap-2">
          <div className="px-4 py-1 bg-pink text-gray-600 w-fit rounded-full">
            <h3 className="text-sm  font-bold">Community Group</h3>
          </div>
          <h1 className="text-xl md:text-5xl  text-white font-bold md:mt-4">
            {singleGroup?.data?.name || "Group Name"}
          </h1>
          <h3 className="text-sm opacity-80 md:text-base md:mt-4 font-bold ">
            {member} Members
          </h3>
          <div className="flex md:flex-row flex-col gap-5 mt-1 md:mt-5">
            {isUserGroupMember ? (
              <Link
                href=""
                className="py-3 text-base px-7 bg-green text-white rounded-md font-bold md:text-nowrap text-center  cursor-not-allowed"
              >
                Joined ✅
              </Link>
            ) : (
              <button
                onClick={handleJoinGroup}
                disabled={joinLoading}
                className="py-3  text-base px-7 bg-green text-white rounded-md font-bold md:text-nowrap text-center hover:bg-yellow transition duration-300 hover:text-gray-600"
              >
                {joinLoading ? "Joining..." : "Join Group"}
              </button>
            )}

            {/* Show 'Create Post' button if joined */}
            {isUserGroupMember && (
              <button
                onClick={() => setCreatePost(true)}
                className="py-3 text-base px-7 bg-green text-white rounded-md font-bold md:text-nowrap text-center hover:bg-yellow duration-300 transition-all hover:text-gray-600"
              >
                Create Post
              </button>
            )}
            {/* <Link
              onClick={() => setCreatePost(true)}
              href=""
              className="py-3 text-base px-7 bg-green text-white rounded-md font-bold md:text-nowrap text-center hover:bg-yellow duration-300 transition-all hover:text-gray-600"
            >
              Create Post
            </Link> */}
            {createPost && <CreatePost setCreatePost={setCreatePost} />}
          </div>
        </div>
        {/* right */}
        <div className="right w-full md:w-1/2 md:h-full h-[200px] overflow-hidden md:py-5">
          <Image
            src={group1Image}
            alt="group-image"
            height={400}
            width={400}
            className="h-full   w-full rounded-3xl "
          />
        </div>
      </div>
    </div>
  );
};

export default GroupBanner;
