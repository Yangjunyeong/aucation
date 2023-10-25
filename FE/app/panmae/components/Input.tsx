"use client";

import { useState } from "react";

interface InputProps {
  productnameHandler: (name: string) => void;
}

const Input: React.FC<InputProps> = ({ productnameHandler }) => {
  const [text, setText] = useState("");

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    productnameHandler(e.target.value);
  };

  return (
    <input
      type="text"
      className="
                w-[80%]
                ml-10
                h-12
                border-2
                border-gray-300
                rounded-md
                px-4
                py-2
                text-gray-700
                focus:outline-none
                focus:border-sky-500
                focus:ring-2
                focus:ring-sky-200
                focus:ring-opacity-50
                disabled:opacity-50
                disabled:cursor-not-allowed
            "
      placeholder="상품명을 입력하세요"
      value={text}
      onChange={inputHandler}
    />
  );
};

export default Input;
