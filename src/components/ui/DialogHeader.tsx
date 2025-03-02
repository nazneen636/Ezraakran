interface DialogHeaderProps {
  children: React.ReactNode;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-between pb-4 border-b">
      {children}
    </div>
  );
};
