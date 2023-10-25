"use client";

import { useEffect, useRef, useState } from "react";
import MyChat from "./MyChat";
import OtherChat from "./OtherChat";
import Input from "./Input";

const AuctionChat = () => {
  const [chats, setChats] = useState([
    ["채팅연습", "현빈"],
    ["상대방", "규돈"],
  ]);
  const [myname, setMyname] = useState("현빈");

  const chatHandler = (value: string, username: string) => {
    setChats([...chats, [value, username]]);
  };
  const rapperDiv = useRef<HTMLInputElement>(null);
  useEffect(() => {
    scroll();
    console.log(rapperDiv.current!.scrollHeight);
  }, [chats]);
  // 스크롤 로직
  const scroll = () => {
    rapperDiv.current!.scrollTo({
      top: rapperDiv.current!.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const foo = async () => {
      await scroll();
    };
    foo();
  }, []);

  return (
    <div className="h-[80%] w-[30%] mr-5 my-auto shadow-2xl">
      <div
        className="
      bg-slate-100
      h-full
      w-full
      rounded-3xl
      rounded-b-none
      overflow-y-scroll
      scrollBar
    "
        ref={rapperDiv}
        style={{ backgroundColor: "var(--c-white)" }}
      >
        <div>
          {chats.map((chat, idx) => {
            return chat[1] == myname ? (
              <MyChat user={chat[1]} myname={myname} key={idx} chat={chat[0]} />
            ) : (
              <OtherChat user={chat[1]} myname={myname} key={idx} chat={chat[0]} />
            );
          })}
        </div>
      </div>
      <div
        className="min-w-full rounded-3xl rounded-t-none
      shadow-xl h-[10%] bg-white mx-auto"
      >
        <Input chatHandler={chatHandler} />
      </div>
    </div>
  );
};
export default AuctionChat;
