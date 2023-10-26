import React from "react";
import Image from "next/image";

interface OwnProps {
  image: string;
}

const CarouselImages: React.FC<OwnProps> = ({ image }) => {
  return (
    <div className="w-full h-full">
      <Image src={image} alt="물건 사진" width={300} height={384} />
    </div>
  );
};

export default CarouselImages;
