"use client";

import Image from "next/image";
<<<<<<< Updated upstream
import { useRef, useState, useEffect } from "react";
=======
import { useEffect, useRef, useState } from "react";
>>>>>>> Stashed changes
import defaultprofile from "@/app/images/defaultprofile.png";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Input from "./components/Input";
// 카드 더미데이터
import DummyUserData from "@/app/mypage/components/DummyUserData";
import ColCard from "../components/Card/ColCard";
import AuctionSell from "../components/Card/AuctionSell";
import dummyData from "../detail/components/DummyData";
import AuctionBuy from "../components/Card/AuctionBuy";
<<<<<<< Updated upstream
import LikeCard from "../components/Card/LikeCard"
// 역경매 판매
import ReAuctionSell from "../components/Card/ReAuctionSell";
// 역경매 구매
// import ReAuctionBuy from "../components/Card/ReAuctionBuy";
=======
import LikeCard from "../components/Card/LikeCard";
>>>>>>> Stashed changes

interface userData {
  profileImg: string;
  nickname: string;
  info: string;
  pk: number;
  auctionStartTime: Date;
}

interface categoryLikeType {
  // pk: number
  category: string;
  state: string;
  title: string;
  imgUrl: string;
  isLiked: boolean;
}
const MyPage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string>("");
  const [imgFile, setImgFile] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const [userdata, setUserdata] = useState<userData[]>([
    {
      profileImg: "",
      nickname: "사용자01",
      info: "안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다.",
      pk: 1,
      auctionStartTime: new Date("2023-11-31T14:32:30"),
    },
  ]);
  const [infoupdate, setInfoupdate] = useState<boolean>(false);
  const [nameupdate, setNameupdate] = useState<boolean>(false);
  const [info, setInfo] = useState<string>(
    " 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다. 안녕하세요 사용자01입니다. 가전제품을 전문적으로 경매합니다."
  );
  const [username, setUsername] = useState<string>("사용자01");
  const [category, setCategory] = useState<string>("역경매");
  const [itemsort, setItemsort] = useState<number>(0);
  // 판매 / 구매 카테고리
  const [sellOrBuy, setSellOrBuy] = useState<string | null>("판매")
  // 세부 카테고시 선택 ex) 경매전 경매중 경매완료
  const [detailCategory, setDetailCategory] = useState<string>("전체")
  const [detailListCategory, setDetailListCategory] = useState<string | null>("전체 경매전 경매중 경매완료")

  
  // 좋아요 카테고리 클릭시 요청 및 데이터 저장
  const [categoryLikedata, setCategoryLikedata] = useState<categoryLikeType[]>([
    {
      category: "경매",
      state: "경매전",
      title: "곰도리 팔아요",
      imgUrl: "https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg",
      isLiked: true,
    },
    {
      category: "역경매",
      state: "경매중",
      title: "고라니 팔아요",
      imgUrl: "https://cdn.newspenguin.com/news/photo/202001/317_1641_1348.png",
      isLiked: true,
    },
    {
      category: "경매",
      state: "경매전",
      title: "곰도리 팔아요",
      imgUrl: "https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg",
      isLiked: true,
    },
    {
      category: "역경매",
      state: "경매중",
      title: "고라니 팔아요",
      imgUrl: "https://cdn.newspenguin.com/news/photo/202001/317_1641_1348.png",
      isLiked: true,
    },
  ]);

