"use client";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import HeaderTap from "./components/HeaderTap";
import OrderTypeBtn from "./components/OrderTypeBtn";
import { orderType } from "./components/type";
import { CategoryNameList } from "../components/frontData/categoryNameList";
import { LuTriangle } from "react-icons/lu";
import SearchTypeDropBtn from "./components/SearchTypeDropBtn";

const AuctionList = () => {
  const [selectedTap, setSelectedTap] = useState("경매중");
  const [isShowToggle, setIsShowToggle] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const dropdownRef = useRef<HTMLDivElement | null>(null); // 드롭다운 참조 추가

  const tapList = ["경매중", "경매전", "삽니다"];
  const localCategoryList = ["전체", ...CategoryNameList];
  const [selectedOrderType, setSelectedOrderType] = useState<orderType>({
    id: 1,
    typeName: "최신순",
  });
  const searchCondition = useState({
    selectedCategory: selectedCategory,
  });

  const orderTypeList: orderType[] = [
    { id: 1, typeName: "최신순" },
    { id: 2, typeName: "저가순" },
    { id: 3, typeName: "고가순" },
    { id: 4, typeName: "좋아요순" },
  ];

  const headerHandler = (tap: string) => {
    setSelectedTap(tap);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setIsShowToggle(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsShowToggle(false);
      }
    };

    // 클릭 이벤트 리스너 추가
    document.addEventListener("click", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-60 ">
      <div className="flex flex-row space-x-10 h-[100px] items-center">
        <div className="font-black text-5xl">경매 상품</div>
        {tapList.map((tap: string, idx) => (
          <HeaderTap
            key={idx}
            tap={tap}
            selected={tap === selectedTap}
            headerHandler={headerHandler}
          />
        ))}
      </div>

      <div className="flex flex-row h-[75px] items-center justify-between">
        <div className="flex flex-row space-x-8">
          <div
            onClick={() => setIsShowToggle(!isShowToggle)}
            ref={dropdownRef}
            className={clsx(
              "text-xl font-semibold",
              "border-2",
              "border-customGray",
              "rounded-3xl px-4 py-2",
              "hover:cursor-pointer",
              "flex flex-row items-center space-x-2",
              "relative"
            )}
          >
            <p>{selectedCategory}</p>
            <LuTriangle
              className={`transition-transform duration-300 ease-in-out transform ${
                isShowToggle ? "rotate-180" : ""
              }`}
              size={20}
            />
            {isShowToggle && (
              <div className="absolute top-full left-0 mt-2 w-[600px] rounded-md shadow-lg bg-white divide-y divide-gray-100">
                <div className="grid grid-cols-3 gap-2 p-2">
                  {localCategoryList.map((category, idx) => (
                    <span
                      key={idx}
                      className="hover:bg-gray-200 hover:text-customBlue font-medium rounded cursor-pointer px-1 py-1"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {orderTypeList.map(orderType => (
            <OrderTypeBtn
              key={orderType.id}
              orderType={orderType}
              selectedOrderType={selectedOrderType.typeName === orderType.typeName}
              setOrderType={setSelectedOrderType}
            />
          ))}
        </div>

        <div className="flex flex-row space-x-8">
          <SearchTypeDropBtn />
          <div>검색어 입력</div>
        </div>
      </div>
      <div>카드 리스트 부분</div>
      <div>페이지 네이션</div>
    </div>
  );
};

export default AuctionList;
