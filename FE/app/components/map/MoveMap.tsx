"use client";
import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}
interface OwnProps {
  setTransActionLocation: (location: number[]) => void;
}

const MoveMap: React.FC<OwnProps> = ({ setTransActionLocation }) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [markerXY, setMarker] = useState<number[]>([0, 0]);
  const markerLocation = (location: number[]) => {
    setTransActionLocation(location);
  };

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
        marker.setDraggable(true);
        // 생성 페이지에서는 드래그 가능, 디테일 페이지에서는 마커 드래그 불가능

        // 마커에서 마우스를 때면 마커 위치가 나옴
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          setMarker([marker.getPosition().getLat(), marker.getPosition().getLng()]);
        });
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    markerLocation(markerXY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerXY]);

  return (
    <main className="w-full flex flex-col items-center justify-center">
      <div className="w-[600px] h-[500px]">
        <div id="map" style={{ width: "100%", height: "100%" }} className="rounded-2xl"></div>
      </div>
      {/* <h1>{markerXY && markerXY[0]}</h1>
      <h1>{markerXY && markerXY[1]}</h1>
      <h1>1wdsdasasdw</h1> */}
    </main>
  );
};
export default MoveMap;
