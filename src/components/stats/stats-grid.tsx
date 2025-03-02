"use client";

import { StatCard } from "@/components/ui/stat-card";
import { PersonStanding, ShoppingBag, Users } from "lucide-react";

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      <StatCard
        icon={<PersonStanding />}
        link="/members"
        value="100+"
        label="members"
        className="bg-customGreen"
      />
      <StatCard
        icon={<Users />}
        link="/groups"
        value="3"
        label="groups"
        className="bg-customGreen"
      />
      <StatCard
        icon={<ShoppingBag />}
        link="/shop"
        value="50"
        label="items for sell"
        className="bg-customGreen"
      />
      {/* <StatCard value="4.9" label="320+ ratings" className="bg-white" /> */}
    </div>
  );
}
