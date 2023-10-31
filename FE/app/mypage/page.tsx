"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import defaultprofile from "@/app/images/defaultprofile.png";

import clsx from "clsx";
import Input from "./components/Input";
// 카드 더미데이터
import DummyUserData from "@/app/mypage/components/DummyUserData";
import ColCard from "../components/Card/ColCard";
import AuctionSell from "../components/Card/AuctionSell";
import dummyData from "../detail/components/DummyData";
import { read } from "node:fs";

interface userData {
  profileImg: string;
  nickname: string;
  info: string;
  pk: number;
  auctionStartTime: Date;
}

const MyPage = () => {
  const [images, setImages] = useState<string>("");
  const [imgFile, setImgFile] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const [userdata, setUserdata] = useState<userData[]>([
    {
      profileImg: "",
      nickname: "사용자01",
      info: "안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다.",
      pk: 1,
      auctionStartTime: new Date("2023-11-31T14:32:30"),
    },
  ]);
  const [infoupdate, setInfoupdate] = useState<boolean>(false);
  const [nameupdate, setNameupdate] = useState<boolean>(false);
  const [info, setInfo] = useState<string>(
    " 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다."
  );
  const [username, setUsername] = useState<string>("사용자01");
  const [category, setCategory] = useState<number>(0);
  const [itemsort, setItemsort] = useState<number>(0);

  const usernameHandler = (name: string) => {
    setUsername(name);
  };
  const nameUpdateHandler = () => {
    console.log("네임 업데이트 핸들러", nameupdate);
    setNameupdate(!nameupdate);
    if (nameupdate) {
      console.log("api에 username값 post보내기", username);
    }
  };
  // const nameUpdateHandler = () =>{
  //   setUserdata(userdata )
  // }
  const infoHandler = (info: string) => {
    setInfo(info);
  };
  const infoUpdateHandler = () => {
    console.log("인포업데이트 핸들러", infoupdate);
    setInfoupdate(!infoupdate);
    if (infoupdate) {
      console.log("api에 username값 post보내기", infoupdate);
    }
  };

  const categoryHandler = (categoryNum: number) => {
    console.log(categoryNum);
    console.log("클릭");
    setCategory(categoryNum);
  };

  const itemSortHandler = (itemsortNum: number) => {
    console.log(itemsortNum, "클릭");
    setItemsort(itemsortNum);
  };

  const saveImgFile = () => {
    const file = imgRef.current!.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImgFile(images);
        setImages(images);
        // setUserdata({
        // ...userdata,
        // [0]:{
        //   ...userdata[0],
        //   profileImg: reader.result
        // }
        // })
        const updateProfileImg = [...userdata];
        updateProfileImg[0].profileImg = reader.result;
        setUserdata(updateProfileImg);
      }
    };
  };

  //카테고리 상자 클릭 시 효과

  return (
    <div className="w-full px-80 py-20">
      <div>
        <div className="border-t-2 border-gray-400"></div>
        <div className="flex">
          <label htmlFor="img_file">
            <Image
              src={userdata[0]?.profileImg || defaultprofile}
              width={300}
              height={300}
              alt="이미지 등록"
              className="hover:cursor-pointer h-[300px] w-[300px]"
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
            <div className={clsx("flex h-[60px]", nameupdate ? "hidden" : "")}>
              <div className="text-2xl ml-8 mt-[18px] font-semibold">{username}</div>
              {/* pk값 받아서 현재 유저pk와 해당 페이지 유저의 pk가 일치하지 않을경우 수정하기 불가능 */}
              <div
                className="text-2xl pt-1 mt-3 ml-2 mb-2 rounded-lg border border-gray-400 cursor-pointer"
                onClick={() => nameUpdateHandler()}
              >
                &nbsp;수정하기&nbsp;
              </div>
            </div>
            <div className={clsx("flex h-[60px]", !nameupdate ? "hidden" : "")}>
              <div className="flex mt-3">
                <Input inputHandler={usernameHandler} />
                <div
                  className="flex text-xl border px-[10px] rounded-xl text-center items-center border-gray-400 ml-2 w-[70px]"
                  onClick={() => nameUpdateHandler()}
                >
                  확인
                </div>
              </div>
            </div>

            <div className={clsx(infoupdate ? "hidden" : "")}>
              <div>
                <div className="text-xl flex-col mt-3 rounded-2xl h-[140px] max-w-[800px] border border-customGray ml-8 px-4 py-3 overflow-y-auto">
                  {info}
                </div>
              </div>
              {/* pk값 받아서 현재 유저pk와 해당 페이지 유저의 pk가 일치하지 않을경우 수정하기 불가능 */}
              <div
                className="ml-8 border py-1 px-1 text-xl border-customGray text-center mt-4 rounded-lg w-[120px] cursor-pointer"
                onClick={() => infoUpdateHandler()}
              >
                소개글 수정
              </div>
            </div>

            <div className={clsx(!infoupdate ? "hidden" : "")}>
              <div>
                <div className="text-xl flex-col mt-3 rounded-2xl h-[140px] max-w-[800px] border border-customGray ml-8 px-4 py-3 overflow-y-auto">
                  <Input inputHandler={infoHandler} />
                </div>
              </div>
              {/* pk값 받아서 현재 유저pk와 해당 페이지 유저의 pk가 일치하지 않을경우 수정하기 불가능 */}
              <div
                className="ml-8 border py-1 px-1 text-xl border-customGray text-center mt-4 rounded-lg w-[120px] cursor-pointer"
                onClick={() => infoUpdateHandler()}
              >
                수정하기
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-400 bottom-0"></div>

      {/* 박스 카테고리 클릭 효과 */}
      <div className="rounded-lg flex p-3 bg-gray-100 border border-gray-400 text-gray-700 mt-16 cursor-pointer">
        <div
          className={clsx(
            "flex items-center justify-center flex-1",
            category == 0 ? "text-blue-500" : "text-gray-700"
          )}
          onClick={() => categoryHandler(0)}
        >
          <div className="text-xl font-semibold ">매각상품</div>
        </div>
        <div
          className={clsx("flex flex-1", category == 1 ? "text-blue-500" : "text-gray-700")}
          onClick={() => categoryHandler(1)}
        >
          <div className="border-l h-20"></div>
          <div className="flex items-center justify-center flex-1">
            <p className="text-xl font-semibold ">좋아요</p>
          </div>
        </div>
        <div
          className={clsx(
            "flex flex-1",
            category == 2 ? "border-blue-500 text-blue-500" : "text-gray-700"
          )}
          onClick={() => categoryHandler(2)}
        >
          <div className="border-l h-20"></div>
          <div className="flex items-center justify-center flex-1">
            <p className="text-xl font-semibold ">낙찰상품</p>
          </div>
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
        <div className="flex text-lg font-semibold text-center cursor-pointer">
          <span
            className={clsx(itemsort == 0 ? "text-blue-500" : "")}
            onClick={() => itemSortHandler(0)}
          >
            최신순&nbsp;
          </span>
          |
          <span
            className={clsx(itemsort == 1 ? "text-blue-500" : "")}
            onClick={() => itemSortHandler(1)}
          >
            &nbsp;인기순&nbsp;
          </span>
          |
          <span
            className={clsx(itemsort == 2 ? "text-blue-500" : "")}
            onClick={() => itemSortHandler(2)}
          >
            &nbsp;저가순&nbsp;
          </span>
          |
          <span
            className={clsx(itemsort == 3 ? "text-blue-500" : "")}
            onClick={() => itemSortHandler(3)}
          >
            &nbsp;고가순
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 mt-4">
        {DummyUserData.map((item, index) => (
          <ColCard key={index} item={item} />
        ))}
      </div>
      <div>
        {dummyData.map((item, idx) => (
          <AuctionSell item={item} key={idx} />
        ))}
      </div>
    </div>
  );
};
export default MyPage;
