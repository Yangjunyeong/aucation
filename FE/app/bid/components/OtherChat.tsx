import { RoundedImg } from "@/app/components/tailwinds";
import clsx from "clsx";

interface OtherChatProps {
  user: string;
  myname: string;
  chat: string;
}

const OtherChat: React.FC<OtherChatProps> = ({ user, myname, chat }) => {
  return (
    <div className="flex justify-start items-center py-3 px-2">
      <div className="flex items-center">
        <RoundedImg src="https://picsum.photos/200" alt="" />
        <div className="ml-3">
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
