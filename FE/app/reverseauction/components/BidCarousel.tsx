import React, { CSSProperties, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import DetailCarouselImg from "@/app/detail/components/DetailCarouselImg";
import ReAuctionCheckout from "./ReAuctionCheckout";

const arrowStyles: CSSProperties = {
  position: "absolute",
  zIndex: 2,
  top: "calc(50% - 15px)",
  width: 30,
  height: 30,
  cursor: "pointer",
};

const indicatorStyles: CSSProperties = {
  background: "#fff",
  width: 8,
  height: 8,
  display: "inline-block",
  margin: "0 8px",
};
interface DetailImgProps {
  datalist: any;
  handleModalOpen: () => void;
}

const BidCarousel: React.FC<DetailImgProps> = ({ datalist, handleModalOpen }) => {
  return (
    <div className="w-full">
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{ ...arrowStyles, left: 40, fontSize: 40, color: "white" }}
            >
              <div className="border-black  bg-black bg-opacity-10">{"<"}</div>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{ ...arrowStyles, right: 40, fontSize: 40, color: "white" }}
            >
              <div className="border-black bg-black bg-opacity-10">{">"}</div>
            </button>
          )
        }
        animationHandler="fade"
        swipeable={false}
      >
        {datalist.map((data: any, idx: React.Key | null | undefined) => {
          return <ReAuctionCheckout key={idx} data={data} onClick={handleModalOpen} />;
        })}
      </Carousel>
    </div>
  );
};

export default BidCarousel;
