import React from "react";
import Image from "next/image";

interface OwnProps {
  image: string;
}

const CarouselImages: React.FC<OwnProps> = ({ image }) => {
  return (
    <div className="">
      <Image src={image} alt="물건 사진" width={400} height={400} />
    </div>
  );
};

export default CarouselImages;
