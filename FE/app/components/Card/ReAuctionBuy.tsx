"use client";

import React, { useState } from "react";
import Image from "next/image";
import LikeBtn from "../../detail/components/LikeBtn";
import { callApi } from "@/app/utils/api";
import formatKoreanCurrency from "../../utils/formatKoreanCurrency";
import { useRouter } from "next/navigation";
import sellfinish from "@/app/images/sellfinish.png";
import { BsChatRightDots } from "react-icons/bs";
import { BiMap } from "react-icons/bi";
interface ItemType {
  // v 이미지,제목, 시작가, 판매자, 입찰가, 입찰날짜, 등록일, 좋아요
  imgfile: string;
  auctionTitle: string;
  auctionStartPrice: number;
  customerNickname: string;
  reAucBidDateTime: string;
  registerDate: string;
  isLike: boolean;
  // v 낙찰 상태 여부, 일시, 구매확정일, 낙찰가
  auctionHistory: string;
  historyDateTime?: string;
  historyDoneDateTime?: string;
  auctionSuccessPay: number;
  // 구매자
  ownerNickname: string;
  // 경매장 입장 uuid, 채팅방 상품pk
  auctionUUID: string;
  auctionPk: number;
  // x 역경매인지 아닌지 state, type
  auctionStatus: string;
  auctionType: string;
  // x 시,구,동
  mycity: string;
  zipcode: string;
  street: string;
  // x 구매자pk(사려고 만든 사람) ,소비자pk(팔려고 입찰에 참여한 사람)
  ownerPk: number;
  customerPk: number;
  // 경매 시작시간
  auctionStartDate: string;
  // 최저가
  reAucBidPrice: number;
  // 입찰 수
  reauctionCount: number;
}
interface CardProps {
  item: ItemType;
  deleteHandler: (prodPk: number) => void;
}

