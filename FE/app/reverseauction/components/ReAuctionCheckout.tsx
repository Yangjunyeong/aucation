"use client";

import { RoundedImg } from "@/app/components/tailwinds";
import Image from "next/image";
import { useState } from "react";

interface ReAuctionCheckoutProps {
  onClick: () => void;
}
const ReAuctionCheckout: React.FC<ReAuctionCheckoutProps> = ({ onClick }) => {
  const [price, setPrice] = useState<string>("15만 3000원");
  return (
    <div className="mt-4 w-full border-2 border-blue-400 h-[600px] flex">
      <div className="w-1/2 flex flex-col items-center">
        <Image
          alt="상품이미지"
          src={"https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg"}
          width={640}
          height={600}
        />
        <button
          onClick={onClick}
          className="h-10 bg-sky-200 mt-2 w-2/5 rounded-lg border-2 border-blue-200 hover:bg-sky-300"
        >
          자세히 보기
        </button>
      </div>
      <div className="w-1/2 ml-2 p-4">
        <span className="text-2xl text-blue-500">{price}</span>
        <span className="ml-3 text-2xl">제시</span>
        <div className="border-2 w-full border-gray-300"></div>
        <div className="break-all h-4/5 py-2">
          <p>
            내가 진짜 많이 깎아줬다... A급인데 15만 3천원은 ㄹㅇ개이득이라구요 빨리사세욤 내가 진짜
            많이 깎아줬다... A급인데 15만 3천원은 ㄹㅇ개이득이라구요 빨리사세욤 내가 진짜 많이
            깎아줬다... A급인데 15만 3천원은 ㄹㅇ개이득이라구요 빨리사세욤 내가 진짜 많이
            깎아줬다... A급인데 15만 3천원은 ㄹㅇ개이득이라구요 빨리사세욤 내가 진짜 많이
            깎아줬다... A급인데 15만 3천원은 ㄹㅇ개이득이라구요 빨리사세욤 내가 진짜 많내가 진짜
            많이 깎아줬다... A급인데 15만 3천원은 ㄹㅇ개이득이라구요 빨리사세욤 내가 진짜 많이
            깎아줬다... A급인데 15만 3천원은 ㄹㅇ개이득이라구요 빨리사세욤 내가 진짜 많이
            깎아줬다... A급인데 15만 3천원은 ㄹㅇ개이득이라구요 빨리사세욤 내가 진짜 많이
            깎아줬다... A급인데 15만 3천원은 ㄹㅇ개이득이라구요 빨리사세욤 내가 진짜 많이
            깎아줬다... A급인데 15만 3천원은 ㄹㅇ개이득이라구요 빨리사세욤 내가 진짜 많사세욤 내가
            진짜 많이 깎아줬다... A급인데 15만 3천원은 ㄹㅇ개이득이라구요 빨리사세욤 내가 진짜
            많사세욤 내가 진짜 많이 깎아줬다... A급인데 15만 3천원은 ㄹㅇ개이득이라구요 빨리사세욤
            내가 진짜 많사세욤 내가 진짜 많이 깎아줬다... A급인데 15만 3천원은 ㄹㅇ개이득이라구요
            빨리사세욤 내가 진짜 많사세욤 내가 진짜 많이 깎아줬다... A급인데 15만 3천원은
            ㄹㅇ개이득이라구요 빨리사세욤 내가 진짜 많
          </p>
        </div>
        <div className="border-2 w-full border-gray-300"></div>
        <div className="w-full mt-4 flex justify-between">
          <div className="flex items-center">
            <RoundedImg src="https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg" />
            <h1 className="ml-2 text-lg">내폰좀 사봐</h1>
          </div>
          <div>
            <button className="bg-[var(--c-blue)] rounded-xl text-white text-xl hover:bg-sky-500 h-10 px-3 text-center align-middle">
              입찰선택
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReAuctionCheckout;
