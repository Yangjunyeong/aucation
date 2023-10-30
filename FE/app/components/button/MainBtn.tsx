import React, { ReactNode } from "react";

interface NavProps {
  children: ReactNode;
  className?: string;
}

const MainBtn: React.FC<NavProps> = ({ children, className }) => {
  return (
    <div
      className={`text-2xl bg-custom-btn-gradient text-white px-4 py-3 rounded-full cursor-pointer hover:bg-custom-btn-gradient-hover ${className}`}
    >
      {children}
    </div>
  );
};

export default MainBtn;
