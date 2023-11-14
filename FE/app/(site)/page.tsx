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
import { onMessageFCM } from "../utils/fcm";
import { useRecoilValue } from "recoil";
import { authState } from "../store/atoms";
import { useRouter } from "next/navigation";

export default function Home() {
  // const api = axios.create({
  //   baseURL: "/api/v1",
  //   timeout: 2000,
  //   headers: { "X-Custom-Header": "foobar" },
  // });
  const router = useRouter();
  const recoilValue = useRecoilValue(authState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<HomePageData>({
    nowTime: null,
    hotAuctions: [],
    discounts: [],
    recentAuctions: [],
  });
  useEffect(() => {
    // if (!localStorage.getItem("token")) return;
    onMessageFCM();
  }, []);
  const callHomePageData = () => {
    setIsLoading(true);
    callApi("get", "/members/mainPage")
      .then(res => {
        console.log("홈페이지 데이터", res);
        setData(res.data);
        console.log("리코일", recoilValue);
      })
      .catch(err => {
        console.log("홈페이지 데이터 에러", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login");
    }
    callHomePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
