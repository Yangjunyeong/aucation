"use client";

import React, { useState } from "react";
import sellfinish from "@/app/images/sellfinish.png";
import LikeBtn from "../../detail/components/LikeBtn";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import clsx from "clsx";
import RowCountDown from "./RowCountDown";

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
}
const Card: React.FC<CardProps> = ({ item }) => {
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
  const likeHandler = (value:boolean) => {
    console.log(liked);
    setLiked(value)
  };

  const stateHandler = (state: string) => {
    setState(state);
    console.log("--------------->", state);
  };

  return (
    <>
      <div className="rounded-lg overflow-hidden shadow-lg bg-white w-[1200px] h-[300px]">
        {/* Image */}

        {state == "종료" ? (
          <div>
            <div className="relative">
              <Image
                width={300}
                height={300}
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
            <div className="relative">
              <Image
                width={300}
                height={300}
                className=" object-cover transition-transform transform duration-300 hover:scale-110"
                src={cardImgUrl}
                alt="Building Image"
              />
              <div className="absolute top-2 right-2">
                <LikeBtn isLiked={liked} likeHandler={likeHandler}/>
              </div>
            </div>
          </div>
        )}

        {/* stateContent */}
        <div>
          <div className="p-4">
            <div className="flex justify-between mb-2">
              <div className="flex">
                <RowCountDown auctionStartTime={item.auctionStartTime} stateHandler={stateHandler} />
              </div>
            </div>
            <h2 className="font-extrabold text-xl mb-2">{title}</h2>

            {state == "0" ? (
              <p className="text-xl mb-2">
                시작가{" "}
                <span className="text-customBlue font-bold ml-1">{startPrice.toString()}</span>원
              </p>
            ) : (
              <p className="text-xl mb-2">
                최고가{" "}
                <span className="text-customBlue font-bold ml-1">{highestPrice.toString()}</span>원
              </p>
            )}

            <div className="flex flex-auto">
              <div className="bg-customBgLightBlue flex py-3 rounded-2xl">
                <div className="bg-customBgBlue text-white font-bold rounded-xl ml-2 py-1 px-2">
                  {isIndividual ? "개인" : "소상공인"}
                </div>
                <div className="flex ml-2 font-semibold place-items-center mr-3">{nickname}</div>
              </div>
            </div>

            <p className="text-sm font-light mt-2">{startPrice.toString()}원부터 시작</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
