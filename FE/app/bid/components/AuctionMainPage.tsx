import Image from "next/image";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineHeart } from "react-icons/ai";
import { RiUserFill, RiTimerFlashLine } from "react-icons/ri";
import { FaRegHandPaper } from "react-icons/fa";
import productimg from "@/app/images/productimg.png";
import dojang from "@/app/images/dojang.png";

const AuctionMainPage = () => {
  const [heart, setHeart] = useState(0);
  const [userCount, setUserCount] = useState(12645);
  const [auctionTime, setAuctionTime] = useState("00:30:47");
  const [price, setPrice] = useState("1234억 5678만 9101원");
  return (
    <div
      className="
        mr-5
        w-[80%]
        ml-6
    "
    >
      <div
        className="
            flex
            justify-between
            pt-6
            px-6
            h-10
            items-center
        "
      >
        <AiOutlineArrowLeft size="40"></AiOutlineArrowLeft>
        <div
          className="
            flex
            justify-center
            items-center
          "
        >
          <AiOutlineHeart size="36" color="red" className="mx-3"></AiOutlineHeart>
          <p>{heart}</p>
        </div>
      </div>
      <div
        className="
            flex
            justify-between
            items-end
            mt-6
            mb-3
        "
      >
        {/* <h1
          style={{ color: "var(--c-sky)" }}
          className="
                text-3xl
                font-bold
                mx-6
            "
        >
          NOW AUCTIONING🔥
        </h1> */}
        <h1 className="text-4xl font-bold mx-6">제목입니다 이거 좀 사주세요 제발</h1>
        <div
          className="
            flex
            mx-3
          "
        >
          <RiUserFill size="24"></RiUserFill>
          <p className="text-base px-2">{userCount}</p>
          <RiTimerFlashLine size="24"></RiTimerFlashLine>
          <p className="text-base px-2">{auctionTime}</p>
        </div>
      </div>
      <div
        className="
            flex
            justify-between
            min-h-[35%]
        "
      >
        <div
          className="
            mx-6
            my-3
            w-1/3
            min-h-full
          "
        >
          <p className="mb-2">상품 사진</p>
          <div
            className="
              relative
              w-full
              h-full
            "
          >
            <Image alt="상품사진" src={productimg} fill></Image>
          </div>
        </div>
        <div
          className="
            mx-6
            my-3
            w-3/5
          "
        >
          <p className="mb-2">상품 설명</p>
          <div
            className="
                p-4
                min-h-full
            "
            style={{ backgroundColor: "var(--c-white)" }}
          ></div>
        </div>
      </div>
      <div
        className="
        border-b-2
        border-slate-200
        mt-10
        w-[95%]
        mx-auto
      "
      >
        {/* 밑줄 div */}
      </div>
      <div
        className="
        mt-6
        mx-6
      "
      >
        <span className="text-3xl text-gray-400">최고가</span>{" "}
        <span
          className="text-5xl decoration-sky-200 mx-3 relative font-bold"
          style={{ color: "var(--c-blue)" }}
        >
          {price}
          <Image
            src={dojang}
            alt="낙찰"
            className="absolute lg:-top-20 lg:-right-24"
            width={150}
            height={150}
          ></Image>
        </span>
        <p className="mt-3 text-stone-400">방심은 금물! 언제 최고 낙찰자가 나올 지 몰라요 </p>
      </div>
      <div
        className="
        mt-6
        mx-6
        rounded-lg
        bg-stone-100
        w-[95%]
        h-[20%]
        border-2
        border-gray-400
        flex
        text-gray-500
        items-center
      "
      >
        <div className="w-[30%] ml-5">
          <p>입찰 단위</p>
          <p className="text-3xl">1천만 원</p>
        </div>
        <div
          className="
            border-r-2
        border-gray-500
            mx-3
            h-[80%]
        "
        ></div>
        <div className="w-[50%] ml-5">
          <p>보유 포인트</p>
          <p className="text-3xl">{price}</p>
        </div>
        <div
          className="w-[15%] bg-blue-400 h-[30%] mr-3 rounded-lg flex items-center justify-center text-white hover:bg-blue-500
            hover:border-2
            hover:border-blue-700"
        >
          <button>
            <FaRegHandPaper className="inline-block mr-3"></FaRegHandPaper>
            <span>입찰</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AuctionMainPage;
