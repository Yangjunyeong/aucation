"use client";
import { useRecoilState } from "recoil";
import { todoListState } from "./store/atoms";
export default function Home() {
  const [todo, setTodo] = useRecoilState(todoListState);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{todo}</h1>
      <button
        onClick={() => {
          setTodo("바뀜");
        }}
      >
        변경
      </button>
    </main>
  );
}
