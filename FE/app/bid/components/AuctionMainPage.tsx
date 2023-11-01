"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineHeart } from "react-icons/ai";
import { RiUserFill, RiTimerFlashLine } from "react-icons/ri";
import { FaRegHandPaper } from "react-icons/fa";
import productimg from "@/app/images/productimg.png";
import dojang from "@/app/images/dojang.png";
import { Stomp, CompatClient } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import calculateRemainingTime from "@/app/utils/timer";
import { useParams, useRouter } from "next/navigation";

type auctionData = {
  memberPk: number; // 입찰을 위한 pk
  ownerPk: number;
  memberPoint: number;
  title: String; // 경매 제목(품목이 없기 때문 제목으로 표시)
  detail: String; // 경매 상품 설명
  ownerNickname: String;
  ownerPicture: String;
  picture: string[]; // url 형식의 String을 list에 담아서 제공할 예정
  ownerType: String; // ["소상공인", "개인"]
  nowPrice: number; // 최고가 (입찰 없을 시 시작가로 대체)
  askPrice: number; // 입찰단위
  enterTime: number; // 시간 계산을 위해 서버시간 제공
  endTime: number; // 종료 시간
  headCnt: number; // 현재 접속자수
  isBid: boolean; // 현재 자신이 최고가인 사람인지 여부
};

const AuctionMainPage = () => {
  const [datas, setDatas] = useState<auctionData>({
    memberPk: 1, // 입찰을 위한 pk
    ownerPk: 2,
    memberPoint: 1,
    title: "아이폰 14", // 경매 제목(품목이 없기 때문 제목으로 표시)
    detail: "상품 설명", // 경매 상품 설명
    ownerNickname: "test",
    ownerPicture: "test",
    picture: ["https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg"], // url 형식의 String을 list에 담아서 제공할 예정
    ownerType: "소상공인", // ["소상공인", "개인"]
    nowPrice: 10000, // 최고가 (입찰 없을 시 시작가로 대체)
    askPrice: 1, // 입찰단위
    enterTime: Date.now(), // 시간 계산을 위해 서버시간 제공
    endTime: Date.now(), // 종료 시간
    headCnt: 1, // 현재 접속자수
    isBid: true, // 현재 자신이 최고가인 사람인지 여부
  });

  const [remainTime, setRemainTime] = useState<string>("00:00:00"); // 남은 시간
  const uuid = useParams().uuid;

  useEffect(() => {
    const timer = setInterval(() => {
      const startTime = Date.now(); // 종료 시간을 적절히 설정하세요
      const endTime = new Date("2023-11-01T18:30:00"); // 현재 시간을 적절히 설정하세요

      const remainingTime = calculateRemainingTime(startTime, endTime.getTime());
      setRemainTime(remainingTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [remainTime]);

  const client = useRef<CompatClient>();

  let headers: any = null;

  // 웹소켓 연결 및 이벤트 핸들러 설정
  const connectToWebSocket = () => {
    if (!headers) return;
    client.current = Stomp.over(() => {
      const ws = new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}/auc-server`);
      return ws;
    });

    client.current.connect(headers, () => {
      // 웹소켓 이벤트 핸들러 설정
      client.current!.subscribe(`/topic/sub/${uuid}`, res => {
        console.log(JSON.parse(res.body));
      });
    });
  };

  useEffect(() => {
    headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    connectToWebSocket();
  }, []);

  const bidHandler = () => {
    client.current!.send(
      `/app/send/register/${uuid}`,
      headers,
      JSON.stringify({
        memberPk: datas.memberPk,
      })
    );
  };

  return (
    <div
      className="
        mr-5
        w-[80%]
        ml-6
    "
    >
      <div
        className="
            flex
            justify-between
            pt-6
            px-6
            h-10
            items-center
        "
      >
        <AiOutlineArrowLeft size="40"></AiOutlineArrowLeft>
        <div
          className="
            flex
            justify-center
            items-center
          "
        ></div>
      </div>
      <div
        className="
            flex
            justify-between
            items-end
            mt-6
            mb-3
        "
      >
        <h1 className="text-4xl font-bold mx-6">{datas.title}</h1>
        <div
          className="
            flex
            mx-3
          "
        >
          <RiUserFill size="24"></RiUserFill>
          <p className="text-base px-2">{datas.headCnt}</p>
          <RiTimerFlashLine size="24"></RiTimerFlashLine>
          <p className="text-base px-2">{remainTime}</p>
        </div>
      </div>
      <div
        className="
            flex
            justify-between
            min-h-[35%]
        "
      >
        <div
          className="
            mx-6
            my-3
            w-1/3
            min-h-full
          "
        >
          <p className="mb-2">상품 사진</p>
          <div
            className="
              relative
              w-full
              h-full
            "
          >
            <Image alt="상품사진" src={datas.picture[0]} fill></Image>
          </div>
        </div>
        <div
          className="
            mx-6
            my-3
            w-3/5
          "
        >
          <p className="mb-2">상품 설명</p>
          <div
            className="
                p-4
                min-h-full
                break-all
                bg-[var(--c-white)]
            "
          >
            <p>{datas.detail}</p>
          </div>
        </div>
      </div>
      <div
        className="
        border-b-2
        border-slate-200
        mt-10
        w-[95%]
        mx-auto
      "
      >
        {/* 밑줄 div */}
      </div>
      <div
        className="
        mt-6
        mx-6
      "
      >
        <span className="text-3xl text-gray-400">최고가</span>{" "}
        <span
          className="text-5xl decoration-sky-200 mx-3 relative font-bold"
          style={{ color: "var(--c-blue)" }}
        >
          {datas.nowPrice}원
          {datas.isBid && (
            <Image
              src={dojang}
              alt="낙찰"
              className="absolute lg:-top-20 lg:-right-24"
              width={150}
              height={150}
            ></Image>
          )}
        </span>
        <p className="mt-3 text-stone-400">방심은 금물! 언제 최고 낙찰자가 나올 지 몰라요 </p>
      </div>
      <div
        className="
        mt-6
        mx-6
        rounded-lg
        bg-stone-100
        w-[95%]
        h-[20%]
        border-2
        border-gray-400
        flex
        text-gray-500
        items-center
      "
      >
        <div className="w-[30%] ml-5">
          <p>입찰 단위</p>
          <p className="text-3xl">{datas.askPrice}원</p>
        </div>
        <div
          className="
            border-r-2
        border-gray-500
            mx-3
            h-[80%]
        "
        ></div>
        <div className="w-[50%] ml-5">
          <p>보유 포인트</p>
          <p className="text-3xl">{datas.memberPoint}원</p>
        </div>
        {datas.memberPk != datas.ownerPk && (
          <div
            className="w-[15%] bg-blue-400 h-[30%] mr-3 rounded-lg flex items-center justify-center text-white hover:bg-blue-500
            hover:border-2
            hover:border-blue-700
            hover:cursor-pointer"
            onClick={bidHandler}
          >
            <FaRegHandPaper className="inline-block mr-3"></FaRegHandPaper>
            <span>입찰</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default AuctionMainPage;
