"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrDislike, GrLike } from "react-icons/gr";
import { LiaComments } from "react-icons/lia";
import {
  useDeleteGroupPostMutation,
  useGetPostReactionsQuery,
  useGetPostsByGroupIdQuery,
  usePostReactionMutation,
} from "@/redux/api/baseApi";
import { useParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Loading from "../Loading";
import PostComment from "./PostComment";
import { count } from "console";
import { toast } from "sonner";

interface GroupPostProps {
  groupPostId: string;
}

const GroupPost: React.FC<GroupPostProps> = () => {
  const [deleteGroupPost] = useDeleteGroupPostMutation();
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [unLiked, setunLiked] = useState(false);

  const [groupPostId, setgroupPostId] = useState("");
  // console.log(groupPostId, "groupPostId");
  const params = useParams();
  const { data: groupItems, isLoading } = useGetPostsByGroupIdQuery(params?.id);

  console.log(groupItems, "groupItems");
  const userId = "yourUserId"; // Define userId here
  const groupPost = groupItems?.data;

  const [postReaction] = usePostReactionMutation();
  const { data: reactionsData } = useGetPostReactionsQuery(groupPostId);
  console.log(reactionsData, "reactionsData");
  // const [likeShow, setLikeShow] = useState();
  // const [unLikeShow, setUnLikeShow] = useState();
  const [commentSectionVisible, setCommentSectionVisible] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  console.log(groupPostId, "groupPostId");
  // Function to handle reactions
  interface Comment {
    id: number;
    name: string;
    comment: string;
    time: string;
  }

  interface Post {
    id: string;
    createdAt: string;
    title: string;
    images: string[];
    user: {
      firstName: string;
      lastName: string;
      profilePicture: string;
    };
  }
  const handleDeletePost = async (id: string) => {
    try {
      const response = await deleteGroupPost({ id });
      console.log(response, "response");
      if (response?.data?.success) {
        toast("Post deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast("Error deleting post:");
    }
  };

  const handlePostReactions = async (groupPostId: string, type: string) => {
    try {
      const response = await postReaction({ groupPostId, type });
      console.log(response, "response");
      if (response?.data?.success) {
        if (type === "LIKE") {
          setLiked(true);
          setunLiked(false); // Reset "unLiked" when a post is liked
        } else if (type !== "LIKE") {
          setunLiked(true);
          setLiked(false); // Reset "liked" when a post is unliked
        }
      }
    } catch (error) {
      console.error("Error handling post reaction:", error);
      alert("Error handling post reaction:");
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div className="container flex flex-col gap-5 md:gap-0 py-3 px-0 md:px-8 mt-6 md:mt-12">
      {groupPost?.map((post: any) => {
        const timeAgo = formatDistanceToNow(new Date(post?.createdAt), {
          addSuffix: true,
        });
        return (
          <div
            key={post?.id}
            className="w-full py-6 md:py-10 md:px-8 md:my-10 px-6  rounded-3xl bg-green shadow-customMd"
          >
            <div className="flex justify-between">
              <div className="flex gap-5 items-center">
                <div className="h-12 w-12 md:h-20 md:w-20 rounded-full bg-black overflow-hidden">
                  <Image
                    src={post?.user?.profilePicture}
                    width={80}
                    height={80}
                    alt="Profile"
                  />
                </div>
                <div>
                  <h3 className="text-sm md:text-xl lg:text-2xl font-bold">
                    {post?.user?.firstName} {post?.user?.lastName}
                  </h3>
                  <p className="text-sm opacity-80">{timeAgo}</p>
                </div>
              </div>
              <div className="cursor-pointer relative">
                <div className="p-1" onClick={() => setDeletePost(!deletePost)}>
                  <BsThreeDotsVertical />
                </div>
                {deletePost && (
                  <ul className="bg-white rounded-lg text-black absolute top-[45%] right-0 w-fit py-2 md:py-3">
                    <li
                      className="py-1 px-4 font-bold text-nowrap  text-sm md:text-base"
                      onClick={() => handleDeletePost(post?.id)}
                    >
                      Delete post
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="mt-5 md:mt-8 ">
              <h2 className="font-bold text-base md:text-xl">{post?.title}</h2>
              <div className="overflow-hidden mt-4 md:mt-6">
                {post?.images && post?.images.length > 0 ? (
                  <div
                    className={`grid gap-4 ${
                      post.images.length === 1
                        ? "grid-cols-1"
                        : post.images.length === 2
                        ? "md:grid-cols-2"
                        : "grid-cols-1 md:grid-cols-3"
                    }`}
                  >
                    {post.images.map((img: string, index: number) => (
                      <div
                        key={index}
                        className={`w-full rounded-2xl overflow-hidden bg-[#00000037] ${
                          post.images.length === 1
                            ? "h-[200px] md:h-[500px]" // Full width, bigger height for single image
                            : "h-[200px] md:h-[400px]" // Normal height for multiple images
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Post Image ${index + 1}`}
                          width={300}
                          height={200}
                          className="w-full md:h-full object-cover rounded-2xl"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-[300px] relative z-10 overflow-hidden rounded-3xl">
                    <div className="absolute z-20 left-0 top-0 bg-[#00000050] w-full h-full flex items-center justify-center">
                      <span className="text-base text-black font-medium">
                        No images found
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between py-6 ">
                <div className="flex gap-6 md:gap-8 text-xl">
                  {/* Like button */}
                  <span
                    onClick={() => handlePostReactions(post?.id, "LIKE")}
                    className={`md:text-xl text-base font-bold flex items-center gap-2 cursor-pointer ${
                      liked ? "text-customGreen" : "text-white" // Change color if liked
                    }`}
                  >
                    <GrLike className="text-base md:text-xl" />
                    <span>Like</span>
                    <span className="text-xl">{count}</span>{" "}
                    {/* Display like count */}
                  </span>

                  {/* Unlike button */}
                  <span
                    onClick={() => handlePostReactions(post?.id, "UNLIKE")}
                    className={`md:text-xl text-base font-bold flex items-center gap-2 cursor-pointer ${
                      !unLiked ? "text-white" : "text-yellow" // Change color if not liked
                    }`}
                  >
                    <GrDislike className="text-base md:text-xl" />
                    <span>Unlike</span>
                  </span>
                </div>

                <h3
                  className="text-base md:text-xl font-bold opacity-80 flex gap-2 items-center cursor-pointer"
                  onClick={() => {
                    setCommentSectionVisible(!commentSectionVisible);
                  }}
                >
                  <LiaComments className="text-xl" /> Comments
                </h3>
              </div>
              {commentSectionVisible && <PostComment />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupPost;
