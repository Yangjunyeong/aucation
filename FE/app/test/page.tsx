"use client";

// import { getTokenAndHandle, handleForegroundMessage } from "../utils/fcm";

const Test = () => {
  const test = () => {
    getTokenAndHandle();
  };
  const test2 = () => {
    handleForegroundMessage();
  };
  return (
    <div>
      <button onClick={test}>dawdawd</button>
      <button onClick={test2}>awdawdqg</button>
    </div>
  );
};
export default Test;
