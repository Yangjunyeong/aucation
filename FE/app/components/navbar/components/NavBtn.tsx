import React, { ReactNode } from "react";

interface NavProps {
  children: ReactNode;
}

const NavBtn: React.FC<NavProps> = ({ children }) => {
  return (
    <div className="ml-14 text-2xl bg-blue-500 text-white px-4 py-2 rounded-full">{children}</div>
  );
};

export default NavBtn;
