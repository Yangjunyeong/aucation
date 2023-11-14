"use client";

import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import LikeBtn from "../../detail/components/LikeBtn";
import Link from "next/link";
import chatImg from "@/app/images/chatImg.png";
import { callApi } from "@/app/utils/api";
import formatKoreanCurrency from "../../utils/formatKoreanCurrency"
interface ItemType {
  // v 이미지,제목, 시작가, 판매자, 입찰가, 입찰날짜, 등록일, 좋아요
  imgfile: string,
  auctionTitle: string,
  auctionStartPrice: number,
  customerNickname: string,
  reAucBidDateTime: string
  registerDate: string,
  isLike: boolean
  // v 낙찰 상태 여부, 일시, 구매확정일, 낙찰가
  auctionHistory: string,
  historyDateTime?: string,
  historyDoneDateTime?: string,
  auctionSuccessPay: number,
  // 구매자
  ownerNickname: string,
  // 경매장 입장 uuid, 채팅방 상품pk
  auctionUUID: string,
  auctionPk: number,
  // x 역경매인지 아닌지 state, type
  auctionStatus: string,
  auctionType: string,
  // x 시,구,동
  mycity: string,
  zipcode: string,
  street: string,
  // x 구매자pk(사려고 만든 사람) ,소비자pk(팔려고 입찰에 참여한 사람)
  ownerPk: number,
  customerPk: number,
  // 경매 시작시간
  auctionStartDate: string,
  // 최저가
  reAucBidPrice: number,
  // 입찰 수
  reauctionCount: number,
}
interface CardProps {
  item: ItemType;
}

const ReAuctionBuy: React.FC<CardProps> = ({ item }) => {
  const [state, setState] = useState<string>("거래완료");
  const [isLiked, setIsLiked] = useState<boolean>(item.isLike);
  const [prodType, setProdType] = useState<string>("1")
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
      <div
        className={clsx(
          "flex rounded-lg overflow-hidden shadow-lg bg-white w-[1200px] h-[270px] mt-12 hover:border-black",
          item.auctionHistory == null
            ? "border-2 border-red-500"
            : item.historyDateTime !== null && item.historyDoneDateTime == null
            ? "border-2 border-blue-500"
            : "border-2 border-gray-300"
        )}
      >
        {/* 카드 이미지 */}
        {state == "거래완료" ? (
          <div>
            <div className="relative w-[300px] h-[270px]">
              <Image
                layout="fill"
                className="transition-transform transform duration-300 hover:scale-110"
                src={item.imgfile}
                alt="Building Image"
                style={{ filter: "brightness(50%)" }}
              />
              {/* 거래완료 도장 */}
              {/* <div className="absolute top-10 left-[25%]">
                    <Image width={160} height={192} src={sellfinish.src} alt="sellfinish" />
                  </div> */}
            </div>
          </div>
        ) : (
          <div>
            <div className="relative w-[300px] h-[270px]">
              <Image
                className="transition-transform transform duration-300 hover:scale-110"
                src={item.imgfile}
                layout="fill"
                alt="Building Image"
              />
              <div className="absolute top-3 right-4">
                <LikeBtn isLiked={isLiked} likeHandler={likeHandler} />
              </div>
            </div>
          </div>
        )}

        <div className="w-[900px] ml-7">
          {/* 경매 상태 / 경매 마크 /*/}
          <div className="flex justify-between mt-2.5">
            <div className="flex gap-4 font-bold text-[16px] mt-[5px] ">
              <div className="flex mt-1 text-2xl rounded-lg border-2 px-3 items-center border-gray-500">
                역경매
              </div>
              <div className="flex font-sans text-2xl items-center">
                {item.historyDateTime == null && <span className="text-red-500">경매중</span>}
                {item.historyDateTime !== null && item.historyDoneDateTime == null && <span className="text-customBlue">입찰완료</span>}
                {item.historyDoneDateTime !== null && <span>경매종료</span>}
              </div>
            </div>
            <div className="mr-16 mt-1 text-xl">
              등록일 :&nbsp;<span className="text-2xl">{new Date(item.registerDate).toLocaleString()}</span>
            </div>
          </div>
          {/* 카드 제목 */}
          <div className="text-3xl h-[36px] font-bold mt-3 mr-20 whitespace-nowrap overflow-hidden text-ellipsis">
            {item.auctionTitle}
          </div>

          {/* 시작가 */}
          {item.historyDateTime == null && (
            <div className="mt-2 text-[24px] font-semibold">
              시작가 :{" "}
              <span className="text-[28px] text-customBlue"> {formatKoreanCurrency(item.auctionStartPrice)}</span>
            </div>
          )}

          {/* 입찰완료/경매종료 - 판매자 */}
          {(item.historyDateTime !== null && item.historyDoneDateTime == null || item.historyDoneDateTime !== null) && (
            <div className="flex mt-4 text-[22px] font-semibold">
              <div className="flex items-center">판매자 :&nbsp;</div>
              <div>
              <Link
                href={`/other/${item.customerNickname}`}
                className="text-customLightTextColor text-lg hover:underline"
              >
                <span className="text-3xl font-bold">{item.customerNickname}</span>
              </Link>
              </div>
            </div>
          )}

          {/* 경매중 - 최저가 */}
          {item.historyDateTime == null && (
            <div className="text-xl mt-2  ">
              최저가 :&nbsp;
              <span className="text-2xl font-bold text-red-500">{formatKoreanCurrency(item.reAucBidPrice)}</span> 
            </div>
          )}
          {/* 입찰완료/경매종료 - 최종가 */}
          {(item.historyDateTime !== null && item.historyDoneDateTime == null || item.historyDoneDateTime !== null) && (
              <div className="text-xl mt-2">
                최종가 :&nbsp;
                <span className="text-2xl font-bold text-red-500">{formatKoreanCurrency(item.auctionSuccessPay)}</span> 
              </div>
          )}

          {/* 입찰날짜 / 삭제버튼*/}
          {item.historyDateTime == null && (
            <div className="flex justify-between mr-20">
              <div className="flex mt-2 text-2xl items-center">
                <span className="font-bold text-red-500 text-[28px] ml-2">{item.reauctionCount}</span>&nbsp;명 입찰중
              </div>
              <div className="flex gap-5">
                <span className="border-2 cursor-pointer rounded-lg border-red-500 text-red-500 text-2xl font-bold py-1 px-2">
                  삭제하기
                </span>
                <span className="border-2 cursor-pointer rounded-lg text-black border-black text-2xl font-bold py-1 px-2">
                  입찰보기
                </span>
              </div>
            </div>
          )}

          {item.historyDateTime !== null && item.historyDoneDateTime == null && (
            <div className="flex justify-end mr-20 gap-6">
              <div className="flex border-2 px-4 py-1 rounded-lg cursor-pointer">
                <Image width={22} height={10} src={chatImg.src} alt="chat" />
                <Link href={`dm/${item.auctionPk}/${prodType}`}>채팅</Link>
              </div>
              <div className="border-2 text-2xl px-5 py-1 rounded-lg">확정</div>
            </div>
          )}
          {item.historyDoneDateTime !== null && (
            <div className="flex justify-between mr-20">
              <div className="flex text-[22px] items-center text-red-500">
                확정일 :&nbsp;
                <span className="text-[28px]">{new Date(item.historyDoneDateTime!).toLocaleString()}</span>
              </div>
              <div className="flex border-2 px-4 py-1 rounded-lg cursor-pointer">
                <Image width={22} height={10} src={chatImg.src} alt="chat" />
                <Link href={`dm/${item.auctionPk}/${prodType}`}>채팅</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReAuctionBuy;