const ReAuctionBuy: React.FC<CardProps> = ({ item, deleteHandler }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState<boolean>(item.isLike);
  const [prodType, setProdType] = useState<string>("1");
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
  const toDetail = () => {
    router.push(`reverseauction/${item.auctionPk}`);
  };

  const toChat = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`dm/${item.auctionPk}/${prodType}`);
  };

  const cardDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    deleteHandler(item.auctionPk);
  };
  return (
    <>
      <div className="flex rounded-lg overflow-hidden shadow-lg bg-white w-[1280px] h-[300px] mt-12 hover:border border-blue-400">
        {/* 카드 이미지 */}
        {item.historyDoneDateTime !== null ? (
          <div>
            <div className="relative w-[300px] h-[300px]">
              <Image
                layout="fill"
                alt={item.auctionTitle}
                className="transition-transform transform duration-300 hover:scale-110"
                src={item.imgfile}
                onClick={toDetail}
                style={{ filter: "brightness(50%)" }}
              />
              {/* 거래완료 도장 */}
              <div className="absolute top-10 left-[25%]">
                <Image width={160} height={192} src={sellfinish.src} alt="sellfinish" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative w-[300px] h-[300px]">
              {item.historyDateTime == null && (
                <Image
                  layout="fill"
                  alt={item.auctionTitle}
                  className="transition-transform transform duration-300 hover:scale-110"
                  src={item.imgfile}
                  onClick={toDetail}
                />
              )}
              {item.historyDateTime !== null && item.historyDoneDateTime == null && (
                <Image
                  layout="fill"
                  alt={item.auctionTitle}
                  className="transition-transform transform duration-300 hover:scale-110"
                  src={item.imgfile}
                  onClick={toDetail}
                  style={{ filter: "brightness(50%)" }}
                />
              )}
              <div className="absolute top-3 right-4">
                <LikeBtn isLiked={isLiked} likeHandler={likeHandler} />
              </div>
            </div>
          </div>
        )}

        <div className="w-[900px] ml-7" onClick={toDetail}>
          {/* 경매 상태 / 경매 마크 /*/}
          <div className="flex h-[60px] justify-between items-center">
            <div className="flex text-[22px] gap-4 font-bold">
              <div className="rounded-lg border-[0.1px] px-3 items-center border-gray-500">
                역경매
              </div>
              <div className="font-sans">
                {item.historyDateTime == null && <span className="text-red-500">경매중</span>}
                {item.historyDateTime !== null && item.historyDoneDateTime == null && (
                  <span className="text-customBlue">입찰완료</span>
                )}
                {item.historyDoneDateTime !== null && <span>경매종료</span>}
              </div>
            </div>
            <div className="text-xl">
              등록일 :&nbsp;{new Date(item.registerDate).toLocaleString()}
            </div>
          </div>
          {/* 카드 제목 */}
          <div className="text-5xl h-[70px] font-bold mr-20 whitespace-nowrap overflow-hidden text-ellipsis">
            {item.auctionTitle}
          </div>

          {/* 시작가/ 입찰완료, 경매종료도 시작가 출력 */}
          {/* {item.historyDateTime == null && ( */}
          <div className="text-[22px] h-[37.5px]">
            시작가 :{" "}
            <span className="text-[25px] font-bold text-blue-500">
              {" "}
              {formatKoreanCurrency(item.auctionStartPrice)}
            </span>
          </div>
          {/* )} */}

          {/* 입찰완료/경매종료 - 판매자 */}
          {/* {((item.historyDateTime !== null && item.historyDoneDateTime == null) ||
            item.historyDoneDateTime !== null) && (
            <div className="flex h-[45px]">
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
          )} */}

          {/* 경매중 - 최저가 */}
          {item.historyDateTime == null && (
            <div className="text-[22px] h-[37.5px] font-medium">
              최저가 :&nbsp;
              <span className="text-3xl font-bold text-red-500">
                {formatKoreanCurrency(item.reAucBidPrice)}
              </span>
            </div>
          )}
          {/* 입찰완료/경매종료 - 최종가 */}
          {((item.historyDateTime !== null && item.historyDoneDateTime == null) ||
            item.historyDoneDateTime !== null) && (
            <div className="text-xl">
              최종가 :&nbsp;
              <span className="text-3xl font-bold text-red-500">
                {formatKoreanCurrency(item.auctionSuccessPay)}
              </span>
            </div>
          )}
          {/*               <div className="flex text-[22px] items-center text-red-500">
                  확정일 :&nbsp;
                  <span className="text-[28px]">
                    {new Date(item.historyDoneDateTime!).toLocaleString()}
                  </span>
                </div> */}
          {/* 입찰날짜, 입찰완료, 경매종료도 출력*/}
          {/* {item.historyDateTime == null && ( */}
          <div className="flex h-[40px]">
            <div className="flex text-[22px] items-center">
              <span className="font-bold text-red-500 text-[25px]">{item.reauctionCount}&nbsp;</span>
              {item.historyDateTime == null ? "명 입찰중" : "명 참여"}
            </div>
          </div>
          {/* )} */}

          <div className="flex items-center h-[55px] justify-between">
            <div className="flex">
              <BiMap size={25} />
              <span className="ml-2 text-[16px]">
                {item.mycity}&nbsp;{item.street}&nbsp;{item.zipcode}
              </span>
            </div>
            {/* 경매중 */}
            {item.historyDateTime == null && (
              <div className="flex gap-5 mb-8">
                <span
                  className="border-[0.1px] rounded-lg border-red-300 text-red-500 text-2xl font-bold py-1 px-3 cursor-pointer"
                  onClick={cardDelete}
                >
                  삭제하기
                </span>
                <span className="border-[0.1px] border-gray-300 cursor-pointer rounded-lg text-black text-2xl font-bold py-1 px-3">
                  입찰보기
                </span>
              </div>
            )}
            {/* 입찰완료 */}
            {item.historyDateTime !== null && item.historyDoneDateTime == null && (
              <div className="flex gap-5 mb-8">
                <div
                  className="flex items-center border-[0.1px] rounded-lg mb-8 border-gray-300 text-black text-2xl font-bold py-1 px-3 cursor-pointer"
                  onClick={toChat}
                >
                  <BsChatRightDots size={22} />
                  <span className="ml-2">채팅</span>
                </div>
                <div className="border-2 px-3 mb-8 py-1 text-2xl rounded-lg">확정</div>
              </div>
            )}
            {/* 경매종료 */}
            {item.historyDoneDateTime !== null && (
              <div className="flex gap-5 mb-8">
                <div
                  className="flex items-center border-[0.1px] rounded-lg mb-8 border-gray-300 text-black text-2xl font-bold py-1 px-3 cursor-pointer"
                  onClick={toChat}
                >
                  <BsChatRightDots size={22} />
                  <span className="ml-2">채팅</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReAuctionBuy;
