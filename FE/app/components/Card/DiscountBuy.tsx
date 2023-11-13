"use client";

import React, { useState } from "react";
import nakchalImg from "@/app/images/nakchal.png";
import chatImg from "@/app/images/chatImg.png";
import LikeBtn from "../../detail/components/LikeBtn";
import Image from "next/image";
import clsx from "clsx";
import { callApi } from "@/app/utils/api";
import formatKoreanCurrency from "../../utils/formatKoreanCurrency"
import Link from "next/link";

interface ItemType {
  // 이미지, 등록일 x, 제목 x, 정가, 할인가, 좋아요
  imgfile: string,
  discountPrice: number,
  discountDiscountedPrice:number,
  isLike: boolean,
  // 구매자
  customerNickname: string
  // x 마감시간
  discountEnd: string,
  // 제품 uuid, pk
  discountUUID: string,
  discountPk: number,
  // 낙찰 상태, 일시, 확정일
  historyStatus: string,
  historyDatetime: string,
  historyDoneDatetime: string,
  // 유저pk, 소상공인pk
  discountCustomerPk: number,
  discountOwnerPk: number,
  // x 시,구,동
  mycity: string,
  zipcode: string,
  street: string,
}

interface CardProps {
  item: ItemType;
}
const DiscountBuy: React.FC<CardProps> = ({ item }) => {
  const [isLiked, setIsLiked] = useState<boolean>(item.isLike);
  const [prodType, setProdType] = useState<string>("2")
  const likeHandler = (newLikeStatus: boolean) => {
    setIsLiked(newLikeStatus); // 옵티미스틱 업데이트

    callApi("get", `/discount/like/${item.discountPk}`)
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
          "flex rounded-lg overflow-hidden shadow-lg bg-white w-[1200px] h-[280px] mt-12 hover:border-black",
          item.historyStatus == "BEFORE_CONFIRM" ? "border-2 border-blue-300" :  "border-2 border-gray-300"
        )}
      >
        {/* 카드 이미지 */}
        {item.historyStatus == "AFTER_CONFIRM" ? (
          <div>
            <div className="relative w-[300px] h-[280px]">
              <Image
                layout="fill"
                className="transition-transform transform duration-300 hover:scale-110"
                src={item.imgfile}
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
            <div className="relative w-[300px] h-[280px]">
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
          {/* 경매 상태 / 경매 마크 / 남은 시간 카운트*/}
          <div className="flex justify-between mt-3">
            <div className="flex gap-4 font-bold text-[16px] mt-[5px] ">
              <div className="rounded-full border-2 px-3  border-gray-500">경매</div>
              <div
                className={clsx(
                  "rounded-full border-2 px-3",
                  item.historyStatus == "BEFORE_CONFIRM"
                    ? "border-blue-500 text-customBlue" 
                    : "border-red-500 text-red-500"
                )}
              >
                {item.historyStatus == "BEFORE_CONFIRM" ? "예약중" : "구매완료"}
              </div>
            </div>
            <div className="mr-16 text-xl">
              <span className="font-bold">등록일 :&nbsp;&nbsp;</span>
              {/* {auctionStartTime.toLocaleString()} */}
            </div>
          </div>
          {/* 카드 제목 */}
          <div className="text-3xl h-[36px] font-bold mt-4 mr-20 whitespace-nowrap overflow-hidden text-ellipsis">
            {/* 제목 */}
          </div>

          {/* 판매자 */}
          <div className="flex mt-3 text-[22px] font-semibold">
            <div className="flex items-center">판매자 :&nbsp;</div>
            <div>
            {/* <Link
                href={`/other/${item.}`}
                className="text-customLightTextColor text-lg hover:underline"
              >
                <span className="text-3xl font-bold">{item.}</span>
              </Link> */}
            </div>
          </div>

           {/* 가격 */}
           <div className="flex text-xl place-items-end">
            가격 :{" "}
            <div className="text-black">
              <div className="flex mt-3 text-[24px] font-semibold justify-center mr-2">
                <div className="flex text-red-500">&nbsp;{}%&nbsp;</div>
              </div>
              <span className="ml-2 line-through">{formatKoreanCurrency(item.discountPrice).toLocaleString()}</span>
            </div>
            &nbsp; {"->"} <span className="text-2xl font-bold">&nbsp;{formatKoreanCurrency(item.discountDiscountedPrice)}</span>
          </div>


          {/* 낙찰일시 / 낙찰가 / 채팅 및 확정 버튼*/}
          <div className="flex text-xl mt-3 mr-14 font-thin justify-between items-center">
            <div>{item.historyStatus == "BEFORE_CONFIRM" ? "예약일" : "구매일시"} : 
              <span className="font-light">{new Date(item.historyDatetime).toLocaleString()}</span>
            </div>
            <div className="flex gap-6">
              <div className="flex border-2 px-4 py-1 rounded-lg">
                <Image width={22} height={10} src={chatImg.src} alt="chat" />
                <Link href={`dm/${item.discountPk}/${prodType}`}>채팅</Link>
                </div>
              {item.historyStatus == "BEFORE_CONFIRM" && <div className="border-2 px-5 py-1 rounded-lg">확정</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountBuy;
