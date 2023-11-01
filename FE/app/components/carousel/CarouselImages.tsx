import React from "react";
import Image from "next/image";

interface OwnProps {
  image: string;
}

const CarouselImages: React.FC<OwnProps> = ({ image }) => {
  return (
    <div className="w-[500px] h-[600px] relative">
      <Image src={image} alt="물건 사진" layout={"fill"} objectFit={"contain"} />
    </div>
  );
};

export default CarouselImages;
