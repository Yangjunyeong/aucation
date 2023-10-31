"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}
interface KakaoMapProp {
  inputLat: number;
  inputLag: number;
}
const StayMap: React.FC<KakaoMapProp> = ({ inputLat, inputLag }) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [markerXY, setMarker] = useState<number[] | null>(null);

  useEffect(() => {
    console.log("1111111111111111",inputLat);
    setLat(inputLat);
    setLng(inputLag);
  }, []);

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}`;
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
        var markerPosition = new window.kakao.maps.LatLng(lat, lng);
        var marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
        // marker.setDraggable(true);
      });
    };
    if (lat && lng) {
      kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
    }
  }, [lat, lng]);

  return (
    <main className="w-full flex flex-col items-center justify-center">
      <div className="w-[600px] h-[500px]">
        <div id="map" style={{ width: "100%", height: "100%" }} className="rounded-2xl"></div>
      </div>
    </main>
  );
};
export default StayMap;
