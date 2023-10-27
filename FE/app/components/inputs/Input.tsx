"use client";

import clsx from "clsx";
interface InputProps {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id }) => {
  return (
    <div>
      <label
        className="
        block
        text-sm
        font-medium
        leading-6
        text-gray-900"
        htmlFor="id"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          className={clsx(
            `
            form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-sky-600
            sm:text-sm
            sm:leading-6`
          )}
        />
      </div>
    </div>
  );
};

export default Input;
