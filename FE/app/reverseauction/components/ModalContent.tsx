"use client";

import CarouselMain from "@/app/components/carousel/CarouselMain";

const ModalContent: React.FC = () => {
  // 적당한 이미지 주소 5개를 리스트로 만들어줘
  const images = [
    "https://picsum.photos/200/300",
    "https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg",
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
