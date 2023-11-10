"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Star from "@/app/images/Star.png";
import { useRouter } from "next/navigation";
import NavBtn from "../button/MainBtn";
import { useRecoilState } from "recoil";
import { authState } from "@/app/store/atoms";
import Link from "next/link";
const Navbar: React.FC = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [check, setCheck] = useState<boolean>(false);

  const router = useRouter();

  // const checkAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   console.log(auth);
  // };
  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("recoil-persist");

    // 로그인 상태 업데이트
    setAuth({ isLoggedIn: false, role: "" });

    // 홈페이지로 리디렉션
    router.push("/");
  };
  useEffect(() => {
    const checkLocalStorageToken = () => {
      const token = localStorage.getItem("accessToken");
      const whichRole = localStorage.getItem("role");
      if (token) {
        setAuth({ ...auth, isLoggedIn: true, role: whichRole });
      } else {
        setAuth({ ...auth, isLoggedIn: false });
      }
      setCheck(true);
    };
    checkLocalStorageToken();
  }, []);

  return (
    <div>
      {check && (
        <div className="w-full h-28 flex flex-row items-center sticky top-0 z-50 bg-white px-48">
          <div className="w-1/4 ">
            <Link href={`/`} className="flex flex-row">
              <Image src={Star} alt="별" width={40} height={40} />
              <p className="font-bold text-4xl pl-3">Aucation</p>
            </Link>
          </div>
          <div className="flex flex-row w-auto">
            <Link
              href={`/auction/holding`}
              className={`ml-14 text-27px whitespace-nowrap flex items-center font-semibold hover:underline`}
            >
              경매 상품
            </Link>
            <Link
              href={`/discount`}
              className="ml-14 text-27px whitespace-nowrap flex items-center hover:underline font-semibold"
            >
              할인 상품
            </Link>
          </div>
          <div className="flex flex-row-reverse  justify-start w-full ">
            <Link href={auth.isLoggedIn ? "/panmae" : "/login"}>
              <NavBtn className="ml-14 px-4">경매 올리기</NavBtn>
            </Link>

            {auth.isLoggedIn ? (
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
              href={auth.isLoggedIn ? "/mypage" : "/login"}
              className="ml-14 text-2xl flex items-center hover:underline"
            >
              마이페이지
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
