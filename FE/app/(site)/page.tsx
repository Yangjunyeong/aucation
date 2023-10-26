"use client";

import { useState } from "react";
import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Banner from "./components/Banner";
export default function Home() {
  // const getHandler = async () => {
  //   const res = await fetch("/api/get");
  //   const data = await res.json();
  //   console.log(data);
  //   setState(data.data);
  // };
  return (
    <main className="px-48">
      <div className="">
        <Banner></Banner>
      </div>
      <div>훠</div>
      <div>훠</div>
      <div>앙</div>
      <div>버터</div>
    </main>
  );
}
