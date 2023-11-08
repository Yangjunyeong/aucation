import { atom } from "recoil";

export const todoListState = atom({
  key: "todoListState",
  default: "qwe",
});

export const authState = atom({
  key: "authState", // 고유한 키
  default: {
    isLoggedIn: false,
    role: "",
  }, // 기본값
});
