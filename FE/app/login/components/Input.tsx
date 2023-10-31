"use client";

import clsx from "clsx";

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  type: string;
  verify?: boolean;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange, id, type, verify }) => {
  return (
    <div className="w-full">
      <div className="">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          id={id}
          type={type}
          className={clsx(
            `
            block
            w-full
            rounded-md
            border-0
            px-3
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-blue-200
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-sky-200
            
            h-14`,
            verify ? "ring-blue-200" : "ring-red-400"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
