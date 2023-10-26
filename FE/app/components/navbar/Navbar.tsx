"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Star from "@/app/images/Star.png";

import NavBtn from "./components/NavBtn";

const Navbar: React.FC = () => {
  return (
    <div className="w-full h-28 flex flex-row items-center sticky top-0 z-50 bg-white px-32">
      <div className="w-1/4 ">
        <Link href={`/`} className="flex flex-row">
          <Image src={Star} alt="별" />
          <p className="font-bold text-4xl pl-3">Aucation</p>
        </Link>
      </div>
      <div className="flex flex-row">
        <Link
          href={`/`}
          className={`ml-14 text-27px flex items-center font-semibold hover:underline`}
        >
          경매 상품
        </Link>
        <Link
          href={`/`}
          className="ml-14 text-27px flex items-center hover:underline font-semibold"
        >
          할인 상품
        </Link>
      </div>

      <div className="flex flex-row-reverse w-1/2 ">
        <NavBtn>경매시작</NavBtn>
        <Link href={`/`} className="ml-14 text-2xl flex items-center hover:underline">
          로그아웃
        </Link>
        <Link href={`/`} className="ml-14 text-2xl flex items-center hover:underline">
          마이페이지
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
