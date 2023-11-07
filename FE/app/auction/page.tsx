"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import HeaderTap from "./components/HeaderTap";
import OrderTypeBtn from "./components/OrderTypeBtn";
import { orderType, searchType } from "./components/type";
import { CategoryNameList } from "../components/frontData/categoryNameList";
import DropdownButton from "../components/button/DropDownBtn";
import SearchInput from "./components/SearchInput";
import { callApi } from "../utils/api";
import Pagination from "react-js-pagination";
import "./components/Paging.css";
import { AuctionData, AuctionItem } from "../utils/cardType";
import AuctionListCard from "../components/Card/AutionListCard";
import dummyData from "./components/dummyData";
import Image from "next/image";

type PageParams = {
  headerTap: string;
};

const AuctionList = ({ params }: { params: PageParams }) => {
  const [selectedTap, setSelectedTap] = useState("경매중"); // 상단 탭, 경매 유형
  const [selectedCategory, setSelectedCategory] = useState<string>("전체"); // 카테고리
  const [searchType, setSearchType] = useState<searchType>({ id: 0, typeName: "제목" }); // 검색유형
  const [searchKeyword, setSearchKeyword] = useState<string>(""); // 검색키워드
  const [selectedOrderType, setSelectedOrderType] = useState<orderType>({
    id: 1,
    typeName: "최신순",
  }); // 정렬기준
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [data, setData] = useState<AuctionData>({
    nowTime: null, // 현재 시간
    currentPage: 0, // 현재 페이지
    totalPage: 0, // 총 페이지
    ingItems: [], // 경매 아이템 목록
  });
  const [totalItemsCount, setTotalItemsCount] = useState(0); // 전체 아이템 수

  const tmp = new Date();

  const tapList = ["경매중", "경매전", "삽니다"];
  const localCategoryList = ["전체", ...CategoryNameList];

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

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    console.log(page);
  };

  const headerHandler = (tap: string) => {
    setSelectedTap(tap);
  };

  const fetchAuctionData = useCallback(async () => {
    const searchFilters = {
      auctionCatalog: selectedCategory !== "전체" ? selectedCategory : null,
      auctionCondition: selectedOrderType.id,
      searchType: searchType.id,
      searchKeyword: searchKeyword,
    };
    console.log(searchFilters);
    callApi("post", `/auction/list/ing/${pageNumber}`, searchFilters)
      .then(response => {
        console.log("데이터", response.data);
        setData(response.data);
      })

      .catch(error => {
        console.log(searchFilters);
        console.log("데이터", error);
      });
  }, [selectedCategory, selectedOrderType.id, searchType.id, searchKeyword, pageNumber]);

  useEffect(() => {
    fetchAuctionData();
  }, [fetchAuctionData]);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword); // 상태 업데이트
    fetchAuctionData(); // 데이터 가져오기
  };

  return (
    <div className="px-48 ">
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

          <SearchInput searchHandler={handleSearch} setSearchKeyword={setSearchKeyword} />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-x-6 gap-y-10">
        {data.ingItems &&
          data.ingItems.map(item => (
            <div key={item.auctionPk} className="shadow-lg h-[450px] rounded-lg">
              <AuctionListCard item={item} nowTime={data.nowTime} />
            </div>
          ))}
        {!data.ingItems && (
          <Image
            src={"/assets/images/noResults.png}"}
            alt="검색 결과가 없어요"
            width={1536}
            height={700}
          />
        )}
        {/* {dummyData.map(item => (
          <div key={item.auctionPk} className="shadow-lg h-[450px] rounded-lg">
            <AuctionListCard item={item} nowTime={tmp} />
          </div>
        ))} */}
      </div>
      <Pagination
        activePage={pageNumber}
        itemsCountPerPage={15}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default AuctionList;
