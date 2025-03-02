// File: DialogTitle.tsx
import React from "react";

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

const DialogTitle: React.FC<DialogTitleProps> = ({ children, className }) => {
  return (
    <h2
      className={`text-xl font-semibold leading-tight text-gray-800 ${className}`}
    >
      {children}
    </h2>
  );
};

export default DialogTitle;
