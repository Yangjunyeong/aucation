"use client";
import React, { useState } from "react";

const page = () => {
  // const [selectedTap, setSelectedTap] = ;

  return (
    <div className="px-60 ">
      <div className="flex flex-row space-x-10 h-[100px] items-center">
        <div className="font-black text-5xl">경매 상품</div>
        <div className="font-bold text-3xl hover:cursor-pointer">경매중</div>
        <div className="font-bold text-3xl hover:cursor-pointer">경매전</div>
        <div className="font-bold text-3xl hover:cursor-pointer">삽니다</div>
      </div>

      <div>헤더 아래</div>
      <div>카드 리스트 부분</div>
      <div>페이지 네이션</div>
    </div>
  );
};

export default page;
