import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
const BackBtn = () => {

  return (
    <div className="bg-white" style={{ cursor: 'pointer', backgroundColor: "var(--c-white)" }}> 
      <BiArrowBack size={35} color="gray"/>
    </div>
  );
};

export default BackBtn;