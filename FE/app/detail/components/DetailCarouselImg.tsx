import React, { useEffect } from "react";
import Image from "next/image";

interface OwnProps {
  item: string;
}

const DetailCarouselImg: React.FC<OwnProps> = ({ item }) => {
  useEffect(() => {
    // console.log("디테일 캐로셀 이미지 페이지", item);
    // console.log(item, "awdawdawdawd");
  }, []);

  return (
    <div className="flex w-[600px] h-[500px]">
      <Image src={item} alt="detailcarousel" width={600} height={500} />
    </div>
  );
};

export default DetailCarouselImg;
