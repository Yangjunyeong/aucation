"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useRef, useState, useEffect, ChangeEvent } from "react";

// 이미지 업로드 및 기본 프로필
import ImageUpload from "./components/ImageUpload";
import defaultprofile from "@/app/images/defaultprofile.png";

// 프로필 업데이트
import ProfileInput from "./components/ProfileInput";
import UpdateBtn from "./components/UpdateBtn";

// 카테고리 박스
import CategoryBox from "./components/CategoryBox";

// 정렬 타입
import { orderType } from "../auction/components/type";
// 카드 더미데이터
import DummyUserData from "@/app/mypage/components/DummyUserData";
import dummyData from "../detail/components/DummyData";

// 카드 컴포넌트 (세로, 경매 판매/구매, 좋아요, 역경매 - 판매/구매)
import ColCard from "../components/Card/ColCard";
import AuctionSell from "../components/Card/AuctionSell";
import AuctionBuy from "../components/Card/AuctionBuy";
import LikeCard from "../components/Card/LikeCard";
import ReAuctionSell from "../components/Card/ReAuctionSell";
import ReAuctionBuy from "../components/Card/ReAuctionBuy";
import DiscountSell from "../components/Card/DiscountSell";
import DiscountBuy from "../components/Card/DiscountBuy";
// api요청
import { callApi } from "../utils/api";
import { userInfo } from "os";

// 페이지 네이션
import Pagination from "react-js-pagination";
import "../auction/components/Paging.css";
import Script from "next/script";
import { NextPage } from "next";
import { RequestPayParams, RequestPayResponse } from "iamport-typings";
import toast from "react-hot-toast";

interface userData {
  profileImg: string;
  nickname: string;
  info: string;
  pk: number;
  auctionStartTime: Date;
}

