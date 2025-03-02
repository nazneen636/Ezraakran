interface DialogCloseProps {
  onClose: () => void;
}

export const DialogClose: React.FC<DialogCloseProps> = ({ onClose }) => {
  return (
    <button
      className="text-gray-500 hover:text-gray-700"
      onClick={onClose}
      aria-label="Close dialog"
    >
      &times;
    </button>
  );
};
