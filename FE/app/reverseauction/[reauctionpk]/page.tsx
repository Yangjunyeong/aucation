"use client";

import Image from "next/image";
import BackBtn from "../components/BackBtn";
import LikeBtn from "../components/LikeBtn";
import profile from "@/app/images/bonobono.png";
import cell from "@/app/images/sell.png";
import { RiAuctionLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import PriceBox from "../components/PriceBox";
import { use, useEffect, useState } from "react";
import ReAuctionCheckout from "../components/ReAuctionCheckout";
import Modal from "../../components/Modal";
import ModalContent from "../components/ModalContent";
import StayMap from "../../components/map/StayMap";
import BidModalContent from "../components/BidModalContent";
import { callApi } from "../../utils/api";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DetailCarousel from "@/app/detail/components/DetailCarousel";
import ReAuctionCarousel from "../components/ReAuctionCarousel";
import BidCarousel from "../components/BidCarousel";

const AuctionDetail = () => {
  const router = useRouter();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bidModalOpen, setBidModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>(null); // 경매 데이터

  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const [imagecount, setImagecount] = useState(0);
  const [images, setImages] = useState<string[]>([]); // 이미지의 url 주소를 담는 state
  const [imagefiles, setImagefiles] = useState<File[]>([]); // 이미지의 url 주소를 담는 state
  const reauctionPk = useParams().reauctionpk;
  const descriptionhandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const priceHandler = (price: number) => {
    setPrice(price);
  };
  //좋아요 토글
  const handleLikeClicked = () => {
    setData({
      ...data,
      isLike: !data.isLike,
      likeCnt: data.isLike ? data.likeCnt - 1 : data.likeCnt + 1,
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleBidModalOpen = () => {
    setBidModalOpen(!bidModalOpen);
  };

  const handleBidHandler = () => {
    const formData = new FormData();
    formData.append("reAuctionBidPrice", price.toString());
    formData.append("reAuctionInfo", description);
    imagefiles.forEach(file => {
      formData.append("multipartFiles", file);
    });
    formData.append("reAuctionPk", reauctionPk.toString());
    callApi("post", `/reauction/bid`, formData)
      .then(res => {
        toast.success("입찰에 성공하였습니다.");
        handleBidModalOpen();
      })
      .catch(err => {
        console.log(err);
        toast.error(err.response.data.message);
        handleBidModalOpen();
      });
  };

  const getDataHandler = () => {
    callApi("get", `/auction/${reauctionPk}`, {})
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        toast.error("부적절한 접근입니다.");
        router.push("/");
      });
  };
  useEffect(() => {
    getDataHandler();
  }, []);

  return (
    <div className="w-full  px-80 py-20" style={{ backgroundColor: "var(--c-white)" }}>
      {data && (
        <>
          {/* 좋아요 버튼 및 뒤로가기 버튼 */}
          <div className="flex justify-between">
            <BackBtn />
            <div onClick={handleLikeClicked} className="flex">
              <LikeBtn isLiked={data.isLike} />
              <p className="text-xl ml-3">{data.likeCnt}</p>
            </div>
          </div>

          {/* 페이지 상단 타이틀 */}
          <div className="mt-10">
            <h2 className="text-4xl font-bold">{data.reAuctionTitle}</h2>
            {/* {data ? <h1>{data.title}</h1> : <p>Loading...</p>} */}
          </div>
          <div className="mt-5 text-2xl">
            <span className="text-blue-600 mr-2">역경매</span>
            <span>{data.reAuctionType}</span>
          </div>

          {/* 경매자 프로필 및 경매참여 인원, 경매까지 시간 */}
          <div className="flex mt-10">
            <Image
              alt="profile"
              className="w-20 h-20 rounded-full"
              src={data.reAuctionOwnerPhoto}
              width={80}
              height={80}
            />

            <div className="ml-4 flex flex-col justify-center flex-1">
              <div>
                <h3 className="text-1xl font-thin mb-1">
                  {data.reAuctionOwnerMemberRole == "SHOP" ? "소상공인" : "개인판매자"}
                </h3>
              </div>
              <div>
                <h2 className="text-2xl font-bold">인형뽑기가게사장</h2>
              </div>
            </div>
            <div className="flex-1 flex justify-end items-end">
              <div className="mr-7 flex">
                <BsFillPersonFill size={25} />
                {data.reAuctionBidCnt}명 참여중
              </div>
              {/* <h3 className="text-1xl font-thin ">경매 시작까지 31분 남음</h3> */}
            </div>
          </div>
          <div className="border-t-2 border-gray-400 mt-10"></div>

          {/* 상품 이미지 및 지도 */}
          <div className="flex flex-row mt-5">
            <div className="flex flex-1 flex-col">
              <h2 className="text-2xl text-left mb-5">상품사진</h2>
              <ReAuctionCarousel imglist={data.reAuctionPhoto} />
            </div>
            <div className="flex flex-1 flex-col">
              <h2 className="text-2xl text-left mb-5">거래 위치(협의가능)</h2>
              <StayMap inputLag={data.reAuctionMeetingLng} inputLat={data.reAuctionMeetingLat} />
            </div>
          </div>

          {/* 가격 버튼 */}
          <PriceBox startingPrice={data.reAuctionStartPrice} lowPrice={data.reAuctionStartPrice} />

          {/* 입찰버튼 */}
          {!bidModalOpen && (
            <div
              className="fixed bottom-4 right-4 rounded-lg text-white flex items-center gap-2 p-6 shadow-2xl bg-[var(--c-blue)] shadow-black text-[22px] mr-64 mb-8 z-50 hover:bg-blue-700 hover:cursor-pointer"
              onClick={handleBidModalOpen}
            >
              <RiAuctionLine size={32} color="#ffffff" />
              <p className="text-2">입찰하러 가기</p>
            </div>
          )}

          {/* 상품소개 */}
          <div className="mt-40">
            <h2 className="text-3xl font-bold">상품소개</h2>
            <div className="rounded-lg flex flex-row items-center p-6 bg-gray-100 border border-gray-400 mt-6">
              <h2 className="text-1xl font-sans">{data.reAuctionInfo}</h2>
            </div>
          </div>

          <h1 className="mt-4 text-3xl font-bold">입찰 목록</h1>
          {/* <ReAuctionCheckout onClick={handleModalOpen} /> */}
          {data.isOwner && (
            <BidCarousel datalist={data.reAuctionBidItems} handleModalOpen={handleModalOpen} />
          )}
          {isModalOpen && (
            <Modal onClick={handleModalOpen}>
              <ModalContent
                images={[
                  "https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg",
                  "https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg",
                ]}
              />
            </Modal>
          )}
          {bidModalOpen && (
            <Modal onClick={handleBidModalOpen}>
              <BidModalContent
                priceHandler={priceHandler}
                price={price}
                descriptionhandler={descriptionhandler}
                description={description}
                images={images}
                imagecount={imagecount}
                setImagecount={setImagecount}
                imagefiles={imagefiles}
                setImagefiles={setImagefiles}
                setImages={setImages}
                handleBidModalOpen={handleBidModalOpen}
                handleBidHandler={handleBidHandler}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default AuctionDetail;