<<<<<<< Updated upstream

  const usernameHandler = (name: string) => {
    setUsername(name);
  };
  const nameUpdateHandler = () => {
    console.log("네임 업데이트 핸들러", nameupdate);
    setNameupdate(!nameupdate);
    if (nameupdate) {
      console.log("api에 username값 post보내기", username);
    }
  };
  // const nameUpdateHandler = () =>{
  //   setUserdata(userdata )
  // }
  const infoHandler = (info: string) => {
    setInfo(info);
  };
  const infoUpdateHandler = () => {
    console.log("인포업데이트 핸들러", infoupdate);
    setInfoupdate(!infoupdate);
    if (infoupdate) {
      console.log("api에 username값 post보내기", infoupdate);
    }
  };

  // 카테고리 선택
  const categoryHandler = (value: string) => {
    console.log("카테고리 핸들러", value);
    if (value == "좋아요") {
      setSellOrBuy("")
      setDetailListCategory("")
    }
    setCategory(value);
    // 카테고리 선택시 판매 / 구매는 판매로 초기화
    sellOrBuyHandler("판매")
  };
  // 판매 / 구매 선택
  const sellOrBuyHandler = (value : string) => {
    console.log("판매/구매 핸들러", value)
    setSellOrBuy(value)
    // 판매/구매 선택 시 디테일 카테고리 초기화
    detailCategoryListHandler(category)
  }
  // 세부 상태 선택 ex)경매전 경매중 경매완료
  const detailCategoryHandler = (value:string) => {
    console.log("세부 카테고리 핸들러123123123",category, sellOrBuy)
    setDetailCategory(value)
  }

  // 세부 상태 카테고리,sellorbuy값에 따라 할당
  const detailCategoryListHandler = (selectedCategory:string) => {
    console.log("1.현재 카테고리 =====",selectedCategory,"2.buy or sell =====", sellOrBuy)
    // category 값에 따라 detailCategory 설정
    if (selectedCategory === '경매') {
      if (sellOrBuy === '판매') {
        setDetailListCategory('전체 경매전 경매중 경매완료');
      } else if (sellOrBuy === '구매') {
        setDetailListCategory('전체 낙찰 경매완료');
      }
    } else if (selectedCategory === '역경매') {
      if (sellOrBuy === '판매') {
        setDetailListCategory('전체 입찰중 낙찰 거래완료');
      } else if (sellOrBuy === '구매') {
        setDetailListCategory('전체 경매중 입찰완료 경매종료');
      }
    } else if (selectedCategory === '할인') {
      if (sellOrBuy === '판매') {
        setDetailListCategory('전체 예약중 판매완료');
      } else if (sellOrBuy === '구매') {
        setDetailListCategory('전체 예약중 구매완료');
      }
    } else if (selectedCategory === '좋아요') {
      setDetailListCategory(''); 
    }
  };

  const itemSortHandler = (itemsortNum: number) => {
    console.log(itemsortNum, "클릭");
    setItemsort(itemsortNum);
  };

  const saveImgFile = () => {
    const file = imgRef.current!.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImgFile(images);
        setImages(images);
        // setUserdata({
        // ...userdata,
        // [0]:{
        //   ...userdata[0],
        //   profileImg: reader.result
        // }
        // })
        const updateProfileImg = [...userdata];
        updateProfileImg[0].profileImg = reader.result;
        setUserdata(updateProfileImg);
      }
    };
  };

  // 좋아요 버튼 누를경우 pk, IsLiked값을 post로 전달
  const handleLike = (pk: number, isLiked: boolean) => {
    // pk와 isLiked값 post요청 보내기
    
    console.log('좋아요 ',)
  };

  // detailCategory useEffect
  useEffect(() => {
    detailCategoryListHandler(category);
    setDetailCategory("전체")
  }, [category,sellOrBuy])

