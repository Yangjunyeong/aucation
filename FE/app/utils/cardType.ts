export type AuctionData = {
  nowTime: Date | null; // assuming `date` should be a Date object
  currentPage: number;
  totalPage: number;
  items: AuctionItem[];
};

export type AuctionItem = {
  likeCnt: number;
  isLike: boolean;
  auctionPk: number;
  auctionTitle: string;
  auctionStartPrice: number;
  auctionOwnerIsShop: boolean;
  auctionOwnerNickname: string;
  auctionStartTime: Date; // assuming DateTime is equivalent to Date object
  auctionImg: string; // assuming this should be a single string URL
};
