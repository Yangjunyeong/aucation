"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import clsx from "clsx";
import { useRef, useState, useEffect, ChangeEvent } from "react";

// 카테고리 박스
import CategoryBox from "@/app/mypage/components/CategoryBox";

// 카드 더미데이터
import DummyUserData from "@/app/mypage/components/DummyUserData";
import dummyData from "../../detail/components/DummyData";

// 가격 단위 파싱
import "../../utils/pricecal";

// 카드 컴포넌트 (세로, 경매 판매/구매, 좋아요, 역경매 - 판매/구매)
import ColCard from "../../components/Card/ColCard";
import AuctionSell from "../../components/Card/AuctionSell";
import DiscountSell from "../../components/Card/DiscountSell";

// api요청
import { callApi } from "../../utils/api";

// 페이지 네이션
import Pagination from "react-js-pagination";
import "../../auction/components/Paging.css";

// 아이콘
import { HiBuildingStorefront } from "react-icons/hi2";
import { BsPersonFill } from "react-icons/bs";
import { BiWon } from "react-icons/bi";
import { icons } from "react-icons";

interface userData {
  profileImg: string;
  nickname: string;
  info: string;
  pk: number;
  auctionStartTime: Date;
}

type CategoryTypes = {
  [key: string]:
    | string[]
    | {
        판매?: string[];
        구매?: string[];
      };
};
interface categoryLikeType {
  // pk: number
  category: string;
  state: string;
  title: string;
  imgUrl: string;
  isLiked: boolean;
}
const Other = () => {
  const shopPk = useParams().slug;
  // apiData
  const [dataList, setDataList] = useState<any>();
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

  // 현재 선택된 카테고리 및 카테고리 목록
  const [category, setCategory] = useState<string>("경매");
  const [secondCategory, setSecondCategory] = useState<any>("판매");
  const [thirdCategory, setThirdCategory] = useState<string>("경매전");
  const [itemsort, setItemsort] = useState<string>("최신순");

  // 현재 페이지
  const [pageNumber, setPageNumber] = useState<number>(1);

  // 소상공인 판단
  const [isShop, setIsShop] = useState<string>("소상공인");

  const apiUrl: any = {
    경매: "members/mypage/auction",
    할인: "members/mypage/discount",
  };
  const categories: any = {
    경매: {
      판매: ["경매전", "경매중", "경매완료"],
    },
    할인: {
      판매: ["판매중", "예약중", "판매완료"],
    },

  };

  // 요소 정렬
  const itemsortList: string[] = ["최신순", "저가순", "고가순"];

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
  const itemSortHandler = (value: string) => {
    setItemsort(value);
  };

  // 페이지
  const handlePageChange = (page: number) => {
    setPageNumber(page);
    console.log(page);
  };

  // useEffect(() => {
  //   // 브라우저에서 로컬 스토리지에 접근하여 토큰 확인
  //   const accessToken = window.localStorage.getItem("accessToken");
  //   // 토큰이 없는 경우 로그인 페이지로 리다이렉션
  //   if (!accessToken) {
  //     router.push("/login");
  //   } else {
  //     // 토큰이 있다면 마이페이지 조회
  //     // fetchMypage()
  //   }
  // }, [router]);

  // 1번 카테고리 변경 시 2번 카테고리 초기화
  // useEffect(() => {
  //   if (category !== "좋아요") {
  //     console.log("1번카테고리 변경");
  //     secondCategoryHandler(Object.keys(categories[category])[0]);
  //   } else {
  //     secondCategoryHandler("");
  //   }
  // }, [category]);
  // useEffect(() => {
  //   if (category !== "좋아요") {
  //     console.log("2번카테고리 변경");
  //     thirdCategoryHandler(categories[category][secondCategory!][0]);
  //   } else {
  //     console.log("2번카테고리 변경");
  //     thirdCategoryHandler("경매");
  //   }
  // }, [category, secondCategory]);

  // // 데이터 불러오기
  // useEffect(() => {
  //   let data: any;
  //     data = {
  //       productStatus: secondCategory,
  //       auctionStatus: thirdCategory,
  //       productFilter: itemsort,
  //       myPageNum: pageNumber,
  //     }

  //   // 유저 데이터 불러오기
  //   callApi("post", `${apiUrl[category]}`, data)
  //     .then(res => {
  //       console.log(res.data);
  //       setDataList(res.data);
  //     })
  //     .catch(err => {
  //       console.log(JSON.stringify(data, null, 2));
  //       console.log(err);
  //     });
  // }, [thirdCategory]);

  return (
    <div></div>
    // <div className="w-full px-80 py-20">
    //   {/* 프로필 영역 */}
    //   {/* 결제 */}
    //   <div>
    //     <div className="border-t-2 border-gray-400"></div>
    //     <div className="flex">
    //       {/* 상점 프로필 이미지 */}
    //       <Image
    //         src={dataList.imgFile}
    //         width={300}
    //         height={300}
    //         alt="프로필 이미지"
    //         className="hover:cursor-pointer h-[300px] w-[300px]"
    //       />
    //       {/* 사용자 이름 */}
    //       <div className="flex-col ml-10">
    //         <div className="flex mt-2 h-[60px]">
    //           <span className="flex items-center mt-1 w-[60px]">
    //             {isShop == "소상공인" ? (
    //               <HiBuildingStorefront size={70} />
    //             ) : (
    //               <BsPersonFill size={70} />
    //             )}
    //           </span>
    //           {/* 유저네임 */}
    //           <div className="flex text-2xl mt-1 items-center font-semibold w-[240px] whitespace-nowrap overflow-hidden text-ellipsis">
    //             <div className="font-bold">{username}</div>
    //           </div>
    //         </div>
    //         {/* 사용자 정보창 */}
    //         <div>
    //             <div className="text-xl flex-  mt-3 rounded-2xl h-[140px] w-[850px] border border-customGray px-4 py-3 overflow-y-auto">
    //               {info}
    //             </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="border-t-2 border-gray-400 bottom-0"></div>

    //   {/* 첫번째 카테고리 출력 및 클릭 효과 */}
    //   <div className="rounded-lg flex p-3 bg-gray-100 border border-gray-400 text-gray-700 mt-16 cursor-pointer">
    //     <div className="flex flex-1 h-20">
    //       {Object.keys(categories).map((item, idx) => (
    //         <CategoryBox
    //           name={item}
    //           selectedCategory={category}
    //           key={idx}
    //           categoryHandler={categoryHandler}
    //           css="flex items-center justify-center text-2xl flex-1 font-semibold "
    //           dynamicCss={"first"}
    //         />
    //       ))}
    //     </div>
    //   </div>

    //   {/* 2번째 카테고리 출력 및 클릭 시 저장 */}
    //   <div className="flex mt-20 gap-3 items-center">
    //     <h2 className="font-semibold text-3xl w-[160px]">{category} 상품</h2>
    //     {/* 상품개수 바인딩 */}
    //     <h2 className="text-red-600  text-4xl font-bold ml-2">{DummyUserData.length}</h2>
    //     {/* 카테고리 - 판매/구매 */}
    //     <div className="flex gap-3 items-center">
    //       {Object.keys(categories[category]).map((item, idx) => (
    //         <CategoryBox
    //           name={item}
    //           selectedCategory={secondCategory!}
    //           key={idx}
    //           categoryHandler={secondCategoryHandler}
    //           css="border-2 ml-4 rounded-lg text-xl px-3 py-1 font-bold cursor-pointer transition-transform transform duration-300 hover:scale-110"
    //           dynamicCss={"second"}
    //         />
    //       ))}
    //     </div>
    //   </div>
    //   <div className="border-t-2 border-gray-400 bottom-0 mt-10"></div>
    //   {/* 카테고리 - 상태값 ex) 경매전/ 중 / 완료  */}

    //   {/* 3번째 카테고리 출력 */}
    //   <div className="flex justify-between mt-10">
    //     <div className="flex">
    //       <div className="flex gap-4 text-xl font-semibold h-[35px] items-center cursor-pointer">
    //         {categories[category][secondCategory]?.map((item: any, idx: any) => (
    //               <CategoryBox
    //                 name={item}
    //                 selectedCategory={thirdCategory!}
    //                 key={idx}
    //                 categoryHandler={thirdCategoryHandler}
    //                 css="flex items-center justify-center font-semibold "
    //                 dynamicCss={"second"}
    //               />
    //             ))}
    //       </div>
    //       <div className="ml-4">
    //         {category !== "좋아요" && (
    //           <span className="font-bold text-3xl ml-4 text-red-500">{DummyUserData.length}</span>
    //         )}
    //         {category !== "좋아요" && <span className="font-bold ml-2 text-3xl">개</span>}
    //       </div>
    //     </div>

    //     {/* 솔트 */}
    //     <div className="flex text-lg font-semibold text-center cursor-pointer">
    //       {itemsortList.map((item, idx) => (
    //         <div key={idx}>
    //           <div
    //             className={clsx("text-lg", itemsort == item ? "font-bold text-customBlue" : "")}
    //             onClick={() => itemSortHandler(item)}
    //           >
    //             <span className="text-black">|</span>&nbsp;{item}&nbsp;
    //           </div>
    //         </div>
    //       ))}
    //       |
    //     </div>
    //   </div>

      // {/* 경매 - 판매 */}
      // {/* {category == "경매" && secondCategory == "판매" && (
      //   <div>
      //     {dummyData.map((item, idx) => (
      //       <AuctionSell item={item} key={idx} likeHandler={handleLike} />
      //     ))}
      //   </div>
      // )} */}

      // {/* 할인 - 판매 */}
      // {/* {category == "할인" && secondCategory == "판매" && (
      //   <div>
      //     {dummyData.map((item, idx) => (
      //       <DiscountSell item={item} key={idx} thirdCategory={thirdCategory!} />
      //     ))}
      //   </div>
      // )} */}

    //   {/* 페이지 네이션 */}
    //   <div className="flex justify-center mt-4">
    //     <Pagination
    //       activePage={pageNumber}
    //       itemsCountPerPage={5}
    //       totalItemsCount={999}
    //       pageRangeDisplayed={5}
    //       prevPageText={"‹"}
    //       nextPageText={"›"}
    //       onChange={handlePageChange}
    //     />
    //   </div>
    // </div>
  );
};
export default Other;
