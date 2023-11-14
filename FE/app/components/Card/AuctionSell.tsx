"use client";

import React, { useState } from "react";
import sellfinish from "@/app/images/sellfinish.png"
import LikeBtn from "../../detail/components/LikeBtn";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import clsx from "clsx";
import RowCountDown from "./RowCountDown";
import Link from "next/link";
import { callApi } from "@/app/utils/api";
import formatKoreanCurrency from "../../utils/formatKoreanCurrency"
interface ItemType {
  // 이미지
  imgfile: string,
  // 좋아요 여부
  isLike:boolean;
  // 경매 상태 
  // x 경매, 역경매 여부 /BID
  auctionStatus: string,
  // 등록일
  registerDate: Date,
  // 제목
  auctionTitle: number,
  // x 판매자 닉네임
  ownerNicknname: string,
  // 시작가
  auctionStartPrice: number,
  // 경매 시작시간,종료시간
  auctionStartDate: Date,
  auctionEndDate: Date,
  // 경매장 입장
  auctionUUID: string,
  // prodPk - 채팅방
  auctionPk: number,
  // x 낙찰 여부
  // x 경매전- null / b
  // 낙찰이 되면 경매종료시점에서 내가 최고 입찰자이다? 그럼 BEFORE_CONFIRM, 구매 확정을 했을 경우 AFTER_CONFIRM
  auctionHistory: string,
  // 낙찰일시 - BEFORE_CONFIRM
  historyDateTime: Date,
  // 구매확정 일시 - 구매 확정
  historyDoneDateTime: Date,
  // 최종가
  auctionSuccessPay: number,
  // x 지역
  mycity:string,
  zipcode:string,
  street:string,
  // x 판매자 pk
  ownerPk: number,
  // x 카테고리
  auctionType: string,
  // x 구매자 닉네임
  customerNicknname: string
}

interface CardProps {
  item: ItemType
  deleteHandler: (prodPk:number) => void
}

const AuctionSell: React.FC<CardProps> = ({ item, deleteHandler}) => {
  // 경매전, 중, 완료 체크
  const [state, setState] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(item.isLike);
  // 채팅방 - 경매0 역경매1 할인2
  const [prodType, setProdType] = useState<string>("0")

  const stateHandler = (state: string) => {
    setState(state);
    console.log("--------------->", state);
  };

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
          "flex rounded-lg overflow-hidden shadow-lg bg-white w-[1280px] h-[250px] mt-12 hover:border-black",
          state == "경매종료"
            ? "border-2 border-red-500 "
            : state == "경매시작"
            ? "border-2 border-blue-600"
            : "border-2 border-gray-400 "
        )}
      >
        {/* 카드 이미지 */}
        {state == "종료" ? (
          <div>
            <div className="relative w-[300px] h-[250px]">
              <Image
                layout="fill"
                className="transition-transform transform duration-300 hover:scale-110"
                src={item.imgfile}
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
                className="transition-transform transform duration-300 hover:scale-110 overflow-hidden"
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
              <div className="flex font-sans text-2xl items-center mt-[2px]">
                {state === "경매시작" && <span className="text-customBlue">판매전</span>}
                {state === "경매종료" && <span className="text-red-500">판매중</span>}
                {state === "종료" && <span>판매종료</span>}
              </div>

              <div className="flex mt-1 text-xl rounded-full border-2 px-3 items-center border-gray-500">경매</div>
            </div>
            <div className="mr-16 text-xl">
              <RowCountDown curTime={new Date()} auctionStartTime={new Date(item.auctionStartDate)} stateHandler={stateHandler} />
            </div>
          </div>
          {/* 카드 제목 */}
          <div className="text-3xl h-[36px] font-bold mt-4 mr-20 whitespace-nowrap overflow-hidden text-ellipsis">
            {item.auctionTitle}
          </div>

          {/* 경매 시작가 */}
          <div className="mt-5 text-[24px] font-semibold">
            경매시작가 :
            <span
              className={clsx("text-4xl font-bold", state == "종료" ? "" : "text-customBlue")}
            >
              &nbsp;{formatKoreanCurrency(item.auctionStartPrice)}
            </span>
          </div>

          {/* 경매 종료일 / 삭제버튼*/}
            {state === "경매시작" && (
              <div className="flex mt-2 justify-between mr-20">
                <div className="flex text-2xl items-center">경매 등록일 :&nbsp;<span className="text-[28px]">{new Date(item.registerDate).toLocaleString()}</span></div>
                <span className="border-2 rounded-lg border-black text-black text-2xl font-bold py-2 px-2 cursor-pointer" onClick={()=>deleteHandler(item.auctionPk)}>
                  삭제하기
                </span>
              </div>
            )}
            
            {state === "경매종료" && (
              <div className="flex mt-2 justify-between mr-20">
              <div className="flex text-[22px] items-center">경매 등록일 :&nbsp;<span className="text-[28px]">{new Date(item.registerDate).toLocaleString()}</span></div>
              <span className="border-2 rounded-lg border-red-500 text-red-500 text-2xl font-bold py-2 px-4">
                <Link
                href={`/bid/${item.auctionUUID}`}>
                <span>경매장 입장</span>
                </Link>
              </span>
              </div>

            )}
            {state === "종료" && (
                <div className="flex mt-2 justify-between mr-20">
                  <div className="flex text-[22px] items-center text-red-500">경매 등록일 :&nbsp;<span className="text-[28px]">{new Date(item.registerDate).toLocaleDateString()}</span></div>
                  <div className="flex text-[22px] items-center">최종 입찰가&nbsp;&nbsp;<span className="flex mr-1 font-bold text-red-500 w-[100px] justify-end flex-nowrap overflow-hidden text-ellipsis">{item.auctionSuccessPay.toLocaleString()}</span>원</div>
                  <span className="border-2 rounded-lg border-black text-black text-2xl font-bold py-2 px-2">
                    <Link href={`dm/${item.auctionPk}/${prodType}`}>채팅</Link>
                  </span>
                </div>
            )}
          </div>
      </div>
    </>
  );
};

export default AuctionSell;
