import { RoundedImg } from "@/app/components/tailwinds";
import clsx from "clsx";

interface OtherChatProps {
  user: string;
  myname: string;
  chat: string;
  userImg: string;
  isOwner: boolean;
}

const OtherChat: React.FC<OtherChatProps> = ({ user, myname, chat, userImg, isOwner }) => {
  return (
    <div className="flex justify-start items-center py-3 px-2">
      <div className="flex items-center">
        <RoundedImg src={userImg} alt="이미지" />
        <div className="ml-3">
          {isOwner && <p className="text-xs text-gray-400">판매자</p>}
          <p className="">{user}</p>
          <div
            className={clsx(
              `
                    rounded-2xl
                    p-4
                `,
              user === myname ? "bg-sky-300" : "bg-blue-400"
            )}
          >
            <div className="flex items-center break-all">
              <p>{chat}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OtherChat;
