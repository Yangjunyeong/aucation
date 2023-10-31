import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import React,{useState} from 'react'
interface LikeBtnProps{
  isLiked:boolean;
  likeHandler:(state:boolean) => void;
}

const LikeBtn: React.FC<LikeBtnProps> = ({ isLiked, likeHandler }) => {
  const [isliked, setIsliked] = useState<boolean>(isLiked)
  const toggleLike = () => {
    setIsliked(!isliked)
    likeHandler(!isliked)
  }
  return (
      <div className="bg-white" style={{ backgroundColor: "rgba(255, 255, 255, 0)" }} onClick={toggleLike}>
          {isLiked ? (
              <AiFillHeart size={30} color="red" style={{ cursor: "pointer" }} />
          ) : (
              <AiOutlineHeart size={30} color="red" style={{ cursor: "pointer" }} />
          )}
      </div>
  );
};

export default LikeBtn;
