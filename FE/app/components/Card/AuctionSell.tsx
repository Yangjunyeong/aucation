"use client";

import React, { useState } from "react";
import sellfinish from "@/app/images/sellfinish.png";
import LikeBtn from "../../detail/components/LikeBtn";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import clsx from "clsx";
import RowCountDown from "./RowCountDown";
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
  likeHandler:(pk:number,isLiked:boolean) => void;
}
const AuctionSell: React.FC<CardProps> = ({ item,likeHandler }) => {
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
  const [nakchal, setNakchal] = useState<string>("낙찰")
  const [prodPk, setProdPk] = useState<any>(106)
  const [prodType, setProdType] = useState<any>(1)

  const stateHandler = (state: string) => {
    setState(state);
    console.log("--------------->", state);
  };

  const clickHandler = () => {
  }
  return (
    <>
      <div
        className={clsx(
          "flex rounded-lg overflow-hidden shadow-lg bg-white w-[1200px] h-[250px] mt-12 transition-transform transform duration-300 hover:scale-110",
          state == "경매종료"
            ? "border-2 border-red-500"
            : state == "경매시작"
            ? "border-2 border-blue-600"
            : ""
        )}
      >
        {/* 카드 이미지 */}
        {state == "종료" ? (
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
              <div className="absolute top-10 left-[25%]">
                <Image width={160} height={192} src={sellfinish.src} alt="sellfinish" />
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
                <LikeBtn isLiked={liked} likeHandler={()=>likeHandler} />
              </div>
            </div>
          </div>
        )}
        <div className="w-[900px] ml-7">
          {/* 경매 상태 / 경매 마크 / 남은 시간 카운트*/}
          <div className="flex justify-between mt-3">
            <div className="flex gap-4 font-bold text-[16px] mt-[5px] ">
              <div className="flex font-sans text-2xl items-center mt-[2px]">
                {state === "경매시작" && <span className="text-customBlue">경매전</span>}
                {state === "경매종료" && <span className="text-red-500">경매중</span>}
                {state === "종료" && <span>경매완료</span>}
              </div>

              <div className="flex mt-1 text-xl rounded-full border-2 px-3 items-center border-gray-500">경매</div>
            </div>
            <div className="mr-16 text-xl">
              <RowCountDown auctionStartTime={item.auctionStartTime} stateHandler={stateHandler} />
            </div>
          </div>
          {/* 카드 제목 */}
          <div className="text-3xl h-[36px] font-bold mt-4 mr-20 whitespace-nowrap overflow-hidden text-ellipsis">
            피츄카 팔아요 제발 사주세요 사주세요피츄카 팔아요 제발 사주세요 사주세요피츄카 팔아요
            제발 사주세요 사주세요피츄카 팔아요 제발 사
          </div>

          {/* 경매 시작가 */}
          <div className="mt-5 text-[24px] font-semibold">
            경매시작가 :
            <span
              className={clsx("text-4xl font-bold", state == "종료" ? "" : "text-customBlue")}
            >
              &nbsp;{startPrice.toLocaleString()} <span className="text-black">원</span>
            </span>
          </div>

          {/* 경매 종료일 / 삭제버튼*/}
            {state === "경매시작" && (
              <div className="flex mt-2 justify-between mr-20">
                <div className="flex text-2xl items-center">경매 등록일 :&nbsp;<span className="text-[28px]">{auctionStartTime.toLocaleString()}</span></div>
                <span className="border-2 rounded-lg border-black text-black text-2xl font-bold py-2 px-2">
                  삭제하기
                </span>
              </div>
            )}
            
            {state === "경매종료" && (
              <div className="flex mt-2 justify-between mr-20">
              <div className="flex text-[22px] items-center">경매 등록일 :&nbsp;<span className="text-[28px]">{auctionStartTime.toLocaleString()}</span></div>
              <span className="border-2 rounded-lg border-red-500 text-red-500 text-2xl font-bold py-2 px-4">
                경매장 입장
              </span>
              </div>

            )}
            {state === "종료" && (
                <div className="flex mt-2 justify-between mr-20">
                  <div className="flex text-[22px] items-center text-red-500">경매 등록일 :&nbsp;<span className="text-[28px]">{auctionStartTime.toLocaleString()}</span></div>
                  <div className="flex text-[22px] items-center">최종 입찰가&nbsp;&nbsp;<span className="font-bold text-red-500 w-[100px] flex-nowrap overflow-hidden text-ellipsis">{highestPrice.toLocaleString()}</span>원</div>
                  <span className="border-2 rounded-lg border-black text-black text-2xl font-bold py-2 px-2">
                    <Link href={`dm/${prodPk}/${prodType}`}>채팅</Link>
                  </span>
                </div>
            )}
          </div>
      </div>
    </>
  );
};

export default AuctionSell;
