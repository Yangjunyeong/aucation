"use client";

import React, { useState } from "react";
import Image from "next/image";
import LikeBtn from "../../detail/components/LikeBtn";
import sellfinish from "@/app/images/sellfinish.png";
import { callApi } from "@/app/utils/api";
import formatKoreanCurrency from "../../utils/formatKoreanCurrency";
import { useRouter } from "next/navigation";
import { BsChatRightDots } from "react-icons/bs";
import { BiMap } from "react-icons/bi";
interface ItemType {
  // v 이미지,제목, 시작가, 판매자, 입찰가, 입찰날짜, 등록일, 좋아요
  imgfile: string;
  auctionTitle: string;
  auctionStartPrice: number;
  customerNickname: string;
  reAucBidPrice: number;
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
}

interface CardProps {
  item: ItemType;
  deleteHandler: (prodPk: number) => void;
}

const ReAuctionSell: React.FC<CardProps> = ({ item, deleteHandler }) => {
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
      <div className="flex rounded-lg overflow-hidden shadow-lg bg-white w-[1280px] h-[280px] mt-12 hover:border border-blue-400">
        {/* 카드 이미지 */}
        {item.historyDoneDateTime !== null ? (
          <div>
            <div className="relative w-[300px] h-[280px]">
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
            <div className="relative w-[300px] h-[280px]">
              <Image
                className="transition-transform transform duration-300 hover:scale-110"
                src={item.imgfile}
                alt={item.auctionTitle}
                layout="fill"
                onClick={toDetail}
              />
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
              <span className="rounded-lg border-[0.1px] px-3 items-center border-gray-500">
                역경매
              </span>
              <div className="font-sans">
                {item.historyDateTime == null && <span className="text-red-500">입찰중</span>}
                {item.historyDateTime !== null && item.historyDoneDateTime == null && (
                  <span className="text-customBlue">낙찰</span>
                )}
                {item.historyDoneDateTime !== null && <span>거래완료</span>}
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

          {/* 구매자 */}
          {/* <div className="mt-2 text-[24px] font-semibold">
            구매자 :
            <Link
                href={`/other/${item.ownerNickname}`}
                className="text-customLightTextColor text-lg hover:underline"
              >
                <span className="text-3xl font-bold">{item.ownerNickname}</span>
              </Link>
          </div> */}

          {/* 입찰가 */}
          <div className="text-[24px] h-[50px] font-medium">
            입찰가 :&nbsp;
            <span className="text-3xl font-bold text-blue-500">
              &nbsp;{formatKoreanCurrency(item.reAucBidPrice)}
            </span>{" "}
          </div>

          {/* 입찰날짜 / 삭제버튼*/}

          <div className="flex h-[45px]">
            <div className="flex text-[22px] items-center">
              {item.historyDateTime === null && (
                <div>
                  입찰 날짜 :&nbsp;
                  <span className="text-[24px]">
                    {new Date(item.reAucBidDateTime).toLocaleString()}
                  </span>
                </div>
              )}
              {item.historyDateTime !== null && item.historyDoneDateTime == null && (
                <div>
                  {" "}
                  낙찰 날짜 :&nbsp;
                  <span className="text-[24px]">
                    {new Date(item.historyDateTime!).toLocaleString()}
                  </span>
                </div>
              )}

              {item.historyDoneDateTime !== null && (
                <div>
                  낙찰 확정일 :&nbsp;
                  <span className="text-[24px]">
                    {new Date(item.historyDoneDateTime!).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center h-[55px] justify-between">
            <div className="flex">
              <BiMap size={25} />
              <span className="ml-2 text-[16px]">
                {item.mycity}&nbsp;{item.street}&nbsp;{item.zipcode}
              </span>
            </div>
            {item.historyDateTime == null && (
              <div className="flex gap-5 mb-8 ">
                <div
                  className="border-[0.1px] rounded-lg border-red-300 text-red-500 text-2xl font-bold py-1 px-3 cursor-pointer"
                  onClick={cardDelete}
                >
                  삭제하기
                </div>
                <span className="border-[0.1px] border-gray-300 cursor-pointer rounded-lg text-black text-2xl font-bold py-1 px-3">
                  입찰보기
                </span>
              </div>
            )}
            {item.historyDateTime !== null && (
              <div
                className="flex items-center border-[0.1px] rounded-lg mb-8 border-gray-300 text-black text-2xl font-bold py-1 px-3 cursor-pointer"
                onClick={toChat}
              >
                <BsChatRightDots size={22} />
                <span className="ml-2">채팅</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReAuctionSell;
