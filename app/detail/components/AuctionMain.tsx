"use client";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineHeart } from "react-icons/ai";
import { RiUserFill, RiTimerFlashLine } from "react-icons/ri";
import productimg from "@/app/images/productimg.png";

const AuctionMain = () => {
  const [heart, setHeart] = useState(0);
  const [userCount, setUserCount] = useState(12645);
  const [auctionTime, setAuctionTime] = useState("00:30:47");
  return (
    <>
      <div style={{ height: "1px" }}></div>
      <div
        className="
        bg-white
        rounded-2xl
        h-[90%]
        w-[90%]
      "
      >
        <div
          className="
            flex
            justify-between
            pt-6
            px-6
            h-10
            items-center
        "
        >
          <AiOutlineArrowLeft size="48"></AiOutlineArrowLeft>
          <div
            className="
            flex
            justify-center
            items-center
          "
          >
            <AiOutlineHeart size="36" color="red" className="mx-3"></AiOutlineHeart>
            <p>{heart}</p>
          </div>
        </div>
        <div
          className="
            flex
            justify-between
            items-end
            my-8
        "
        >
          <h1
            style={{ color: "var(--c-sky)" }}
            className="
                text-3xl
                font-bold
                mx-6
            "
          >
            NOW AUCTIONING🔥
          </h1>
          <div
            className="
            flex
            mx-3
          "
          >
            <RiUserFill size="24"></RiUserFill>
            <p className="text-base px-2">{userCount}</p>
            <RiTimerFlashLine size="24"></RiTimerFlashLine>
            <p className="text-base px-2">{auctionTime}</p>
          </div>
        </div>
        <h1 className="text-4xl font-bold mx-6">제목입니다 이거 좀 사주세요 제발</h1>
        <div
          className="
            flex
            justify-between
        "
        >
          <div
            className="
            mx-6
            my-6
            w-2/5
            h-2/6
          "
          >
            <p className="mb-2">상품 사진</p>
            <Image alt="상품사진" src={productimg} layout="fill"></Image>
          </div>
          <div
            className="
            mx-6
            my-6
            w-3/5
          "
          >
            <p className="mb-2">상품 설명</p>
            <div
              className="
                p-4
            "
              style={{ backgroundColor: "var(--c-white)" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionMain;
