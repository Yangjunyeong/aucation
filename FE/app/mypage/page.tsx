"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import defaultprofile from "@/app/images/defaultprofile.png";
import MoveMap from "@/app/components/map/MoveMap"
import StayMap from "../components/map/StayMap";
interface userData {
    nickname:string,
    pk:number,
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
  return (
    <div className="w-full h-full px-80 py-20">
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
          <div className="text-xl ml-8 py-10">사용자01</div>
          <div className="text-xl py-2 mt-8 ml-2 rounded-lg border border-gray-400 h-1/6">수정하기</div>
        </div>
      </div>
      <div className="border-t-2 border-gray-400 bottom-0"></div>
     <StayMap inputLag={127} inputLat={37}/>

    </div>
  );
};
export default MyPage;
