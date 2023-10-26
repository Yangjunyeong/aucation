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
  const [category, setCategory] = useState<string>("");

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
            <select name="category" id="category" onChange={categoryHandler} className="w-10 h-5">
              <option value="javascript">JavaScript</option>
              <option value="php">PHP</option>
              <option value="java">Java</option>
              <option value="golang">Golang</option>
              <option value="python">Python</option>
              <option value="c#">C#</option>
              <option value="C++">C++</option>
              <option value="erlang">Erlang</option>
            </select>
            <h1>{category}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panmae;
