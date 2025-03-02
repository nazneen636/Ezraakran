import React, { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-row w-full overflow-x-hidden">
      <div><Sidebar /></div>
      <div className="flex-1 flex flex-col pl-16">
        <Topbar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default CommonLayout;
