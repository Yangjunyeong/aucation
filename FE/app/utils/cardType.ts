export type AuctionData = {
  nowTime: Date | null; // assuming `date` should be a Date object
  currentPage: number;
  totalPage: number;
  ingItems: AuctionItem[];
};

export type AuctionItem = {
  likeCnt: number; // 좋아요 수
  isLike: boolean; // 사용자 좋아요 여부
  auctionPk: number;
  auctionUUID: number; // 경매입장을 위한 UUID
  auctionTitle: string; // 상품이름
  auctionStartPrice: number; // 경매 시작가
  auctionTopBidPrice: number; // 경매 입찰가
  auctionCurCnt: number; // 현재 사용자
  auctionOwnerIsShop: boolean; // 소상공인여부
  auctionOwnerNickname: String; // 판매자 닉네임
  auctionEndTime: Date; // 경매 시작 시간
  auctionImg: string; // 경매 사진 url
};

export type PreAuctionData = {
  nowTime: Date | null; // assuming `date` should be a Date object
  currentPage: number;
  totalPage: number;
  preItems: PreAuctionItem[];
};

export type PreAuctionItem = {
  likeCnt: number; // 좋아요 수
  isLike: boolean; // 사용자 좋아요 여부
  auctionPk: number;
  auctionTitle: string; // 상품이름
  auctionStartPrice: number; // 경매 시작가
  auctionOwnerIsShop: boolean; // 소상공인여부
  auctionOwnerNickname: string; // 판매자 닉네임
  auctionStartTime: Date; // 경매 시작 시간
  auctionImg: string;
};
