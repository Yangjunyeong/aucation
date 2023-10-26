"use client";

import React, { useState } from "react";
import sellfinish from "@/app/images/sellfinish.png"
import LikeBtn from "./LikeBtn";
import { BsFillPersonFill } from "react-icons/bs";



interface CardProps {
  cardImgUrl: string;
  likeCount: Number;
  time: string;
  state: string;
  title: String;
  highestPrice: Number;
  isLiked: boolean;
  nickname: String;
  startPrice: Number;
  isIndividual: boolean;
}

const Card: React.FC<CardProps> = ({
  cardImgUrl,
  likeCount,
  time,
  state,
  title,
  highestPrice,
  isLiked,
  nickname,
  startPrice,
  isIndividual,
}) => {
  const [liked, setLiked] = useState<boolean>(isLiked);
  const handleLikeClicked = () => {
    setLiked(!liked);
  };

  return (
    <>
      <div className="rounded-lg overflow-hidden shadow-lg bg-white">
        {/* Image */}

        {state == "2" ? (
          <div className="relative">
            <img
              className="w-[295px] h-48 object-cover transition-transform transform duration-300 hover:scale-110"
              src={cardImgUrl}
              alt="Building Image"
              style={{ filter: 'brightness(50%)' }}
            />
            <div className="absolute top-10 left-24">
              <img src={sellfinish.src} alt="sellfinish"/>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              className="w-[295px] h-48 object-cover transition-transform transform duration-300 hover:scale-110"
              src={cardImgUrl}
              alt="Building Image"
            />
            <div className="absolute top-2 right-2" onClick={handleLikeClicked}>
              <LikeBtn isLiked={liked} />
            </div>
          </div>
        )}

        {/* stateContent */}
        <div className="p-4">
          <div className="flex justify-between mb-2">
            <div className="flex">
              <BsFillPersonFill size={18} />
              <p className="text-sm">{likeCount.toString()}명 참여중</p>
            </div>

            <div className="flex">
              <p className="text-sm">
                {state == "0" ? (
                  <span className="text-customBlue font-bold">마감</span>
                ) : state == "1" ? (
                  <span>시작</span>
                ) : (
                  <span>종료</span>
                )}{" "}
                {time.toString()} {state == "2" ? <span></span> : <span>전</span>}
              </p>
            </div>
          </div>
          <h2 className="font-extrabold text-xl mb-2">{title}</h2>
          <p className="text-xl mb-2">
            최고가 <span className="text-customBlue font-bold ml-1">{highestPrice.toString()}</span>
            원
          </p>

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
    </>
  );
};

export default Card;
