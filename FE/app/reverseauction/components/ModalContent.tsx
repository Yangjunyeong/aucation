"use client";

import CarouselMain from "@/app/components/carousel/CarouselMain";

const ModalContent: React.FC = () => {
  // 적당한 이미지 주소 5개를 리스트로 만들어줘
  const images = [
    "https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg",
    "https://cdn.thecolumnist.kr/news/photo/202310/2501_5832_91.jpg",
  ];

  return (
    <div
      className="w-3/5 h-[800px] bg-white flex items-center justify-center"
      onClick={e => e.stopPropagation()}
    >
      <CarouselMain images={images} />
    </div>
  );
};
export default ModalContent;
