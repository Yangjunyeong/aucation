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
import { AuctionItem, ReverseAuctionItem, DiscountItem } from "@/app/components/Card/cardType";
import AuctionListCard from "@/app/components/Card/AutionListCard";
import DiscountListCard from "@/app/components/Card/DiscountListCard";
import ClipLoader from "react-spinners/ClipLoader";

// interface CarouselButtonGroupProps extends ButtonGroupProps {
//   className?: string;
//   next: () => void;
//   previous: () => void;

// }

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
  goUrl?: string;
  type: string;
  item: AuctionItem[] | ReverseAuctionItem[] | DiscountItem[];
  nowTime: Date | null;
  isLoading: boolean;
}

const PopularBidList: React.FC<OwnProps> = ({
  title,
  className,
  moreShow = false,
  goUrl,
  type,
  item,
  nowTime,
  isLoading,
}) => {
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
    <div className={`pt-14 pb-10 ${className} `}>
      <div className="pb-10 px-14 flex flex-row justify-between items-center">
        <div className="text-3xl font-bold ">{title}</div>
        {moreShow && (
          <Link
            href={`/auction/${goUrl}`}
            className="text-customLightTextColor text-lg hover:text-xl hover:underline"
          >
            더 보기
          </Link>
        )}
      </div>

      <div className="h-[600px]">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#247eff" size={200} speedMultiplier={1} />
          </div>
        ) : (
          <Carousel
            className="h-full ml-10 flex pl-5"
            responsive={responsive}
            infinite={true}
            arrows={false}
            {...(!moreShow && {
              renderButtonGroupOutside: true,
              customButtonGroup: <ButtonGroup />,
            })}
          >
            {type === "hotAution" &&
              item &&
              item.map((item, idx) => (
                <div key={idx} className="w-[295px] h-[550px] flex justify-center items-center">
                  <AuctionListCard item={item as AuctionItem} nowTime={nowTime} />
                </div>
              ))}

            {type === "reverseAution" &&
              item &&
              item.map((item, idx) => (
                <div key={idx} className="w-[295px] h-[550px]  flex justify-center items-center">
                  <AuctionListCard
                    item={item as ReverseAuctionItem}
                    nowTime={nowTime}
                    type="reverse"
                  />
                </div>
              ))}
            {type === "discounts" &&
              item &&
              item.map((item, idx) => (
                <div key={idx} className="w-[295px] h-[550px] flex justify-center items-center">
                  <DiscountListCard item={item as DiscountItem} nowTime={nowTime} />
                </div>
              ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default PopularBidList;
