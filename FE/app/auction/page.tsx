"use client";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import HeaderTap from "./components/HeaderTap";
import OrderTypeBtn from "./components/OrderTypeBtn";
import { orderType, searchType } from "./components/type";
import { CategoryNameList } from "../components/frontData/categoryNameList";
import DropdownButton from "../components/button/DropDownBtn";
import SearchInput from "./components/SearchInput";

const AuctionList = () => {
  const [selectedTap, setSelectedTap] = useState("경매중");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [searchType, setSearchType] = useState<searchType>({ id: 0, typeName: "제목" });
  const [searchKeyword, setSearchKeyword] = useState<string>("");

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
  const searchTypeList: searchType[] = [
    { id: 0, typeName: "제목" },
    { id: 1, typeName: "판매자" },
  ];

  const headerHandler = (tap: string) => {
    setSelectedTap(tap);
  };

  const searchHandler = (keyword: string) => {
    const searchFilters = {
      auctionCatalog: selectedCategory,
      auctionCondition: selectedOrderType.id,
      searchType: searchType.id,
      searchKeyword: keyword,
    };
  };
  useEffect(() => {
    console.log("검색어", searchKeyword);
  }, [searchKeyword]);
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
          <DropdownButton
            options={localCategoryList}
            selectedOption={selectedCategory}
            setSelectedOption={setSelectedCategory}
            size="big"
          />
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
          <DropdownButton
            options={searchTypeList.map(st => st.typeName)}
            selectedOption={searchType.typeName}
            setSelectedOption={(typeName: string) => {
              const newSearchType = searchTypeList.find(st => st.typeName === typeName);
              if (newSearchType) {
                setSearchType(newSearchType);
              }
            }}
            size="small"
          />

          <SearchInput searchHandler={searchHandler} setSearchKeyword={setSearchKeyword} />
        </div>
      </div>
      <div>카드 리스트 부분</div>
      <div>페이지 네이션</div>
    </div>
  );
};

export default AuctionList;
