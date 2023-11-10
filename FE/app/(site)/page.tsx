"use client";

import { useEffect, useState } from "react";
import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Banner from "./components/Banner";
import PopularBidList from "./components/PopularBidList";
import MainFloor from "./components/MainFloor";
import { HomePageData } from "../components/Card/cardType";
import { callApi } from "../utils/api";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<HomePageData>({
    hotAuction: [],
    discounts: [],
    recentAutions: [],
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
  });

  return (
    <main className="px-48">
      <div>
        <Banner />
      </div>
      <div>
        <PopularBidList title={"🔥 현재 인기 경매"} />
      </div>
      <div>
        <PopularBidList
          title={"🛒 역경매 상품"}
          className={"bg-customBgLightBlue"}
          moreShow={true}
          goUrl={"reverse-auction"}
        />
      </div>
      <div>
        <PopularBidList title={"📢 현재 경매중인 상품"} moreShow={true} goUrl={"holding"} />
      </div>
      <div>
        <MainFloor />
      </div>
    </main>
  );
}
