"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Star from "@/app/images/Star.png";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import NavBtn from "./components/NavBtn";

const Navbar: React.FC = () => {
  return (
    <div className="w-full h-28 flex flex-row items-center">
      <div className="w-1/4 pl-20">
        <Link href={`/`} className="flex flex-row">
          <Image src={Star} alt="별" />
          <p className="font-bold text-4xl pl-3">Aucation</p>
        </Link>
      </div>
      <div className="w-1/5">
        <div className="border-solid border-#646C76 border-2 pl-4 py-2 rounded-full flex flex-row ">
          <div className="w-[85%] text-xl">
            <input type="text" placeholder="검색어 입력" className="w-full" />
          </div>

          <div className="flex flex-row items-center pl-4">
            <HiOutlineMagnifyingGlass />
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse w-1/2 text-xl">
        <NavBtn>경매시작</NavBtn>
        <Link href={`/`} className="ml-14 text-2xl">
          로그아웃
        </Link>
        <Link href={`/`} className="ml-14 text-2xl">
          마이페이지
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
