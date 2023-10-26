import React, { ReactNode } from "react";

interface OwnProps {
  children: ReactNode;
}

const FootPtag: React.FC<OwnProps> = ({ children }) => {
  return <p className="mb-4">{children}</p>;
};

export default FootPtag;
