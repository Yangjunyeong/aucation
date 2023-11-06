"use client";

import React, { useState } from "react";
import nakchalImg from "@/app/images/nakchal.png";
import chatImg from "@/app/images/chatImg.png";
import LikeBtn from "../../detail/components/LikeBtn";
import Image from "next/image";
import clsx from "clsx";
import { GoReport } from "react-icons/go";
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
  thirdCategory?: string;
}
const DiscountSell: React.FC<CardProps> = ({ item, thirdCategory }) => {
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
  const [halin, setHalin] = useState<string>("40");
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
          thirdCategory == "예약중"
            ? "border-2 border-blue-600"
            : thirdCategory == "판매중"
            ? "border-2 border-red-500"
            : ""
        )}
      >
        {/* 카드 이미지 */}
        {thirdCategory == "판매완료" ? (
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
                <Image width={160} height={192} src={nakchalImg.src} alt="dojang" />
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
            <div className="flex gap-4 font-bold text-[16px] mt-[5px] justify-center items-center">
              <div className="rounded-lg border-2 px-3  border-gray-500">할인</div>
              <div className="">{thirdCategory}</div>
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

          {/* 구매자 */}
          {(thirdCategory == "예약중" || thirdCategory == "판매완료") && (
            <div className="flex mt-2 text-[22px] font-semibold">
              <div className="flex items-center">구매자 :&nbsp;</div>
              <div>
                <Link
                  href={"/mypage"}
                  className="text-customLightTextColor text-lg hover:underline"
                >
                  <span className="text-3xl font-bold"> 한지우</span>
                </Link>
              </div>
            </div>
          )}
          {/* 가격 */}
          <div className="flex text-xl place-items-end">
            가격 :{" "}
            <div className="text-customBlue">
              <div className="flex mt-3 text-[24px] font-semibold justify-center mr-2">
                <div className="flex text-red-500">{halin}%&nbsp;</div>
              </div>
              <span className="line-through">{startPrice.toLocaleString()}</span>
            </div>
            &nbsp; {"->"} 8000원
          </div>

          {/*  / / 채팅 및 신고 버튼 */}
          <div className="flex text-xl mr-14 font-thin justify-between items-center">
            {thirdCategory === "예약중" ? (
              <div>
                예약일시 : <span className="font-light">{auctionStartTime.toLocaleString()}</span>
              </div>
            ) : thirdCategory === "판매완료" ? (
              <div>
                확정일시 : <span className="font-light">{auctionStartTime.toLocaleString()}</span>
              </div>
            ) : null}

            <div className="flex">
              {thirdCategory !== "판매중" ? (
                <div className="flex gap-4">
                  <div className="flex border-2 px-4 py-1 rounded-lg">
                    <GoReport size={22} color="#EC4747" />
                    <span className="text-red-500">신고하기</span>
                  </div>
                  <div className="flex border-2 px-4 py-1 rounded-lg">
                    <Image width={22} height={10} src={chatImg.src} alt="chat" />
                    <span className="ml-2">문의채팅</span>
                  </div>
                </div>
              ) : (
                <div className="flex cursor-pointer border-2 text-red-500 border-red-500 px-4 py-1 rounded-lg">
                  <p>삭제하기</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountSell;
