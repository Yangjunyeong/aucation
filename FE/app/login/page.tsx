import Image from "next/image";
import AuthForm from "./components/AuthForm";
import logo from "@/app/images/logo.png";

export default function Home() {
  return (
    <div
      className="
    flex
    min-h-full
    flex-col
    justify-center
    items-center
    py-12
    sm:px-6
    lg:px-8
    bg-gray-100
    "
    >
      <div className="w-[35%]">
        <Image alt="Logo" className="mx-auto w-auto" src={logo} />
        <h2
          className="mt-6
         text-center
         text-3xl
         font-bold
         tracking-tight
         text-gray-900"
        >
          로그인
        </h2>
        <AuthForm />
      </div>
    </div>
  );
}
