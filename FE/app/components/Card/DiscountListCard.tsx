"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LikeBtn from "../../detail/components/LikeBtn";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import ColCountDown from "./ColCountDown";
import { DiscountItem } from "@/app/components/Card/cardType";
import formatKoreanCurrency from "@/app/utils/formatKoreanCurrency";
import { callApi } from "@/app/utils/api";
import AuctionCountDown from "./AuctionCountDown";
interface CardProps {
  item: DiscountItem;
  nowTime: Date | null;
}

const DiscountListCard: React.FC<CardProps> = ({ item, nowTime }) => {
  const router = useRouter();
  const [likeCount, setLikeCount] = useState<number>(item.likeCnt);
  const [isLiked, setIsLiked] = useState<boolean>(item.isLike);
  // const tmp = nowTime ? new Date(nowTime) : null;
  const [auctionState, setAuctionState] = useState<string>("마감시간");

  const auctionStateHandler = (value: string) => {
    setAuctionState(value);
  };

  const likeHandler = (newLikeStatus: boolean) => {
    setIsLiked(newLikeStatus); // 옵티미스틱 업데이트
    setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - 1); // 좋아요 수 변경
    const apiEndpoint = `/discount/like/${item.discountPk}`;

    callApi("get", apiEndpoint, { auctionPk: item.discountPk })
      .then(response => {
        console.log("좋아요 성공", response);
      })
      .catch(error => {
        console.log("좋아요 실패", error);
      });
  };
  const EnterDetail = (pk: number) => {
    router.push(`/detail/discount/${pk}`);
  };
  const EnterBid = () => {
    router.push(`/bid/${item.discountUUID}`);
  };
  return (
    <div className=" overflow-hidden h-full w-full rounded-lg shadow-lg bg-white hover:border-sky-500 hover:ring-8 hover:ring-sky-200 hover:ring-opacity-100">
      <div className="h-1/2 relative">
        <Image
          onClick={() => {
            EnterDetail(item.discountPk);
          }}
          src={item.discountImg}
          alt={item.discountTitle}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="cursor-pointer transition-transform transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <LikeBtn isLiked={isLiked} likeHandler={likeHandler} />
        </div>
        <div
          onClick={() => EnterBid()}
          className="rounded-lg absolute bottom-2 left-2 px-3 py-2 bg-customBgBlue hover:bg-custom-btn-gradient-hover text-white cursor-pointer border-1"
        >
          바로입장
        </div>
      </div>
      {/* 본문 */}
      <div className="h-1/2 px-3 py-2">
        <div className="flex items-center justify-between text-customLightTextColor">
          <p> 좋아요: {likeCount} 개</p>
          {/* <p>
            `
            {"reAuctionPk" in item
              ? "입찰자: " + item.reAuctionBidCnt
              : "참여자: " + item.auctionCurCnt}{" "}
            명
          </p> */}
        </div>

        <div
          onClick={() => {
            EnterDetail(item.discountPk);
          }}
          className="cursor-pointer flex items-center justify-between h-[25%] font-extrabold text-2xl overflow-hidden"
        >
          <p> {item.discountTitle}</p>
        </div>
        <div className="text-base text-customLightTextColor mb-1">
          카테고리: {item.discountType}
        </div>

        <div className="flex items-center justify-between mb-1 font-bold text-lg text-customLightTextColor ">
          <p>
            {" "}
            {item.discountRate}%{" "}
            <span className="line-through">{formatKoreanCurrency(item.originalPrice)}</span>
          </p>
        </div>
        <div className="flex items-center justify-between mb-1 font-bold text-2xl">
          <p>
            {" "}
            할인가 :{" "}
            <span className="text-red-600">{formatKoreanCurrency(item.discountedPrice)}</span>
          </p>
        </div>

        <div className="flex items-center h-1/5 w-full border-2 rounded-3xl bg-customBgLightBlue text-lg">
          <div
            className="bg-customBgBlue flex items-center justify-center
            h-full rounded-3xl w-[40%] text-white"
          >
            {item.discountOwnerNickname ? "소상공인" : "개인"}
          </div>
          <div className=" flex items-center w-[60%] justify-start overflow-hidden flex-grow whitespace-nowrap px-2 ">
            {item.discountOwnerNickname}
          </div>
        </div>

        <div className="flex items-center justify-between h-1/6 pb-3">
          <AuctionCountDown
            currentTime={nowTime!}
            auctionEndTime={item.discountEnd}
            stateHandler={auctionStateHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscountListCard;
