"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import imageupload from "@/app/images/imageupload.png";
import Input from "./components/Input";
import { AiOutlineStop } from "react-icons/ai";
import clsx from "clsx";
import tempmap from "./map.png";
import PriceInput from "./components/PriceInput";
import StayMap from "../components/map/StayMap";
import MoveMap from "../components/map/MoveMap";

const Panmae = () => {
  const [imagecount, setImagecount] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [imgFile, setImgFile] = useState<string | null>(null);
  const [productname, setProductname] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [option, setOption] = useState<string>("경매");
  const [price, setPrice] = useState<number>(0);

  const imgRef = useRef<HTMLInputElement>(null);
  const saveImgFile = () => {
    const file = imgRef.current!.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImgFile(reader.result);
        setImages([...images, reader.result]);
        setImagecount(imagecount + 1);
      }
    };
  };

  const productnameHandler = (name: string) => {
    setProductname(name);
  };

  const categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const optionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value); // 선택한 라디오 버튼의 값으로 category를 업데이트
  };

  const priceHandler = (price: number) => {
    setPrice(price);
  };

  return (
    <div className="w-full px-40 py-20">
      <div
        className="
        h-full
    "
      >
        <div>
          <span className="text-2xl mr-5">기본 정보</span>
          <span className="text-1xl text-red-500"> *필수항목</span>
        </div>
        <div className="border-b-2 border-black w-full"></div>
        <div className="flex my-10 w-full">
          <h1 className="text-xl mr-10 w-1/6">
            상품 이미지 <span className="text-red-500">*</span>({imagecount}/20)
          </h1>
          <div className="w-5/6 flex flex-wrap">
            <div className="w-[300px] h-[300px] mr-5 mb-5">
              <label htmlFor="img_file">
                <Image
                  src={imageupload}
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
            </div>
            {images.map((image, idx) => {
              return (
                <div
                  className="w-[300px] h-[300px] bg-cover bg-no-repeat bg-center mr-5 mb-5"
                  key={idx}
                >
                  <img src={image} alt="이미지 등록" className="w-[300px] h-[300px]" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="border-b-2 border-black w-full"></div>
        <div className="flex my-10 w-full min-h-[80px]">
          <h1 className="text-xl mt-3">
            상품명 <span className="text-red-500">*</span>
          </h1>
          <div className="flex-col w-4/5">
            <Input productnameHandler={productnameHandler} />
            <div className={clsx(`flex text-[var(--c-blue)] ml-10`, productname ? "hidden" : "")}>
              <AiOutlineStop size={24} />
              <span>상품명을 입력해 주세요</span>
            </div>
          </div>
        </div>
        <div className="border-b-2 border-black w-full mt-10"></div>
        <div className="mt-10 w-full">
          <div className="w-4/5 flex">
            <label htmlFor="category" className="mr-10">
              <h1 className="text-xl mt-3">
                카테고리 <span className="text-red-500">*</span>
              </h1>
            </label>
            <select
              name="category"
              id="category"
              onChange={categoryHandler}
              className="w-1/5 h-12 border-2
              border-gray-300
              rounded-md
              px-4
              py-2
              text-gray-700
              focus:outline-none
              focus:border-sky-500
              focus:ring-2
              focus:ring-sky-200
              focus:ring-opacity-50"
            >
              <option value="javascript">JavaScript</option>
              <option value="php">PHP</option>
              <option value="java">Java</option>
              <option value="golang">Golang</option>
              <option value="python">Python</option>
              <option value="c#">C#</option>
              <option value="C++">C++</option>
              <option value="erlang">Erlang</option>
            </select>
          </div>
        </div>
        <div className="border-b-2 border-black w-full mt-10"></div>
        <div className="flex mt-10">
          <h1 className="text-xl mr-10">
            거래지역 <span className="text-red-500">*</span>
          </h1>
          <div className="w-[600px] h-[500px] mr-5 mb-5">
            <MoveMap />
          </div>
        </div>
        <div className="border-b-2 border-black w-full mt-5"></div>
        <div className="flex mt-10">
          <h1 className="text-xl mr-10">
            경매 종류 <span className="text-red-500">*</span>
          </h1>
          <div className="flex">
            <div className="mr-4 text-xl">
              <input
                type="radio"
                id="huey"
                name="drone"
                value="경매"
                checked={option === "경매"}
                onChange={optionHandler}
              />
              <label htmlFor="huey" className="ml-2">
                경매
              </label>
            </div>

            <div className="mr-4 text-xl">
              <input
                type="radio"
                id="dewey"
                name="drone"
                value="역경매"
                checked={option === "역경매"}
                onChange={optionHandler}
              />
              <label htmlFor="dewey" className="ml-2">
                역경매
              </label>
            </div>

            <div className="text-xl">
              <input
                type="radio"
                id="louie"
                name="drone"
                value="할인"
                checked={option === "할인"}
                onChange={optionHandler}
              />
              <label htmlFor="louie" className="ml-2">
                할인
              </label>
            </div>
          </div>
        </div>
        <div className="border-b-2 border-black w-full mt-10"></div>
        <div className="flex my-10 w-full min-h-[80px]">
          <h1 className="text-xl mt-3">
            시작 가격 <span className="text-red-500">*</span>
          </h1>
          <div className="flex-col w-4/5">
            <PriceInput priceHandler={priceHandler} />
            <div className={clsx(`flex text-[var(--c-blue)] ml-10`, price ? "hidden" : "")}>
              <AiOutlineStop size={24} />
              <span>가격을 입력해 주세요</span>
            </div>
          </div>
        </div>
        <div className="border-b-2 border-black w-full mt-10"></div>
        <div className="flex w-full mt-5">
          <h1 className="text-xl mr-10 w-[80px]">
            설명 <span className="text-red-500">*</span>
          </h1>
          <div className="w-full text-lg">
            <textarea
              className="w-full h-72 border-2
              border-gray-300
              rounded-md
              px-2
              py-2
              text-gray-700
              focus:outline-none
              focus:border-sky-500
              focus:ring-2
              focus:ring-sky-200
              focus:ring-opacity-50"
              placeholder="서로가 믿고 거래할 수 있도록, 자세한 정보와 다양한 각도의 상품 사진을 올려주세요."
            ></textarea>
          </div>
        </div>
        <div className="border-b-2 border-black w-full mt-10"></div>
        <div className="w-full h-80 flex items-center justify-end">
          <button className="w-1/5 p-10 bg-red-500 text-2xl text-white rounded-md text-center my-auto">
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panmae;