type CategoryTypes = {
  [category: string]:
    | {
        판매?: string[];
        구매?: string[];
      }
    | string[];
};
interface categoryLikeType {
  // pk: number
  category: string;
  state: string;
  title: string;
  imgUrl: string;
  isLiked: boolean;
}
const MyPage: NextPage = () => {
  // 프로필 이미지/ 네임 / 인포
  const router = useRouter();
  const [images, setImages] = useState<string>("");
  const [imgFile, setImgFile] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  // 사용자 이름, 정보 , 업데이트 상태
  const [username, setUsername] = useState<string>("사용자01");
  const [info, setInfo] = useState<string>(
    " 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다."
  );
  const [usernameUpdate, setUsernameUpdate] = useState<boolean>(false);
  const [userInfoUpdate, setUserInfoUpdate] = useState<boolean>(false);

  // 현재 선택된 카테고리 및 카테고리 목록
  const [category, setCategory] = useState<string>("할인");
  const [secondCategory, setSecondCategory] = useState<string>("판매");
  const [thirdCategory, setThirdCategory] = useState<string | null>("예약중");
  const categories: any = {
    경매: {
      판매: ["경매전", "경매중", "경매확정"],
      구매: ["낙찰", "경매완료"],
    },
    역경매: {
      판매: ["입찰중", "낙찰", "거래완료"],
      구매: ["예약중", "구매완료"],
    },
    할인: {
      판매: ["판매중", "예약중", "판매완료"],
      구매: ["예약중", "구매완료"],
    },
    좋아요: ["좋아요"],
  };
  // 카테고리 매핑
  const categoryMap: { [key: string]: number } = {
    경매: 0,
    역경매: 1,
    할인: 2,
    좋아요: 3,
  };
  const secondCategoryMap: { [key: string]: number } = {
    판매: 0,
    구매: 1,
  };
  const firstThirdCategoryMap: { [key: string]: number } = {
    경매전: 0,
    경매중: 1,
    경매확정: 2,
    낙찰: 4,
    경매완료: 5,
  };
  const secondThirdCategoryMap: { [key: string]: number } = {
    입찰중: 0,
    낙찰: 1,
    거래완료: 2,
    예약중: 4,
    구매완료: 5,
  };
  // 요소 정렬
  const itemsortList: orderType[] = [
    { id: 0, typeName: "최신순" },
    { id: 1, typeName: "인기순" },
    { id: 2, typeName: "저가순" },
    { id: 3, typeName: "고가순" },
  ];

  const [itemsort, setItemsort] = useState<number>(0);
  // 현재 페이지
  const [pageNumber, setPageNumber] = useState<number>(1);

  // 카테고리 번호로 매핑
  const categoriesToNum = () => {
    const productType: number = categoryMap[category];
    const productStatus: number = secondCategoryMap[secondCategory];

    // 카테고리가 경매일때 3번재 카테고리 매핑
    let auctionStatus = "";
    if (category == "경매") {
      const auctionStatus: number = thirdCategory ? firstThirdCategoryMap[thirdCategory] : 0;
      // 카테고리가 역경매일때 3번째 카테고리 매핑
    } else if (category == "역경매") {
      const auctionStatus: number = thirdCategory ? secondThirdCategoryMap[thirdCategory] : 0;
    }
    const data = {
      productType: productType,
      productStatus: productStatus,
      auctionStatus: 0,
      productFilter: 0,
      myPageNum: pageNumber,
    };
    console.log(
      "API요청 -> productType:",
      productType,
      "productStatus",
      productStatus,
      "auctionStatus",
      auctionStatus
    );
    callApi("post", "members/mypage", data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(JSON.stringify(data, null, 2));
        console.log(err);
      });
  };

  // 이미지 업로드
  const handleImageUpload = (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    callApi("post", "/주소", formData)
      .then(res => {
        console.log("이미지 업로드 성공", res.data);
      })
      .catch(error => {
        console.error("이미지 업로드 실패", error);
      });
  };

  // 사용자 이름, 정보 업데이트 중인지 판별
  const handleUsernameUpdate = () => {
    setUsernameUpdate(true);
    setUserInfoUpdate(false);
  };
  const handleUserInfoUpdate = () => {
    setUsernameUpdate(false);
    setUserInfoUpdate(true);
  };
  const handleUpdateConfirm = () => {
    console.log(username, info);
    setUsernameUpdate(false);
    setUserInfoUpdate(false);
  };
  // 유저 네임 / 인포 수정
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUsername(e.target.value);
  };
  const handleInfoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInfo(e.target.value);
  };

  // 대장 카테고리 핸들러
  const categoryHandler = (value: string) => {
    console.log(value);
    setCategory(value);
  };
  // 2번째 카테고리 핸들러
  const secondCategoryHandler = (value: string) => {
    setSecondCategory(value);
  };
  // 3번째 카테고리 핸들러
  const thirdCategoryHandler = (value: string) => {
    setThirdCategory(value);
  };

  // 요소 정렬
  const itemSortHandler = (itemsortNum: number) => {
    console.log(itemsortNum, "클릭");
    setItemsort(itemsortNum);
  };

  // 마이페이지 조회 핸들러
  const fetchMypage = (value: any) => {};
  // 마이페이지 결제 핸들러

  const cashHandler = (value: any) => {
    if (!window.IMP) return;
    const { IMP } = window;
    const impkey = `${process.env.NEXT_PUBLIC_IAMPORT_IMP}`;
    IMP.init(impkey);
    const data = {
      pg: "kakaopay.TC0ONETIME",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      name: "테스트 상f점",
      amount: 1004,
      buyer_email: "tdest@navedr.com",
      buyer_name: "코드쿡",
      buyer_tel: "010-1234-5678",
      buyer_addr: "서울특별시",
      buyer_postcode: "123-456",
    };
    const callback = (response: RequestPayResponse) => {
      const { success, error_msg } = response;
      console.log(response);
      if (success) {
        toast.success("결제 성공");
        callApi("post", "/verifyIamport", {
          amount: response.paid_amount,
        })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(JSON.stringify(data, null, 2));
            console.log(err);
          });
      } else {
        toast.error(`결제 실패: ${error_msg}`);
      }
    };

    IMP.request_pay(data, callback);
  };

  // 좋아요 버튼 누를경우 pk, IsLiked값을 post로 전달
  const handleLike = (pk: number, isLiked: boolean) => {
    // pk와 isLiked값 post요청 보내기
    console.log("좋아요 ");
  };

  // 페이지
  const handlePageChange = (page: number) => {
    setPageNumber(page);
    console.log(page);
  };

  useEffect(() => {
    // 브라우저에서 로컬 스토리지에 접근하여 토큰 확인
    const accessToken = window.localStorage.getItem("accessToken");
    // 토큰이 없는 경우 로그인 페이지로 리다이렉션
    if (!accessToken) {
      router.push("/login");
    } else {
      // 토큰이 있다면 마이페이지 조회
      // fetchMypage()
    }
  }, [router]);

  useEffect(() => {
    if (category !== "좋아요") {
      thirdCategoryHandler(categories[category][secondCategory]);
    } else {
      thirdCategoryHandler("좋아요");
    }

    categoriesToNum();
  }, [category, secondCategory]);
  // 1번 카테고리 변경 시 2번 카테고리 초기화
  useEffect(() => {
    if (category !== "좋아요") {
      secondCategoryHandler(Object.keys(categories[category])[0]);
    }
  }, [category]);

  return (
    <div className="w-full px-80 py-20">
      <Script
        src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        strategy="beforeInteractive"
      />
      {/* 프로필 영역 */}
      {/* 결제 */}
      <div className="border-2" onClick={cashHandler}>
        결제하셈
      </div>
      <div>
        <div className="border-t-2 border-gray-400"></div>
        <div className="flex">
          {/* 이미지 업로드 */}
          <label htmlFor="img_file">
            <ImageUpload onImageUpload={handleImageUpload} />
          </label>

          {/* 사용자 이름, 정보 업데이트 */}
          <div className="flex-col ml-10">
            <div className="flex h-[60px]">
              {/* 유저네임/ 유저네임 인풋 */}
              <div className="flex text-2xl mt-1 items-center font-semibold w-[300px] whitespace-nowrap overflow-hidden text-ellipsis">
                {!usernameUpdate && <div className="font-bold">{username}</div>}
                {usernameUpdate && (
                  <ProfileInput value={username} onChange={handleUsernameChange} size="medium" />
                )}
              </div>
              {/* 수정버튼 */}
              <div className="mt-[10px] ml-4">
                {!usernameUpdate && (
                  <UpdateBtn onUpdate={handleUsernameUpdate} buttonText="수정하기" />
                )}
                {usernameUpdate && <UpdateBtn onUpdate={handleUpdateConfirm} buttonText="확인" />}
              </div>
            </div>

            {/* 사용자 정보창 / 사용자 정보 업데이트창 */}
            <div>
              {!userInfoUpdate && (
                <div className="text-xl flex-col mt-3 rounded-2xl h-[140px] w-[800px] border border-customGray px-4 py-3 overflow-y-auto">
                  {info}
                </div>
              )}
              {userInfoUpdate && (
                <div className="mt-3">
                  <ProfileInput value={info} onTextAreaChange={handleInfoChange} size="large" />
                </div>
              )}
            </div>
            {/* 수정버튼 */}
            <div className="flex mt-[15px]">
              {!userInfoUpdate && (
                <UpdateBtn onUpdate={handleUserInfoUpdate} buttonText="소개글 수정" />
              )}
              {userInfoUpdate && <UpdateBtn onUpdate={handleUpdateConfirm} buttonText="확인" />}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-400 bottom-0"></div>

      {/* 첫번째 카테고리 출력 및 클릭 효과 */}
      <div className="rounded-lg flex p-3 bg-gray-100 border border-gray-400 text-gray-700 mt-16 cursor-pointer">
        <div className="flex flex-1 h-20">
          {Object.keys(categories).map((item, idx) => (
            <CategoryBox
              name={item}
              selectedCategory={category}
              key={idx}
              categoryHandler={categoryHandler}
              css="flex items-center justify-center text-2xl flex-1 font-semibold "
              dynamicCss={"first"}
            />
          ))}
        </div>
      </div>

      {/* 2번째 카테고리 출력 및 클릭 시 저장 */}
      <div className="flex mt-20 gap-3 items-center">
        <h2 className="font-semibold text-3xl w-[160px]">{category} 상품</h2>
        {/* 상품개수 바인딩 */}
        <h2 className="text-red-600  text-4xl font-bold ml-2">{DummyUserData.length}</h2>
        {/* 카테고리 - 판매/구매 */}
        <div className={clsx("flex gap-3 items-center", category !== "좋아요" ? "" : "hidden")}>
          {Object.keys(categories[category]).map((item, idx) => (
            <CategoryBox
              name={item}
              selectedCategory={secondCategory!}
              key={idx}
              categoryHandler={secondCategoryHandler}
              css="border-2 ml-4 rounded-lg text-xl px-3 py-1 font-bold cursor-pointer transition-transform transform duration-300 hover:scale-110"
              dynamicCss={"second"}
            />
          ))}
        </div>
      </div>
      <div className="border-t-2 border-gray-400 bottom-0 mt-10"></div>
      {/* 카테고리 - 상태값 ex) 경매전/ 중 / 완료  */}

      {/* 3번째 카테고리 출력 */}
      <div className="flex justify-between mt-10">
        <div className="flex">
          <div className="flex gap-4 text-xl font-semibold h-[35px] items-center cursor-pointer">
            {categories[category][secondCategory]?.map((item: any, idx: any) => (
              <CategoryBox
                name={item}
                selectedCategory={thirdCategory!}
                key={idx}
                categoryHandler={thirdCategoryHandler}
                css="flex items-center justify-center font-semibold "
                dynamicCss={"second"}
              />
            ))}
          </div>
          <div className="ml-4">
            {category !== "좋아요" && (
              <span className="font-bold text-3xl ml-4 text-red-500">{DummyUserData.length}</span>
            )}
            {category !== "좋아요" && <span className="font-bold ml-2 text-3xl">개</span>}
          </div>
        </div>

        {/* 솔트 */}
        <div className="flex text-lg font-semibold text-center cursor-pointer">
          <span
            className={clsx(itemsort == 0 ? "text-blue-500" : "")}
            onClick={() => itemSortHandler(0)}
          >
            최신순&nbsp;
          </span>
          {itemsortList.map((item, idx) => (
            <CategoryBox key={idx} name={item.typeName} categoryHandler={() => itemSortHandler} />
          ))}
        </div>
      </div>

      {/* 카드 출력 */}
      <div className="flex flex-wrap gap-8 mt-14">
        {DummyUserData.map((item, index) => (
          <ColCard key={index} item={item} />
        ))}
      </div>

      {/* 경매 - 판매 */}
      {category == "경매" && secondCategory == "판매" && (
        <div>
          {dummyData.map((item, idx) => (
            <AuctionSell item={item} key={idx} likeHandler={handleLike} />
          ))}
        </div>
      )}

      {/* 경매 - 구매 */}
      {category == "경매" && secondCategory == "구매" && (
        <div>
          {dummyData.map((item, idx) => (
            <AuctionBuy item={item} key={idx} />
          ))}
        </div>
      )}

      {/* 역경매 판매 */}
      {category == "역경매" && secondCategory == "판매" && (
        <div>
          {dummyData.map((item, idx) => (
            <ReAuctionSell item={item} key={idx} />
          ))}
        </div>
      )}

      {/* 역경매 구매 */}
      {category == "역경매" && secondCategory == "구매" && (
        <div>
          {dummyData.map((item, idx) => (
            <ReAuctionBuy item={item} key={idx} />
          ))}
        </div>
      )}

      {/* 할인 - 판매 */}
      {category == "할인" && secondCategory == "판매" && (
        <div>
          {dummyData.map((item, idx) => (
            <DiscountSell item={item} key={idx} thirdCategory={thirdCategory!} />
          ))}
        </div>
      )}
      {/* 할인 - 구매 */}
      {category == "할인" && secondCategory == "구매" && (
        <div>
          {dummyData.map((item, idx) => (
            <DiscountBuy item={item} key={idx} />
          ))}
        </div>
      )}
      {/* 좋아요 */}
      {/* {category == "좋아요" && (
        <div className="flex flex-wrap justify-between">
          {categoryLikedata.map((item, idx) => (
            <LikeCard item={item} key={idx} likeHandler={value => handleLike(idx, value)} />
          ))}
        </div>
      )} */}

      {/* 페이지 네이션 */}
      <div className="flex justify-center mt-4">
        <Pagination
          activePage={pageNumber}
          itemsCountPerPage={5}
          totalItemsCount={999}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default MyPage;
