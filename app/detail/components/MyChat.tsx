import { RoundedImg } from "@/app/components/tailwinds";
import clsx from "clsx";

interface MyChatProps {
  user: string;
  myname: string;
  chat: string;
}

const MyChat: React.FC<MyChatProps> = ({ user, myname, chat }) => {
  return (
    <div className="flex justify-end items-center py-3 px-2 w-full">
      <div className="flex items-center">
        <div className="mr-3 flex items-end flex-col">
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
            <div className="flex items-center break-all text-right">
              <p>{chat}</p>
            </div>
          </div>
        </div>
        <RoundedImg src="https://picsum.photos/200" alt="" />
      </div>
    </div>
  );
};
export default MyChat;
