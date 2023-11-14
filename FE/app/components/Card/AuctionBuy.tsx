"use client";

import React, { useState } from "react";
import nakchalImg from "@/app/images/nakchal.png";
import sellfinish from "@/app/images/sellfinish.png";
import chatImg from "@/app/images/chatImg.png";
import LikeBtn from "../../detail/components/LikeBtn";
import Image from "next/image";
import clsx from "clsx";
import { callApi } from "@/app/utils/api";
import RowCountDown from "./RowCountDown";
import Link from "next/link";
import formatKoreanCurrency from "../../utils/formatKoreanCurrency";

interface ItemType {
  // 이미지
  imgfile: string;
  // 좋아요 여부
  isLike: boolean;
  // 경매 상태
  // x 경매, 역경매 여부 /BID
  auctionStatus: string;
  // 등록일
  registerDate: Date;
  // 제목
  auctionTitle: string;
  // x 판매자 닉네임
  ownerNickname: string;
  // 시작가
  auctionStartPrice: number;
  // 경매 시작시간,종료시간
  auctionStartDate: Date;
  auctionEndDate: Date;
  // 경매장 입장
  auctionUUID: string;
  // prodPk - 채팅방
  auctionPk: number;
  // x 낙찰 여부
  // x 경매전- null / b
  // 낙찰이 되면 경매종료시점에서 내가 최고 입찰자이다? 그럼 BEFORE_CONFIRM, 구매 확정을 했을 경우 AFTER_CONFIRM
  auctionHistory?: string;
  // 낙찰일시 - BEFORE_CONFIRM
  historyDatetime: Date;
  // 구매확정 일시 - 구매 확정
  historyDoneDateTime: Date;
  // 최종가
  auctionSuccessPay: number;
  // x 지역
  mycity: string;
  zipcode: string;
  street: string;
  // x 판매자 pk
  ownerPk: number;
  // x 카테고리
  auctionType: string;
  // x 구매자 닉네임
  customerNicknname: string;
}

interface CardProps {
  item: ItemType;
}
const AuctionBuy: React.FC<CardProps> = ({ item }) => {
  const [isLiked, setIsLiked] = useState<boolean>(item.isLike);
  const [prodType, setProdType] = useState<string>("0");

  const likeHandler = (newLikeStatus: boolean) => {
    setIsLiked(newLikeStatus); // 옵티미스틱 업데이트

    callApi("get", `/auction/like/${item.auctionPk}`)
      .then(response => {
        console.log("좋아요 성공", response);
      })
      .catch(error => {
        console.log("좋아요 실패", error);
      });
  };

  return (
    <>
      <div className="flex rounded-lg overflow-hidden shadow-lg bg-white w-[1280px] h-[280px] mt-12 hover:border border-blue-400">
        {/* 카드 이미지 */}
        {item.auctionHistory == "AFTER_CONFIRM" ? (
          <div>
            <div className="relative w-[300px] h-[270px]">
              <Image
                layout="fill"
                className="transition-transform transform duration-300 hover:scale-110"
                src={item.imgfile}
                alt={item.auctionTitle}
                style={{ filter: "brightness(50%)" }}
              />
              <div className="absolute top-10 left-[25%]">
                <Image width={160} height={192} src={sellfinish.src} alt="sellfinish" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative w-[300px] h-[270px]">
              <Image
                className="transition-transform transform duration-300 hover:scale-110"
                src={item.imgfile}
                layout="fill"
                alt={item.auctionTitle}
                style={{ filter: "brightness(50%)" }}
              />
              <div className="absolute top-3 right-4">
                <LikeBtn isLiked={isLiked} likeHandler={likeHandler} />
              </div>
            </div>
          </div>
        )}
        <div className="w-[900px] ml-7">
          {/* 경매 상태 / 경매 마크 / 남은 시간 카운트*/}
          <div className="flex h-[60px] justify-between items-center">
            <div className="flex text-[22px] gap-4 font-bold">
              <div className="rounded-lg border-[0.1px] px-3 items-center border-gray-500">
                경매
              </div>
              <div
                className={clsx(
                  "flex items-center rounded-lg",
                  item.auctionHistory == "BEFORE_CONFIRM"
                    ? "border-red-500 text-red-500"
                    : "border-black text-black"
                )}
              >
                {item.auctionHistory == "BEFORE_CONFIRM" ? "낙찰" : "구매완료"}
              </div>
            </div>
            <div className="mr-16 text-xl">
              <span className="font-bold">등록일 :&nbsp;&nbsp;</span>
              {item.registerDate.toLocaleString()}
            </div>
          </div>
          {/* 카드 제목 */}
          <div className="text-3xl h-[36px] font-bold mt-4 mr-20 whitespace-nowrap overflow-hidden text-ellipsis">
            {item.auctionTitle}
          </div>

          {/* 판매자 */}
          <div className="flex mt-3 text-[22px] font-semibold">
            <div className="flex items-center">판매자 :&nbsp;</div>
            <div>
              <Link
                href={`/other/${item.ownerNickname}`}
                className="text-customLightTextColor text-lg hover:underline"
              >
                <span className="text-3xl font-bold">{item.ownerNickname}</span>
              </Link>
            </div>
          </div>

          {/* 경매 시작가 */}
          <div className="text-xl mt-2">
            경매 시작가 :{" "}
            <span className="text-2xl font-bold text-customBlue">
              {item.auctionStartPrice.toLocaleString()} <span className="text-black">원</span>
            </span>
          </div>

          {/* 낙찰일시 / 낙찰가 / 채팅 및 확정 버튼*/}
          <div className="flex text-xl mt-3 mr-14 font-thin justify-between items-center">
            {item.historyDatetime && (
              <div>
                낙찰일시 :{" "}
                <span className="font-light">{item.historyDatetime.toLocaleString()}</span>
              </div>
            )}
            <div>
              낙찰가 :{" "}
              <span
                className={clsx(
                  "font-bold",
                  item.auctionHistory == "AFTER_CONFIRM" ? "text-customBlue" : "text-red-500"
                )}
              >
                {formatKoreanCurrency(item.auctionSuccessPay)}
              </span>
              &nbsp;
            </div>
            <div className="flex gap-6">
              {item.auctionHistory == "AFTER_CONFIRM" && (
                <div className="flex border-2 px-4 py-1 rounded-lg">
                  <Image width={22} height={10} src={chatImg.src} alt="chat" />{" "}
                  <Link href={`dm/${item.auctionPk}/${prodType}`}>채팅</Link>
                </div>
              )}
              <div className="border-2 px-5 py-1 rounded-lg">확정</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionBuy;
