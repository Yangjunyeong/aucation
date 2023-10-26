import React, { CSSProperties } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CarouselImg from "./CarouselImg";

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

const Banner: React.FC = () => {
  const imgIdx = [1, 2, 3, 4];
  return (
    <div className="h-full">
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showStatus={false}
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
        {imgIdx.map(idx => {
          return <CarouselImg key={idx} index={idx} />;
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
