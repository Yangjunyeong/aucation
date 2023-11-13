"use client";

import Image from "next/image";
import BackBtn from "../../components/BackBtn";
import LikeBtn from "../../components/LikeBtn";
import profile from "@/app/images/bonobono.png";
import Link from "next/link";
import { RiAuctionLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import PriceBox from "../../components/PriceBox";
import StayMap from "../../../components/map/StayMap";

import ColCard from "@/app/components/Card/ColCard";
import { useEffect, useState } from "react";
import DetailCarousel from "../../components/DetailCarousel";
// 더미데이터 임포트
import dummyData from "../../components/DummyData";
import imageDataList from "../../components/DummyImg";
import { useParams, useRouter } from "next/navigation";
// API 요청
import { callApi } from "@/app/utils/api";
// 타이머
import CountDown from "@/app/components/Card/ColCountDown";
import MoonLoader from "react-spinners/MoonLoader";

const AuctionDetail = () => {
  const [dataList, setDataList] = useState<any>();
  const [state, setState] = useState<string>();
  const router = useRouter();
  const startingPrice = "10,000";
  const highestPrice = "50,000";
  const bidUnit = "1,000";
  const auctionPk = useParams().slug;
  // 좋아요
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  // 스테이트 핸들러
  const stateHandler = (value: string) => {
    setState(value);
  };

  // 로딩
  const [loading, setLoading] = useState(true);

  //좋아요 토글
  const likeHandler = (newLikeStatus: boolean) => {
    setIsLiked(newLikeStatus); // 옵티미스틱 업데이트
    setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - 1); // 좋아요 수 변경

    callApi("get", `auction/like/${auctionPk}/`)
      .then(response => {
        console.log("좋아요 성공", response);
      })
      .catch(error => {
        console.log("좋아요 실패", error);
      });
  };

  useEffect(() => {
    callApi("get", `auction/${auctionPk}`)
      .then(res => {
        setDataList(res.data);
        setIsLiked(res.data.isLike);
        setLikeCount(res.data.likeCnt)
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        router.push("/");
      });
  }, [auctionPk]);

  if (dataList) {
    return (
      <div className="w-full  px-80 py-20" style={{ backgroundColor: "var(--c-white)" }}>
        {/* 좋아요 버튼 및 뒤로가기 버튼 */}
        <div className="flex justify-between">
          <BackBtn />
            <div className="flex items-center">
              <LikeBtn isLiked={isLiked} likeHandler={likeHandler} />
            <span className="ml-1">{likeCount}</span>
          </div>
        </div>

        {/* 페이지 상단 타이틀 */}
        <div className="mt-10">
          <p>{}</p>
          <h2 className="text-4xl font-bold">{dataList.auctionTitle}</h2>
          {dataList.auctionType}
        </div>
        {/* 경매자 프로필 및 경매참여 인원, 경매까지 시간 */}
        <div className="flex mt-10">
          <Image
            alt="profile"
            width={20}
            height={20}
            className="w-20 h-20 rounded-full"
            src={dataList.auctionOwnerPhoto}
          />

          <div className="ml-4 flex flex-col justify-center flex-1">
            <div>
              <h3 className="text-1xl font-thin text-black mb-1">
                {dataList.auctionOwnerMemberRole == "SHOP" ? "소상공인" : "개인"}
              </h3>
            </div>
            <div>
              <Link
              href={`/mypage/${dataList.auctionOwnerNickname}`}>
                <h2 className="text-2xl font-bold">{dataList.auctionOwnerNickname}</h2>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-end items-end">
            {/* 참여중인 인원수 */}
            <div className="flex w-[120px] items-end">
              <BsFillPersonFill size={30} />
              <span className="ml-2">{dataList?.auctionCurCnt}</span>
            </div>
            <div className="mr-7 flex items-end">
            <h3 className="flex text-1xl font-thin "><CountDown stateHandler={stateHandler} currentTime={new Date(dataList.nowTime)} auctionStartTime={new Date(dataList.auctionStartTime)}/></h3>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-gray-400 mt-10"></div>

        {/* 상품 이미지 및 지도 */}
        <div className="flex flex-row mt-5">
          <div className="flex flex-1 flex-col">
            <h2 className="text-2xl text-left mb-5">상품사진</h2>
            <DetailCarousel imglist={dataList.auctionPhoto} />
          </div>
          <div className="flex flex-1 flex-col">
            <h2 className="text-2xl text-left mb-5">거래 위치(협의가능)</h2>
            <StayMap inputLag={dataList.auctionMeetingLng} inputLat={dataList.auctionMeetingLat} />
          </div>
        </div>

        {/* 가격 버튼 */}
        <PriceBox
          startingPrice={dataList.auctionStartPrice}
          highestPrice={dataList.auctionTopPrice}
          bidUnit={dataList.auctionAskPrice}
        />

        {/* 입찰버튼 */}
        <div
          className="fixed bottom-4 right-4 rounded-lg text-white flex items-center gap-2 p-6 shadow-2xl shadow-black text-[22px] mr-64 mb-8 z-50"
          style={{
            backgroundColor: "var(--c-blue)",
          }}
        >
          <RiAuctionLine size={32} color="#ffffff" />
          <Link
          href={`/bid/${dataList.auctionUuid}`}
          >
            <p className="text-2">입찰하러 가기</p>
          </Link>
        </div>

        {/* 상품소개 */}
        <div className="mt-40">
          <h2 className="text-3xl font-bold">상품소개</h2>
          <div className="rounded-lg flex flex-row items-center p-6 bg-gray-100 border border-gray-400 mt-6">
            <h2 className="text-1xl font-sans">{dataList.auctionInfo}</h2>
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
              <ColCard item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
  }
};
export default AuctionDetail;
