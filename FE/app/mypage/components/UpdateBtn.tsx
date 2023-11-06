import React from 'react';

interface UpdateButtonProps {
  onUpdate: () => void;
  buttonText: string;
}

const UpdateBtn: React.FC<UpdateButtonProps> = ({ onUpdate, buttonText }) => {
  return (
    <div
      className="flex text-xl border px-6 py-2 rounded-xl text-center items-center border-gray-400 cursor-pointer"
      onClick={onUpdate}
    >
      {buttonText}
    </div>
  );
};

export default UpdateBtn;