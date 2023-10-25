"use client";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineHeart } from "react-icons/ai";
import { RiUserFill, RiTimerFlashLine } from "react-icons/ri";
import productimg from "@/app/images/productimg.png";
import AuctionMainPage from "./AuctionMainPage";
import AuctionChat from "./AuctionChat";

const AuctionMain = () => {
  // const [heart, setHeart] = useState(0);
  // const [userCount, setUserCount] = useState(12645);
  // const [auctionTime, setAuctionTime] = useState("00:30:47");
  return (
    <>
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
          h-full
          w-full
          flex
        "
        >
          <AuctionMainPage />
          <AuctionChat />
        </div>
      </div>
    </>
  );
};

export default AuctionMain;
