import exp from "constants"

interface DummyUserData {
    cardImgUrl: string
    likeCount: number
    time: string
    state: string
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
    time: '05시간04분',
    state: '0',
    title: "상품 제목 1",
    highestPrice: 50000,
    isLiked: true,
    nickname: "사용자1",
    startPrice: 20000,
    isIndividual: true,
  },
  {
    cardImgUrl: "https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg",
    likeCount: 200,
    time: '2일05시간23분',
    state: '1',
    title: "상품 제목 2",
    highestPrice: 60000,
    isLiked: false,
    nickname: "사용자2",
    startPrice: 30000,
    isIndividual: false,
  },
]
export default DummyUserData