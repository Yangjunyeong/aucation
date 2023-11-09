"use client";

import { useEffect, useState } from "react";
import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Banner from "./components/Banner";
import PopularBidList from "./components/PopularBidList";
import MainFloor from "./components/MainFloor";
import PaymentModal from "../components/modal/PaymentModal";
export default function Home() {
  // const getHandler = async () => {
  //   const res = await fetch("/api/get");
  //   const data = await res.json();
  //   console.log(data);
  //   setState(data.data);
  // };
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main className="px-48">
      <button onClick={() => setModalOpen(true)}>Open Modal1</button>
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
