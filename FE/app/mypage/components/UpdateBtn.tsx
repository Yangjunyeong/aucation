import React from 'react';

interface UpdateButtonProps {
  onUpdate: () => void;
  buttonText: string;
}

const UpdateBtn: React.FC<UpdateButtonProps> = ({ onUpdate, buttonText }) => {
  return (
    <div
      className="flex h-[30px] text-lg border px-[5px] rounded-sm text-center items-center border-gray-400 cursor-pointer"
      onClick={onUpdate}
    >
      {buttonText}
    </div>
  );
};

export default UpdateBtn;