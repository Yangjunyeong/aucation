import React from "react";

type PriceBoxProps = {
  startingPrice?: string;
  highestPrice?: string;
  bidUnit?: string;
};

const PriceBox: React.FC<PriceBoxProps> = ({ startingPrice, highestPrice, bidUnit }) => {
  return (
    <div className="rounded-lg flex flex-row items-center p-6 bg-gray-100 border border-gray-400 mt-14">
      <div className="flex flex-col items-start flex-1 ml-4">
        <h3 className="text-sm text-gray-600">시작가</h3>
        <p className="text-xl font-semibold text-gray-700">{startingPrice} 원</p>
      </div>

      {highestPrice && (
      <>
        <div className="border-l border-gray-400 h-20"></div>
        <div className="flex flex-col items-start flex-1 ml-10">
          <h3 className="text-sm text-gray-600">최고가</h3>
          <p className="text-xl font-semibold text-blue-500">{highestPrice} 원</p>
        </div>
      </>
      )}

      {bidUnit && (
        <>
          <div className="border-l border-gray-400 h-20"></div>
          <div className="flex flex-col items-start flex-1 ml-10">
            <h3 className="text-sm text-gray-600">입찰단위</h3>
            <p className="text-xl f ont-semibold text-gray-700">{bidUnit} 원</p>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceBox;
