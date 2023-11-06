"use client";

import React, { useState } from "react";

import LikeBtn from "../../detail/components/LikeBtn";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import ColCountDown from "./ColCountDown";
import { AuctionItem } from "@/app/utils/cardType";
import formatKoreanCurrency from "@/app/utils/formatKoreanCurrency";
import { callApi } from "@/app/utils/api";
interface CardProps {
  item: AuctionItem;
  nowTime: Date | null;
}

const AuctionListCard: React.FC<CardProps> = ({ item, nowTime }) => {
  const [likeCount, setLikeCount] = useState<number>(item.likeCnt);
  const [isLiked, setIsLiked] = useState<boolean>(item.isLike);

  const likeHandler = (newLikeStatus: boolean) => {
    setIsLiked(newLikeStatus); // 옵티미스틱 업데이트
    setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - 1); // 좋아요 수 변경

    callApi("get", `/auction/like/${item.auctionPk}`, { auctionPk: item.auctionPk })
      .then(response => {
        console.log("좋아요 성공", response);
      })
      .catch(error => {
        console.log("좋아요 실패", error);
      });
  };
  return (
    <div className="hover:cursor-pointer overflow-hidden h-full rounded-lg shadow-lg bg-white hover:border-sky-500 hover:ring-8 hover:ring-sky-200 hover:ring-opacity-100">
      <div className="h-1/2 relative">
        <Image
          src={item.auctionImg}
          alt={item.auctionTitle}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="transition-transform transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <LikeBtn isLiked={isLiked} likeHandler={likeHandler} />
        </div>
      </div>
      {/* 본문 */}
      <div className="h-1/2 px-3 py-2">
        <div className="flex items-center justify-between h-1/6 text-customLightTextColor">
          <p> 좋아요: {likeCount} 개</p>
        </div>

        <div className="flex items-center justify-between h-1/4 font-extrabold text-2xl">
          <p> {item.auctionTitle}</p>
        </div>

        <div className="flex items-center justify-between h-1/5 font-bold text-2xl">
          <p> {formatKoreanCurrency(item.auctionStartPrice)}</p>
        </div>

        <div className="flex items-center h-1/5 w-5/6 border-2 rounded-3xl bg-customBgLightBlue text-lg">
          <div
            className="bg-custom-btn-gradient flex items-center justify-center
            h-full rounded-3xl w-[40%] text-white"
          >
            {item.auctionOwnerIsShop ? "소상공인" : "개인"}
          </div>
          <div className="flex items-center justify-center flex-grow whitespace-nowrap px-2 ">
            {item.auctionOwnerNickname}
          </div>
        </div>

        <div className="flex items-center justify-between h-1/6">
          <p>
            {new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(
              new Date(item.auctionStartTime)
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuctionListCard;
