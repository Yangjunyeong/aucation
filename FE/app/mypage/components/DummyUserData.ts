import exp from "constants"

interface DummyUserData {
    cardImgUrl: string
    likeCount: number
    auctionStartTime: Date
    title: string
    highestPrice: number
    isLiked: boolean
    nickname: string
    startPrice: number
    isIndividual: boolean
}

const DummyUserData: DummyUserData[] = [
{
    cardImgUrl: "https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg",
    likeCount: 100,
    auctionStartTime: new Date("2023-11-03T14:32:30"),
    title: "상품 제목 1",
    highestPrice: 500000,
    isLiked: true,
    nickname: "사용자1",
    startPrice: 20000,
    isIndividual: true,
  },
  {
    cardImgUrl: "https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg",
    likeCount: 200,
    auctionStartTime: new Date("2023-11-02T14:32:30"),
    title: "상품 제목 2",
    highestPrice: 60000,
    isLiked: false,
    nickname: "사용자2",
    startPrice: 30000,
    isIndividual: false,
  },
]
export default DummyUserData