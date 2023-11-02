import React, { useState } from "react";
import LikeBtn from "../../detail/components/LikeBtn";
import Image from "next/image";
import sellfinish from "@/app/images/sellfinish.png"
interface ItemType {
  // pk: number
  category:string;
  state:string;
  title:string;
  imgUrl:string;
  isLiked:boolean;
}
interface LikeCardProps {
    item: ItemType;
    likeHandler:(value:boolean) => void;
}

const LikeCard: React.FC<LikeCardProps> = ({item,likeHandler}) => {
    const {
        category,
        state,
        title,
        imgUrl,
        isLiked,
    } = item;
    const [isend, setIsend] = useState<boolean>(false);
    return (
        <div className="flex rounded-lg overflow-hidden shadow-lg w-[600px] h-[200px] bg-white mt-12 transition-transform transform duration-300 hover:scale-110">
        {state == "경매종료" ? (
          <div>
            <div className="relative w-[250px] h-[200px]">
              <Image
                width={250}
                height={200}
                className="transition-transform transform duration-300 hover:scale-110"
                src={imgUrl}
                alt="Building Image"
                style={{ filter: "brightness(50%)" }}
              />
              <div className="absolute top-10 left-[23%]">
                <Image width={160} height={192} src={sellfinish.src} alt="finish" />
              </div>
              <div className="absolute top-3 right-4">
                <LikeBtn isLiked={isLiked} likeHandler={likeHandler} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative w-[250px] h-[200px]">
              <Image
                className="transition-transform transform duration-300 hover:scale-110"
                src={imgUrl}
                width={250}
                height={200}
                alt="Building Image"
              />
              <div className="absolute top-3 right-4">
                <LikeBtn isLiked={isLiked} likeHandler={likeHandler} />
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 ml-4">
            {/* 경매 or 역경매 / 상태 */}
            <div className="flex gap-4">
                <div className="rounded-full border-2 px-3  border-gray-500">{category}</div>
                <div className="rounded-full border-2 px-3  border-gray-500">{state}</div>
            </div>
        
            <div className="mt-3 text-[30px] font-bold">
                {title}
            </div>


            </div>
        </div>
    )
}

export default LikeCard