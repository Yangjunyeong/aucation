"use client";

import { useState } from "react";

export default function Home() {
  const [state, setState] = useState("임시");
  const getHandler = async () => {
    const res = await fetch("/api/get");
    const data = await res.json();
    console.log(data);
    setState(data.data);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>awda</h1>
      {state}
      <button onClick={() => getHandler()}>버튼</button>
    </main>
  );
}
