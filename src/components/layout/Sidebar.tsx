"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  Users,
  ShoppingBag,
  PersonStanding,
  HelpCircle,
  Settings,
  Menu,
  Amphora,
} from "lucide-react";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/userSlice";
import Image from "next/image";
import minilogo from "@/assets/ezra_logo.png";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // const user = useSelector(selectUser);
  // const isLoggedIn = !!user?.user?.id;

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    {
      icon: ShoppingBag,
      label: "Community Store",
      href: "/shop",
    },
    { icon: PersonStanding, label: "Members", href: "/members" },
    { icon: Users, label: "Groups", href: "/groups" },
    { icon: Amphora, label: "Lotcom", href: "/lottery" },
  ];

  const bottomNavItems = [
    { icon: HelpCircle, label: "Help", href: "/help" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setCollapsed(true); // Collapse when clicking outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "flex flex-col border-r bg-customGreen h-screen fixed z-20",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header Section */}
      <div className="flex h-20 items-center px-2 justify-between ">
        {!collapsed && (
          <h2 className="text-xl font-semibold tracking-tight px-4">
            <Image
              src={minilogo}
              alt="logo"
              width={200}
              height={300}
              className="h-full w-full object-cover block ml-[-25px]"
            />
          </h2>
        )}
        <Button onClick={() => setCollapsed(!collapsed)}>
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation Items */}
      <ScrollArea className="flex-1 pt-4">
        <nav className="flex flex-col gap-2 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setCollapsed(true)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                !collapsed ? "justify-start" : "justify-center"
              )}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom Navigation Items */}
      <div className="pb-4">
        <nav className="flex flex-col gap-2">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                !collapsed ? "justify-start" : "justify-center"
              )}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
