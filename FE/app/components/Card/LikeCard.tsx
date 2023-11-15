import React, { useState } from "react";
import LikeBtn from "../../detail/components/LikeBtn";
import Image from "next/image";
import sellfinish from "@/app/images/sellfinish.png";
import RowCountDown from "./RowCountDown";
import LikeCardCountDown from "./LikeCardCountDown";
import formatKoreanCurrency from "../../utils/formatKoreanCurrency";
import { BiMap } from "react-icons/bi";

interface ItemType {
  auctionStatus: string;
  auctionTitle: string;
  auctionUUID: string;
  auctionPk: number;
  ownerPk: number;
  historyStatus?: string;
  mycity: string;
  zipcode: string;
  street: string;
  likeDateTime: string;
  imgfile: string;
  auctionStartDate: string;
  auctionEndDate: string;
  auctionStartPrice: number;
}
interface LikeCardProps {
  item: ItemType;
}

const LikeCard: React.FC<LikeCardProps> = ({ item }) => {
  const [state, setState] = useState<string>("");
  const stateHandler = (state: string) => {
    setState(state);
    console.log("--------------->", state);
  };
  return (
    <div className="flex-col mt-12 rounded-lg overflow-hidden shadow-lg w-[300px] h-[500px] hover:scale-105">
      {state == "경매종료" ? (
        <div>
          <div className="relative w-[300px] h-[300px]">
            <Image
              layout="fill"
              className="transition-transform transform duration-300 hover:scale-110"
              src={item.imgfile}
              alt="Building Image"
              style={{ filter: "brightness(50%)" }}
            />
            <div className="absolute top-10 left-[23%]">
              <Image width={160} height={192} src={sellfinish.src} alt="finish" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="relative w-[300px] h-[300px]">
            <Image
              layout="fill"
              className="transition-transform transform duration-300 hover:scale-110"
              src={item.imgfile}
              alt={item.auctionTitle}
            />
          </div>
        </div>
      )}

      {/* 제목 */}
      <div className="px-6 py-1 text-[30px] line-height[5px] h-[90px]">
        <div className="line-clamp-1">{item.auctionTitle}</div>
      </div>

      {/* 가격 */}
      <div className="flex items-center px-6 h-[90px] justify-start text-[26px]">
        <span className="flex items-center text-[30px] ">
          <span className="text-[22px]">
            {item.auctionStatus == null ? "할인가" : "시작가"}&nbsp;:&nbsp;
          </span>
          {formatKoreanCurrency(item.auctionStartPrice)}
        </span>
      </div>
      {/* 카운트 다운 */}
      <div className="flex justify-end mr-4">
        <LikeCardCountDown
          auctionEndTime={item.auctionEndDate}
          auctionStartTime={item.auctionStartDate}
          stateHandler={stateHandler}
          auctionName={item.auctionStatus}
        />
      </div>
      <div className="border-t-2 border-gray-400"></div>
      <div className="flex items-center h-[55px]">
        <div className="flex items-center">
          <BiMap size={25} />
          <span className="ml-2 text-[16px]">
            {item.mycity}&nbsp;{item.street}&nbsp;{item.zipcode}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LikeCard;
