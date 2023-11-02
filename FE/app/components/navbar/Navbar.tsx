"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Star from "@/app/images/Star.png";
import { useRouter } from "next/navigation";
import NavBtn from "../button/MainBtn";
const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    console.log("네브바 내부");
    const accessToken = localStorage.getItem("accessToken");
    setTimeout(() => {
      setIsLoggedIn(!!accessToken);
    }, 1000);
  }, []);

  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // 로그인 상태 업데이트
    setIsLoggedIn(false);

    // 홈페이지로 리디렉션
    router.push("/");
  };

  return (
    <div className="w-full h-28 flex flex-row items-center sticky top-0 z-50 bg-white px-48">
      <div className="w-1/4 ">
        <Link href={`/`} className="flex flex-row">
          <Image src={Star} alt="별" />
          <p className="font-bold text-4xl pl-3">Aucation</p>
        </Link>
      </div>
      <div className="flex flex-row w-auto">
        <Link
          href={`/auction`}
          className={`ml-14 text-27px whitespace-nowrap flex items-center font-semibold hover:underline`}
        >
          경매 상품
        </Link>
        <Link
          href={`/`}
          className="ml-14 text-27px whitespace-nowrap flex items-center hover:underline font-semibold"
        >
          할인 상품
        </Link>
      </div>

      <div className="flex flex-row-reverse  justify-start w-full ">
        <Link href={isLoggedIn ? "/panmae" : "/login"}>
          <NavBtn className="ml-14 px-4">경매 올리기</NavBtn>
        </Link>

        {isLoggedIn ? (
          <a
            onClick={handleLogout}
            className="ml-14 text-2xl flex items-center hover:underline cursor-pointer"
          >
            로그아웃
          </a>
        ) : (
          <Link href={`/login`} className="ml-14 text-2xl flex items-center hover:underline">
            로그인
          </Link>
        )}

        <Link
          href={isLoggedIn ? "/mypage" : "/login"}
          className="ml-14 text-2xl flex items-center hover:underline"
        >
          마이페이지
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
