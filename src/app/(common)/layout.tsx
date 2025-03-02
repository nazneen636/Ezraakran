import CommonLayout from "@/components/layout/CommonLayout";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <CommonLayout>{children}</CommonLayout>;
};

export default layout;
