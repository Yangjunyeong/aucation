"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LikeBtn from "../../detail/components/LikeBtn";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import ColCountDown from "./ColCountDown";
import { AuctionItem, ReverseAuctionItem } from "@/app/components/Card/cardType";
import formatKoreanCurrency from "@/app/utils/formatKoreanCurrency";
import { callApi } from "@/app/utils/api";
import AuctionCountDown from "./AuctionCountDown";
interface CardProps {
  item: AuctionItem | ReverseAuctionItem;
  nowTime: Date | null;
  type?: string;
}

const AuctionListCard: React.FC<CardProps> = ({ item, nowTime, type = "auction" }) => {
  const router = useRouter();
  const [likeCount, setLikeCount] = useState<number>(
    type === "reverse" ? (item as ReverseAuctionItem).likeCnt : (item as AuctionItem).likeCnt
  );
  const [isLiked, setIsLiked] = useState<boolean>(
    type === "reverse" ? (item as ReverseAuctionItem).isLike : (item as AuctionItem).isLike
  );
  // const tmp = nowTime ? new Date(nowTime) : null;
  const [auctionState, setAuctionState] = useState<string>("마감시간");

  const auctionStateHandler = (value: string) => {
    setAuctionState(value);
  };

  const likeHandler = (newLikeStatus: boolean) => {
    setIsLiked(newLikeStatus); // 옵티미스틱 업데이트
    setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - 1); // 좋아요 수 변경

    if (type === "reverse" && "reAuctionPk" in item) {
      const apiEndpoint = `/reverse-auction/like/${item.reAuctionPk}`;

      callApi("get", apiEndpoint, { auctionPk: item.reAuctionPk })
        .then(response => {
          console.log("좋아요 성공", response);
        })
        .catch(error => {
          console.log("좋아요 실패", error);
        });
    } else if (type === "auction" && "auctionPk" in item) {
      const apiEndpoint = `/auction/like/${item.auctionPk}`;

      callApi("get", apiEndpoint, { auctionPk: item.auctionPk })
        .then(response => {
          console.log("좋아요 성공", response);
        })
        .catch(error => {
          console.log("좋아요 실패", error);
        });
    }
  };
  const EnterDetail = (pk: number) => {
    if (type === "auction") {
      router.push(`/detail/auction/${pk}`);
    } else {
      router.push(`/reverseauction/${pk}`);
    }
  };
  return (
    <div className=" overflow-hidden h-full w-full rounded-lg shadow-lg bg-white hover:border-sky-500 hover:ring-8 hover:ring-sky-200 hover:ring-opacity-100">
      <div className="h-1/2 relative">
        <Image
          onClick={() => {
            EnterDetail("reAuctionPk" in item ? item.reAuctionPk : item.auctionPk);
          }}
          src={"reAuctionPk" in item ? item.reAuctionImg : item.auctionImg}
          alt={"reAuctionPk" in item ? item.reAuctionTitle : item.auctionTitle}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="cursor-pointer transition-transform transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <LikeBtn isLiked={isLiked} likeHandler={likeHandler} />
        </div>
      </div>
      {/* 본문 */}
      <div className="h-1/2 px-3 py-2">
        <div className="flex items-center justify-between text-customLightTextColor">
          <p> 좋아요: {likeCount} 개</p>
          <p>
            `
            {"reAuctionPk" in item
              ? "입찰자: " + item.reAuctionBidCnt
              : "참여자: " + item.auctionCurCnt}{" "}
            명
          </p>
        </div>

        <div
          onClick={() => {
            EnterDetail("reAuctionPk" in item ? item.reAuctionPk : item.auctionPk);
          }}
          className="cursor-pointer flex items-center justify-between h-[31%] font-extrabold text-2xl overflow-hidden"
        >
          <p> {"reAuctionPk" in item ? item.reAuctionTitle : item.auctionTitle}</p>
        </div>

        <div className="flex items-center justify-between mb-1 font-bold text-xl">
          <p>
            {" "}
            시작가 :{" "}
            {formatKoreanCurrency(
              "reAuctionPk" in item ? item.reAuctionStartPrice : item.auctionStartPrice
            )}
          </p>
        </div>
        <div className="flex items-center justify-between mb-1 font-bold text-xl">
          <p>
            {" "}
            입찰가 :{" "}
            {formatKoreanCurrency(
              "reAuctionPk" in item ? item.reAuctionLowBidPrice : item.auctionTopBidPrice
            )}
          </p>
        </div>

        <div className="flex items-center h-1/5 w-full border-2 rounded-3xl bg-customBgLightBlue text-lg">
          <div
            className="bg-custom-btn-gradient flex items-center justify-center
            h-full rounded-3xl w-[40%] text-white"
          >
            {("reAuctionPk" in item ? item.reAuctionOwnerIsShop : item.auctionOwnerIsShop)
              ? "소상공인"
              : "개인"}
          </div>
          <div className=" flex items-center w-[60%] justify-start overflow-hidden flex-grow whitespace-nowrap px-2 ">
            {"reAuctionPk" in item ? item.reAuctionOwnerNickname : item.auctionOwnerNickname}
          </div>
        </div>

        <div className="flex items-center justify-between h-1/6">
          <AuctionCountDown
            currentTime={nowTime!}
            auctionEndTime={"reAuctionPk" in item ? item.reAuctionEndTime : item.auctionEndTime}
            stateHandler={auctionStateHandler}
          />
          {/* <p>
            {item.auctionEndTime && !!isNaN(item.auctionEndTime.getTime())
              ? new Intl.DateTimeFormat("ko-KR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(item.auctionEndTime))
              : "유효하지 않은 날짜"}
          </p> */}
          {/* <div>{tmp}</div> */}
        </div>
      </div>
    </div>
  );
};

export default AuctionListCard;
