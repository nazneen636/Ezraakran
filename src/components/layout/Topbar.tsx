"use client";
import logo from "@/assets/ezra_logo.png";
import miniLogo from "@/assets/ezra_logo_mini.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, selectUser } from "@/redux/slice/userSlice"; // Adjust this path based on your file structure
import {
  Bell,
  Search,
  ChevronDown,
  LucideMessageCircleMore,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useGetUserByIdQuery } from "@/redux/api/baseApi";

export function Topbar() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const dispatch = useDispatch(); // Initialize Redux dispatch

  // Get the user from Redux state
  const user = useSelector(selectUser);
  const isLoggedIn = !!user?.user?.id;
  const { data: userId } = useGetUserByIdQuery(user?.user?.id);
  console.log(userId?.data?.profilePicture, "userId");
  const profilePicture = userId?.data?.profilePicture;
  const firstNameFirstLetter = userId?.data?.firstName?.charAt(0);
  const lastNameFirstLetter = userId?.data?.lastName?.charAt(0);
  console.log(firstNameFirstLetter, "firstNameFirstLetter");

  const handleSignOut = () => {
    dispatch(removeUser());
  };

  console.log(user);
  return (
    <div className="border-b">
      <div className=" flex items-center justify-between gap-4 px-4 h-20 relative">
        {/* Responsive Logo */}
        <Link href="/" className="font-bold text-xl md:text-4xl ">
          {/* <span className="block md:hidden">APN</span> */}
          <Image
            src={miniLogo}
            alt="logo"
            className="h-12 w-12 object-cover block md:hidden"
          />
          {/* <span className="hidden md:block">African Peoples Network</span> */}
          <Image
            src={logo}
            alt="logo"
            className="h-72 w-72 object-cover hidden md:block"
          />
        </Link>
        {/* absolute top-[-132%] left-[-17%] */}
        {/* Right-side Items */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search Bar */}
          <div
            className={cn(
              "relative transition-all duration-300 ease-in-out hidden sm:block text-black",
              isSearchExpanded ? "w-32 md:w-96" : "w-20 md:w-40"
            )}
            onMouseEnter={() => setIsSearchExpanded(true)}
            onMouseLeave={() => setIsSearchExpanded(false)}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 pr-4 h-10 bg-gray-50 border-gray-200 rounded-full "
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Link href="/messages" className="relative">
              {/* <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-pink text-[10px] font-medium text-white flex items-center justify-center">
                1
              </span> */}
              <LucideMessageCircleMore />
            </Link>
          </Button>

          {/* User Dropdown */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-full border-2 border-white shadow-sm">
                      <AvatarImage src={profilePicture} />
                      <AvatarFallback>
                        {firstNameFirstLetter} {lastNameFirstLetter}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium">
                      {user?.user?.name || "User"}
                    </span>
                    <ChevronDown className="h-4 w-4 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-darkBlue border-none"
              >
                <Link href="/profile">
                  <DropdownMenuItem className="hover:bg-black/5 rounded-lg cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/settings">
                  <DropdownMenuItem className="hover:bg-black/5 rounded-lg cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="hover:bg-black/5 rounded-lg cursor-pointer"
                  onClick={handleSignOut}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-1 md:gap-4">
              <button className="border border-gray-200 px-2 py-1  sm:px-4 sm:py-2 rounded-lg">
                <Link href="/login" className="text-xs sm:text-sm">
                  Login
                </Link>
              </button>
              <button className="border border-gray-200 px-2 py-1  sm:px-4 sm:py-2 rounded-lg">
                <Link href="/signup" className="text-xs sm:text-sm">
                  Signup
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
