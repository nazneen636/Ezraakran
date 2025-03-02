import React from "react";

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogFooter: React.FC<DialogFooterProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-end space-x-2 mt-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default DialogFooter;