=======
  const handleLike = (index: number, value: boolean) => {
    const updatedData = [...categoryLikedata];
    updatedData[index] = {
      ...updatedData[index],
      isLiked: value,
    };
    setCategoryLikedata(updatedData);
    console.log("업데이트", updatedData);
  };
  useEffect(() => {
    // 브라우저에서 로컬 스토리지에 접근하여 토큰 확인
    const accessToken = window.localStorage.getItem("accessToken");
>>>>>>> Stashed changes

    // 토큰이 없는 경우 로그인 페이지로 리다이렉션
    if (!accessToken) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="w-full px-80 py-20">
      <div>
        <div className="border-t-2 border-gray-400"></div>
        <div className="flex">
          <label htmlFor="img_file">
            <Image
              src={userdata[0]?.profileImg || defaultprofile}
              width={300}
              height={300}
              alt="이미지 등록"
              className="hover:cursor-pointer h-[300px] w-[300px]"
            />
            <input
              type="file"
              id="img_file"
              accept="image/jpg, image/png, image/jpeg"
              onChange={saveImgFile}
              ref={imgRef}
              hidden
            />
          </label>
          <div className="flex-col">
            <div className={clsx("flex h-[60px]", nameupdate ? "hidden" : "")}>
              <div className="text-2xl ml-8 mt-[18px] font-semibold w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{username}</div>
              {/* pk값 받아서 현재 유저pk와 해당 페이지 유저의 pk가 일치하지 않을경우 수정하기 불가능 */}
              <div
                className="text-2xl pt-1 mt-3 ml-2 mb-2 rounded-lg border border-gray-400 cursor-pointer"
                onClick={() => nameUpdateHandler()}
              >
                &nbsp;수정하기&nbsp;
              </div>
            </div>
            <div className={clsx("flex h-[60px]", !nameupdate ? "hidden" : "")}>
              <div className="flex mt-3">
                <Input inputHandler={usernameHandler} />
                <div
                  className="flex text-xl border px-[10px] rounded-xl text-center items-center border-gray-400 ml-2 w-[70px]"
                  onClick={() => nameUpdateHandler()}
                >
                  확인
                </div>
              </div>
            </div>

            <div className={clsx(infoupdate ? "hidden" : "")}>
              <div>
                <div className="text-xl flex-col mt-3 rounded-2xl h-[140px] max-w-[800px] border border-customGray ml-8 px-4 py-3 overflow-y-auto">
                  {info}
                </div>
              </div>
              {/* pk값 받아서 현재 유저pk와 해당 페이지 유저의 pk가 일치하지 않을경우 수정하기 불가능 */}
              <div
                className="ml-8 border py-1 px-1 text-xl border-customGray text-center mt-4 rounded-lg w-[120px] cursor-pointer"
                onClick={() => infoUpdateHandler()}
              >
                소개글 수정
              </div>
            </div>

            <div className={clsx(!infoupdate ? "hidden" : "")}>
              <div>
                <div className="text-xl flex-col mt-3 rounded-2xl h-[140px] max-w-[800px] border border-customGray ml-8 px-4 py-3 overflow-y-auto">
                  <Input inputHandler={infoHandler} />
                </div>
              </div>
              {/* pk값 받아서 현재 유저pk와 해당 페이지 유저의 pk가 일치하지 않을경우 수정하기 불가능 */}
              <div
                className="ml-8 border py-1 px-1 text-xl border-customGray text-center mt-4 rounded-lg w-[120px] cursor-pointer"
                onClick={() => infoUpdateHandler()}
              >
                수정하기
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-400 bottom-0"></div>

      {/* 박스 카테고리 클릭 효과 */}
      <div className="rounded-lg flex p-3 bg-gray-100 border border-gray-400 text-gray-700 mt-16 cursor-pointer">
        <div
          className={clsx(
            "flex items-center justify-center flex-1",
            category == "경매" ? "text-blue-500" : "text-gray-700"
          )}
          onClick={() => categoryHandler("경매")}
        >
          <div className="text-xl font-semibold ">경매</div>
        </div>
        <div
          className={clsx(
            "flex flex-1",
            category == "역경매" ? "text-blue-500" : "text-gray-700"
          )}
          onClick={() => categoryHandler("역경매")}
        >
          <div className="border-l h-20"></div>
          <div className="flex items-center justify-center flex-1">
            <p className="text-xl font-semibold ">역경매</p>
          </div>
        </div>
        <div
          className={clsx(
            "flex flex-1",
            category == "할인" ? "border-blue-500 text-blue-500" : "text-gray-700"
          )}
          onClick={() => categoryHandler("할인")}
        >
          <div className="border-l h-20"></div>
          <div className="flex items-center justify-center flex-1">
            <p className="text-xl font-semibold ">할인</p>
          </div>
        </div>
        <div
          className={clsx(
            "flex flex-1",
            category == "좋아요" ? "border-blue-500 text-blue-500" : "text-gray-700"
          )}
          onClick={() => categoryHandler("좋아요")}
        >
          <div className="border-l h-20"></div>
          <div className="flex items-center justify-center flex-1">
            <p className="text-xl font-semibold ">좋아요</p>
          </div>
        </div>
      </div>


      <div className="flex mt-20 gap-3 items-center">
            
        <h2 className="font-semibold text-3xl w-[160px]">{category} 상품</h2>
        {/* 상품개수 바인딩 */}
        <h2 className="text-red-600  text-4xl font-bold ml-2">{DummyUserData.length}</h2>
        {/* 카테고리 - 판매/구매 */}
        
        <div className={clsx("flex gap-3 items-center", category !== "좋아요" ? "" : "hidden")}>
          <div className={clsx("border-2 ml-4 border-gray-500 rounded-lg text-2xl px-3 py-1 font-bold cursor-pointer transition-transform transform duration-300 hover:scale-110", sellOrBuy == "판매" ? "text-white border-blue-500 bg-customBgBlue" : "")} onClick={()=> sellOrBuyHandler('판매')}>
              판매
          </div>
          <div className={clsx("border-2 ml-1 border-gray-500 rounded-lg text-2xl px-3 py-1 font-bold cursor-pointer transition-transform transform duration-300 hover:scale-110", sellOrBuy == "구매" ? "text-white border-blue-500 bg-customBgBlue" : "")} onClick={()=> sellOrBuyHandler('구매')}>
              구매
          </div>
        </div>

      </div>
      <div className="border-t-2 border-gray-400 bottom-0 mt-10"></div>
      {/* 카테고리 - 상태값 ex) 경매전/ 중 / 완료  */}

      {/* 작성자pk와 사용자pk가 동일할 경우 좋아요 버튼 출력안되게 해야함*/}
      <div className="flex justify-between mt-10">
        <div className="flex">
        <div className="flex gap-4 text-2xl font-semibold h-[35px] items-center">
          {detailListCategory?.split(' ').map((text, index) => (
            <span key={index} className={clsx(text === detailCategory ? 'text-3xl font-bold text-customBlue' : '')} onClick={() => detailCategoryHandler(text)}>
              {text}
            </span>
          ))}
        </div>
          <div className="ml-4">
            <span className="font-bold text-3xl ml-4 text-red-500">
              {DummyUserData.length}
            </span>
            <span className="font-bold ml-2 text-3xl">개</span>
          </div>
        </div>
        <div className="flex text-lg font-semibold text-center cursor-pointer">
          <span
            className={clsx(itemsort == 0 ? "text-blue-500" : "")}
            onClick={() => itemSortHandler(0)}
          >
            최신순&nbsp;
          </span>
          |
          <span
            className={clsx(itemsort == 1 ? "text-blue-500" : "")}
            onClick={() => itemSortHandler(1)}
          >
            &nbsp;인기순&nbsp;
          </span>
          |
          <span
            className={clsx(itemsort == 2 ? "text-blue-500" : "")}
            onClick={() => itemSortHandler(2)}
          >
            &nbsp;저가순&nbsp;
          </span>
          |
          <span
            className={clsx(itemsort == 3 ? "text-blue-500" : "")}
            onClick={() => itemSortHandler(3)}
          >
            &nbsp;고가순
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 mt-14">
        {DummyUserData.map((item, index) => (
          <ColCard key={index} item={item} />
        ))}
      </div>

<<<<<<< Updated upstream
      {/* 경매 - 판매 */}
      {category == "경매" && sellOrBuy == "판매" && <div>
        {dummyData.map((item, idx) => (
          <AuctionSell item={item} key={idx} likeHandler={handleLike}/>
        ))}
      </div>}

      {/* 경매 - 구매 */}
      {category == "경매" && sellOrBuy == "구매" && <div>
        {dummyData.map((item, idx) => (
          <AuctionBuy item={item} key={idx} />
        ))}
      </div>}
      
      {/* 역경매 판매 */}
      {category == "역경매" && sellOrBuy == "판매" && <div>
        {dummyData.map((item, idx) => (
          <ReAuctionSell item={item} key ={idx} />
        ))}
      </div>}
      
      {/* 역경매 구매 */}
      {/* {category == "역경매구매" && sellOrBuy =="구매" && <div>
        {dummyData.map((item, idx) => (
          <ReAuctionBuy item={item} key={idx} />
        ))}
      </div>} */}
      
      {/* 할인 - 판매 */}
      {/* 할인 - 구매 */}
      {/* 좋아요 */}



=======
      {category == "경매판매" && (
        <div>
          {dummyData.map((item, idx) => (
            <AuctionSell item={item} key={idx} />
          ))}
        </div>
      )}

      {category == "경매구매" && (
        <div>
          {dummyData.map((item, idx) => (
            <AuctionBuy item={item} key={idx} />
          ))}
        </div>
      )}
>>>>>>> Stashed changes

      {category == "좋아요" && (
        <div className="flex flex-wrap justify-between">
          {categoryLikedata.map((item, idx) => (
            <LikeCard item={item} key={idx} likeHandler={value => handleLike(idx, value)} />
          ))}
        </div>
      )}

<<<<<<< Updated upstream

=======
      {category == "역경매판매" && (
        <div>
          {dummyData.map((item, idx) => (
            <AuctionSell item={item} key={idx} />
          ))}
        </div>
      )}
>>>>>>> Stashed changes

      {category == "역경매구매" && (
        <div>
          {dummyData.map((item, idx) => (
            <AuctionSell item={item} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};
export default MyPage;
