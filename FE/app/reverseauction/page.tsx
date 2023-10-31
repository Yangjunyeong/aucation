"use client";

import Image from "next/image";
import BackBtn from "./components/BackBtn";
import LikeBtn from "./components/LikeBtn";
import profile from "@/app/images/bonobono.png";
import cell from "@/app/images/sell.png";
import map from "@/app/images/map.png";
import { RiAuctionLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import PriceBox from "./components/PriceBox";
import KakaoMap from "@/app/map/page";

import productimg from "@/app/images/productimg.png";
import Card from "@/app/components/Card";
import { useState } from "react";

// 더미데이터 임포트
import dummyData from "./components/DummyData";

const AuctionDetail = () => {
  const startingPrice = "10,000";
  const highestPrice = "50,000";
  const bidUnit = "1,000";

  const [isLiked, setIsLiked] = useState<boolean>(false);
  //좋아요 토글
  const handleLikeClicked = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full  px-80 py-20" style={{ backgroundColor: "var(--c-white)" }}>
      {/* 좋아요 버튼 및 뒤로가기 버튼 */}
      <div className="flex justify-between">
        <BackBtn />
        <div onClick={handleLikeClicked}>
          <LikeBtn isLiked={isLiked} />
        </div>
      </div>

      {/* 페이지 상단 타이틀 */}
      <div className="mt-10">
        <h2 className="text-4xl font-bold">
          반포자이 내놓습니다람쥐람쥐썬더는아름다워어쩌구저쩌구
        </h2>
        {/* {data ? <h1>{data.title}</h1> : <p>Loading...</p>} */}
      </div>

      {/* 경매자 프로필 및 경매참여 인원, 경매까지 시간 */}
      <div className="flex mt-10">
        <Image alt="profile" className="w-20 h-20 rounded-full" src={profile} />

        <div className="ml-4 flex flex-col justify-center flex-1">
          <div>
            <h3 className="text-1xl font-thin mb-1">소상공인</h3>
          </div>
          <div>
            <h2 className="text-2xl font-bold">인형뽑기가게사장</h2>
          </div>
        </div>
        <div className="flex-1 flex justify-end items-end">
          <div className="mr-7 flex">
            <BsFillPersonFill size={25} />
            1234명 참여중
          </div>
          <h3 className="text-1xl font-thin ">경매 시작까지 31분 남음</h3>
        </div>
      </div>
      <div className="border-t-2 border-gray-400 mt-10"></div>

      {/* 상품 이미지 및 지도 */}
      <div className="flex flex-row mt-5">
        <div className="flex flex-1 flex-col">
          <h2 className="text-2xl text-left mb-5 ">상품사진</h2>
          <Image
            alt="cell"
            className="rounded-xl object-cover relative, w-[600px] h-[500px]"
            src={cell}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h2 className="text-2xl text-left mb-5">거래 위치(협의가능)</h2>
          {/* <Image alt="map" className="rounded-2" src={map} style={{ position: 'relative', width: '600px', height: '500px' }}/> */}
          <KakaoMap />
        </div>
      </div>

      {/* 가격 버튼 */}
      <PriceBox startingPrice={startingPrice} highestPrice={highestPrice} bidUnit={bidUnit} />

      {/* 입찰버튼 */}
      <div
        className="fixed bottom-4 right-4 rounded-lg text-white flex items-center gap-2 p-6 shadow-2xl shadow-black text-[22px] mr-64 mb-8 z-50"
        style={{
          backgroundColor: "var(--c-blue)",
        }}
      >
        <RiAuctionLine size={32} color="#ffffff" />
        <p className="text-2">입찰하러 가기</p>
      </div>

      {/* 상품소개 */}
      <div className="mt-40">
        <h2 className="text-3xl font-bold">상품소개</h2>
        <div className="rounded-lg flex flex-row items-center p-6 bg-gray-100 border border-gray-400 mt-6">
          <h2 className="text-1xl font-sans">
            깨끗하게 썼고 하자 없음. 많은 참여 부탁드려요, 교환 환불 안돼요
          </h2>
        </div>
      </div>

      {/* 경매중인 상품 */}
      <div className="mt-16">
        <div className="mb-3">
          <span className="text-2xl font-bold">사용자01</span>{" "}
          <span className="text-2xl font-sans">님의 경매중인 상품</span>
        </div>
        <div className="flex flex-wrap gap-8">
          {dummyData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
