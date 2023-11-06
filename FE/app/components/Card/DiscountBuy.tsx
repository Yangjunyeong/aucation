"use client";

import React, { useState } from "react";
import nakchalImg from "@/app/images/nakchal.png";
import chatImg from "@/app/images/chatImg.png";
import LikeBtn from "../../detail/components/LikeBtn";
import Image from "next/image";
import clsx from "clsx";

import Link from "next/link";

interface ItemType {
  cardImgUrl: string;
  likeCount: Number;
  title: string;
  highestPrice: Number;
  isLiked: boolean;
  nickname: string;
  startPrice: Number;
  isIndividual: boolean;
  auctionStartTime: Date;
}

interface CardProps {
  item: ItemType;
}
const DiscountBuy: React.FC<CardProps> = ({ item }) => {
  const {
    cardImgUrl,
    likeCount,
    title,
    highestPrice,
    isLiked,
    nickname,
    startPrice,
    auctionStartTime,
    isIndividual,
  } = item;
  const [state, setState] = useState<string>("");
  const [liked, setLiked] = useState<boolean>(isLiked);
  const [nakchal, setNakchal] = useState<string>("완료");
  const likeHandler = (value: boolean) => {
    console.log(liked);
    setLiked(value);
  };

  const stateHandler = (state: string) => {
    setState(state);
    console.log("--------------->", state);
  };

  const clickHandler = () => {
    console.log("클릭");
  };
  return (
    <>
      <div
        className={clsx(
          "flex rounded-lg overflow-hidden shadow-lg bg-white w-[1200px] h-[250px] mt-12 transition-transform transform duration-300 hover:scale-110",
          nakchal == "낙찰" ? "border-2 border-blue-600" : "border-2 border-red-500"
        )}
      >
        {/* 카드 이미지 */}
        {nakchal == "낙찰" ? (
          <div>
            <div className="relative w-[300px] h-[250px]">
              <Image
                width={300}
                height={250}
                className="transition-transform transform duration-300 hover:scale-110"
                src={cardImgUrl}
                alt="Building Image"
                style={{ filter: "brightness(50%)" }}
              />
              <div className="absolute top-10 left-[23%]">
                <Image width={160} height={192} src={nakchalImg.src} alt="nakchal" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative w-[300px] h-[250px]">
              <Image
                className="transition-transform transform duration-300 hover:scale-110"
                src={cardImgUrl}
                width={300}
                height={250}
                alt="Building Image"
              />
              <div className="absolute top-3 right-4">
                <LikeBtn isLiked={liked} likeHandler={likeHandler} />
              </div>
            </div>
          </div>
        )}
        <div className="w-[900px] ml-7">
          {/* 경매 상태 / 경매 마크 / 남은 시간 카운트*/}
          <div className="flex justify-between mt-3">
            <div className="flex gap-4 font-bold text-[16px] mt-[5px] ">
              <div className="rounded-full border-2 px-3  border-gray-500">경매</div>
              <div
                className={clsx(
                  "rounded-full border-2 px-3",
                  nakchal == "낙찰"
                    ? "border-blue-500 text-customBlue"
                    : "border-red-500 text-red-500"
                )}
              >
                {nakchal}
              </div>
            </div>
            <div className="mr-16 text-xl">
              <span className="font-bold">등록일 :&nbsp;&nbsp;</span>
              {auctionStartTime.toLocaleString()}
            </div>
          </div>
          {/* 카드 제목 */}
          <div className="text-3xl h-[36px] font-bold mt-4 mr-20 whitespace-nowrap overflow-hidden text-ellipsis">
            피츄카 팔아요 제발 사주세요 사주세요피츄카 팔아요 제발 사주세요 사주세요피츄카 팔아요
            제발 사주세요 사주세요피츄카 팔아요 제발 사
          </div>

          {/* 판매자 */}
          <div className="flex mt-3 text-[22px] font-semibold">
            <div className="flex items-center">판매자 :&nbsp;</div>
            <div>
              <Link
                href={"/mypage"}
                className="text-customLightTextColor text-lg hover:underline"
              >
                <span className="text-3xl font-bold"> 한지우</span>
              </Link>
            </div>
          </div>

          {/* 경매 시작가 */}
          <div className="text-xl mt-2">
            경매 시작가 : <span className="text-2xl font-bold text-customBlue">{startPrice.toLocaleString()} <span className="text-black">원</span></span>
          </div>

          {/* 낙찰일시 / 낙찰가 / 채팅 및 확정 버튼*/}
          <div className="flex text-xl mt-3 mr-14 font-thin justify-between items-center">
            <div>낙찰일시 : <span className="font-light">{auctionStartTime.toLocaleString()}</span></div>
            <div>낙찰가 : <span className={clsx("font-bold", nakchal == "낙찰" ? "text-customBlue" : "text-red-500")}>{highestPrice.toLocaleString()}</span>&nbsp;원</div>
            <div className="flex gap-6">
              {nakchal == "낙찰" && <div className="flex border-2 px-4 py-1 rounded-lg">
                <Image width={22} height={10} src={chatImg.src} alt="chat" /><span className="ml-1">채팅</span>
                </div>}
              <div className="border-2 px-5 py-1 rounded-lg">확정</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountBuy;
