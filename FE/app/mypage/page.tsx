"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import defaultprofile from "@/app/images/defaultprofile.png";
import MoveMap from "@/app/components/map/MoveMap";
import StayMap from "../components/map/StayMap";

// 카드 더미데이터
import DummyUserData from "@/app/mypage/components/DummyUserData";
import Card from "../components/Card";

interface userData {
  nickname: string;
  pk: number;
}

const MyPage = () => {
  const [images, setImages] = useState<string>("");
  const [imgFile, setImgFile] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<userData[]>([]);
  const saveImgFile = () => {
    const file = imgRef.current!.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImgFile(images);
        setImages(images);
      }
    };
  };
  //카테고리 상자 클릭 시 효과

  return (
    <div className="w-full  px-80 py-20">
      <div>
        마이페이지
        <div className="border-t-2 border-gray-400"></div>
        <div className="flex">
          <label htmlFor="img_file">
            <Image
              src={defaultprofile}
              width="300"
              height="300"
              alt="이미지 등록"
              className="hover:cursor-pointer"
            />
            <input
              type="file"
              id="img_file"
              accept="image/jpg, image/png, image/jpeg"
              onChange={saveImgFile}
              ref={imgRef}
              hidden
            />
          </label>
          <div className="flex-col">
            <div className="flex">
              <div className="text-xl ml-8 mt-4 ">사용자01</div>
              {/* 버튼 누르면 인풋창 및 확인버튼 출현 */}
              <div className="text-xl py-1  mt-3 ml-2 rounded-lg border border-gray-400">
                &nbsp;수정하기&nbsp;
              </div>
            </div>
            <div>
              <div className="text-xl mt-3 rounded-2xl h-[140px] max-w-[800px] border border-customGray ml-8 px-4 py-3 overflow-y-auto">
                안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다.
                안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다.
                안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다.
                안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다.
              </div>
            </div>
            {/* 버튼 누르면 인풋창 및 확인버튼 출현 */}
            <div className="ml-8 border border-customGray text-center mt-4 rounded-lg font-thin w-28">
              소개글 수정
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-400 bottom-0"></div>

      {/* 박스 카테고리 클릭 효과 */}
      <div className="rounded-lg flex flex-row items-center p-3 bg-gray-100 border border-gray-400 mt-16">
        <div className="flex flex-col items-center flex-1">
          <p className="text-xl font-semibold text-gray-700">매각상품</p>
        </div>
        <div className="border-l border-gray-400 h-20"></div>
        <div className="flex flex-col items-center flex-1">
          <p className="text-xl font-semibold text-blue-500">좋아요</p>
        </div>
        <div className="border-l border-gray-400 h-20"></div>
        <div className="flex flex-col items-center flex-1">
          <p className="text-xl font-semibold text-gray-700">낙찰상품</p>
        </div>
      </div>
      <div className="flex">
        <h2 className="font-semibold text-3xl mt-20">경매상품</h2>
        {/* 상품개수 바인딩 */}
        <h2 className="text-red-600 mt-[75px] text-4xl font-bold ml-2">{DummyUserData.length}</h2>
      </div>
      <div className="border-t-2 border-gray-400 bottom-0 mt-10"></div>

      {/* 작성자pk와 사용자pk가 동일할 경우 좋아요 버튼 출력안되게 해야함*/}
      <div className="flex justify-between mt-16">
        <div>
          <span className="font-semibold text-3xl">전체</span>
          <span className="font-bold text-3xl mt-16 ml-2 text-myPageGray">
            {DummyUserData.length}개
          </span>
        </div>
        <div className="flex text-lg font-semibold text-center">
          <span>최신순&nbsp;</span>| 
          <span>&nbsp;인기순&nbsp;</span>|
          <span>&nbsp;저가순&nbsp;</span>|
          <span>&nbsp;고가순</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 mt-4">
        {DummyUserData.map((item, index) => (
          <Card
            key={index}
            cardImgUrl={item.cardImgUrl}
            likeCount={item.likeCount}
            time={item.time}
            state={item.state}
            title={item.title}
            highestPrice={item.highestPrice}
            isLiked={item.isLiked}
            nickname={item.nickname}
            startPrice={item.startPrice}
            isIndividual={item.isIndividual}
          />
        ))}
      </div>
    </div>
  );
};
export default MyPage;
