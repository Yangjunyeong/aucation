"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import imageupload from "@/app/images/imageupload.png";
import Input from "./components/Input";
import { AiOutlineStop } from "react-icons/ai";
import clsx from "clsx";

const Panmae = () => {
  const [imagecount, setImagecount] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [imgFile, setImgFile] = useState<string | null>(null);
  const [productname, setProductname] = useState<string>("");

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

  return (
    <div className="w-full p-40">
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
        <div className="flex mt-10 w-full">
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
      </div>
    </div>
  );
};

export default Panmae;
