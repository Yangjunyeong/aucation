"use client";

import { useEffect, useState } from "react";
import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Banner from "./components/Banner";
import PopularBidList from "./components/PopularBidList";
import MainFloor from "./components/MainFloor";
import { HomePageData } from "../components/Card/cardType";
import { callApi } from "../utils/api";

import { AuctionData, ReverseAuctionData, DiscountData } from "../components/Card/cardType";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<HomePageData>({
    nowTime: null,
    hotAuctions: [],
    discounts: [],
    recentAuctions: [],
  });

  const callHomePageData = () => {
    setIsLoading(true);
    callApi("get", "/members/mainPage")
      .then(res => {
        console.log("홈페이지 데이터", res);
        setData(res.data);
      })
      .catch(err => {
        console.log("홈페이지 데이터 에러", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    callHomePageData();
  }, []);

  return (
    <main className="px-48">
      <div>
        <Banner />
      </div>
      <div className="h-[800px]">
        <PopularBidList
          title={"🔥 현재 인기 경매"}
          type={"hotAution"}
          item={data.hotAuctions}
          nowTime={data.nowTime}
          isLoading={isLoading}
        />
      </div>
      <div>
        <PopularBidList
          title={"📢 역경매 상품"}
          className={"bg-customBgLightBlue"}
          moreShow={true}
          goUrl={"reverse-auction"}
          type={"reverseAution"}
          item={data.recentAuctions}
          nowTime={data.nowTime}
          isLoading={isLoading}
        />
      </div>
      <div>
        <PopularBidList
          title={"🛒 소상공인 할인제품"}
          moreShow={true}
          goUrl={"holding"}
          type={"discounts"}
          item={data.discounts}
          nowTime={data.nowTime}
          isLoading={isLoading}
        />
      </div>
      <div>
        <MainFloor />
      </div>
    </main>
  );
}
