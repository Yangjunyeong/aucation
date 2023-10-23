"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f880e9e16f6a034ac4942453b1beefb0&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById("map");
        var options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          //   center: new window.kakao.maps.LatLng(33.45, 126.56),
          level: 3,
        };

        var map = new window.kakao.maps.Map(container, options);
      });
    };
    if (lat && lng) {
      kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
    }
  }, [lat, lng]);

  useEffect(() => {
    const { geolocation } = navigator;

    geolocation.getCurrentPosition(
      position => {
        // success.
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        console.log(position.coords);
      },
      error => {
        console.warn("Fail to fetch current location", error);
        setLat(37);
        setLng(127);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  }, []);

  return (
    <main className="w-full flex flex-col items-center justify-center pt-4">
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </div>
    </main>
  );
};
export default KakaoMap;
