// interface ItemType {
//     cardImgUrl: string;
//     likeCount: Number;
//     title: string;
//     highestPrice: Number;
//     isLiked: boolean;
//     nickname: string;
//     startPrice: Number;
//     isIndividual: boolean;
//     auctionStartTime: Date;
//   }

// interface ReAuctionBuyProps {
//     item: ItemType
// }

// const ReAuctionBuy:React.FC<ReAuctionBuyProps> = ({item}) => {
//     const {
//         cardImgUrl,
//         likeCount,
//         title,
//         highestPrice,
//         isLiked,
//         nickname,
//         startPrice,
//         isIndividual,
//         auctionStartTime
//     } = item
    
//     return (
//         <>
//         <div
//           className={clsx(
//             "flex rounded-lg overflow-hidden shadow-lg bg-white w-[1200px] h-[250px] mt-12 transition-transform transform duration-300 hover:scale-110",
//             state == "입찰중"
//               ? "border-2 border-red-500"
//               : state == "낙찰"
//               ? "border-2 border-blue-600"
//               : ""
//           )}
//         >
//           {/* 카드 이미지 */}
//           {state == "거래완료" ? (
//             <div>
//               <div className="relative w-[300px] h-[250px]">
//                 <Image
//                   width={300}
//                   height={250}
//                   className="transition-transform transform duration-300 hover:scale-110"
//                   src={cardImgUrl}
//                   alt="Building Image"
//                   style={{ filter: "brightness(50%)" }}
//                 />
//                 {/* 거래완료 도장 */}
//                 {/* <div className="absolute top-10 left-[25%]">
//                       <Image width={160} height={192} src={sellfinish.src} alt="sellfinish" />
//                     </div> */}
//               </div>
//             </div>
//           ) : (
//             <div>
//               <div className="relative w-[300px] h-[250px]">
//                 <Image
//                   className="transition-transform transform duration-300 hover:scale-110"
//                   src={cardImgUrl}
//                   width={300}
//                   height={250}
//                   alt="Building Image"
//                 />
//                 <div className="absolute top-3 right-4">
//                   <LikeBtn isLiked={liked} likeHandler={likeHandler} />
//                 </div>
//               </div>
//             </div>
//           )}
  
//           <div className="w-[900px] ml-7">
//             {/* 경매 상태 / 경매 마크 /*/}
//             <div className="flex justify-between mt-2.5">
//               <div className="flex gap-4 font-bold text-[16px] mt-[5px] ">
//                 <div className="flex mt-1 text-2xl rounded-lg border-2 px-3 items-center border-gray-500">
//                   역경매
//                 </div>
//                 <div className="flex font-sans text-2xl items-center">
//                   {state === "입찰중" && <span className="text-red-500">입찰중</span>}
//                   {state === "낙찰" && <span className="text-customBlue">낙찰</span>}
//                   {state === "거래완료" && <span>거래완료</span>}
//                 </div>
//               </div>
//               <div className="mr-16 mt-1 text-xl">
//                 등록일 :&nbsp;<span className="text-2xl">{auctionStartTime.toLocaleString()}</span>
//               </div>
//             </div>
//             {/* 카드 제목 */}
//             <div className="text-3xl h-[36px] font-bold mt-3 mr-20 whitespace-nowrap overflow-hidden text-ellipsis">
//               피츄카 팔아요 제발 사주세요 사주세요피츄카 팔아요 제발 사주세요 사주세요피츄카 팔아요
//               제발 사주세요 사주세요피츄카 팔아요 제발 사
//             </div>
  
//             {/* 구매자 */}
//             <div className="mt-2 text-[24px] font-semibold">
//               구매자 :
//               <Link href={"/mypage"} className="text-customLightTextColor text-lg hover:underline">
//                 <span className="text-3xl font-bold"> 한지우</span>
//               </Link>
//             </div>
  
//             {/* 입찰가 */}
//             <div className="text-xl mt-2">
//               입찰가 :&nbsp;
//               <span className="text-2xl font-bold text-customBlue">
//                 {startPrice.toLocaleString()}
//               </span>{" "}
//               원
//             </div>
  
//             {/* 입찰날짜 / 삭제버튼*/}
//             {state === "입찰중" && (
//               <div className="flex justify-between mr-20">
//                 <div className="flex text-2xl items-center">
//                   입찰 날짜 :&nbsp;
//                   <span className="text-[28px]">{auctionStartTime.toLocaleString()}</span>
//                 </div>
//                 <div className="flex gap-5">
//                   <span className="border-2 rounded-lg border-red-500 text-red-500 text-2xl font-bold py-2 px-2">
//                     삭제하기
//                   </span>
//                   <span className="border-2 rounded-lg text-black border-black text-2xl font-bold py-2 px-2">
//                     입찰보기
//                   </span>
//                 </div>
//               </div>
//             )}
  
//             {state === "낙찰" && (
//               <div className="flex justify-between mr-20">
//                 <div className="flex text-[22px] items-center">
//                   입찰 날짜 :&nbsp;
//                   <span className="text-[28px]">{auctionStartTime.toLocaleString()}</span>
//                 </div>
//                 <div className="flex border-2 px-4 py-1 rounded-lg cursor-pointer">
//                   <Image width={22} height={10} src={chatImg.src} alt="chat" />
//                   <span className="ml-1 text-2xl font-bold">채팅</span>
//                 </div>
//               </div>
//             )}
//             {state === "거래완료" && (
//               <div className="flex justify-between mr-20">
//                 <div className="flex text-[22px] items-center text-red-500">
//                   거래 날짜 :&nbsp;
//                   <span className="text-[28px]">{auctionStartTime.toLocaleString()}</span>
//                 </div>
//                 <div className="flex border-2 px-4 py-1 rounded-lg cursor-pointer">
//                   <Image width={22} height={10} src={chatImg.src} alt="chat" />
//                   <span className="ml-1 text-2xl font-bold">채팅</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </>
//     )
// }

// export default ReAuctionBuy