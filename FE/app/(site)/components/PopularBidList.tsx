"use client";
import React from "react";
import dummyData from "@/app/detail/components/DummyData";
import Card from "@/app/components/Card/ColCard";
import Carousel, { CarouselProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ButtonGroupProps } from "react-multi-carousel/lib/types";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BsArrowRightCircle } from "react-icons/bs";
import Link from "next/link";

interface CarouselButtonGroupProps extends ButtonGroupProps {
  className?: string;
  next: () => void;
  previous: () => void;
}

// const CarouselButtonGroup: React.FC<ButtonGroupProps> = ({ next, previous }) => {
//   return (
//     <div className="flex flex-rowspace text-4xl ">
//       <div className="mr-5">
//         <BsArrowLeftCircle onClick={() => previous()} />
//       </div>

//       <div>
//         <BsArrowRightCircle onClick={() => next()} />
//       </div>
//     </div>
//   );
// };
const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="items-end text-3xl mb-4 absolute flex top-[570px] left-[1575px] ">
      <button className="block p-3" onClick={() => previous()}>
        {" "}
        <BsArrowLeftCircle />
      </button>
      <button onClick={() => next()}>
        <span className="block p-3">
          <BsArrowRightCircle />
        </span>
      </button>
    </div>
  );
};
interface OwnProps {
  title: string;
  className?: string;
  moreShow?: boolean;
}

const PopularBidList: React.FC<OwnProps> = ({ title, className, moreShow = false }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className={`pt-14 pb-16 ${className} `}>
      <div className="pb-10 px-14 flex flex-row justify-between items-center">
        <div className="text-3xl font-bold ">{title}</div>
        {moreShow && (
          <Link
            href={"/detail"}
            className="text-customLightTextColor text-lg hover:text-xl hover:underline"
          >
            더 보기
          </Link>
        )}
      </div>

      <div className="px-5">
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={false}
          {...(!moreShow && { renderButtonGroupOutside: true, customButtonGroup: <ButtonGroup /> })}
        >
          {dummyData.map((item, idx) => (
            <div key={idx} className="w-full h-full flex justify-center items-center">
              <Card item={item} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default PopularBidList;
