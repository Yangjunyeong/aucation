"use client";

import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { useState, useCallback, useEffect } from "react";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/inputs/Button";
import AuthSocialButton from "./AuthSocialButton";

import { BsGithub, BsGoogle } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");

  const onSubmit: SubmitHandler<FieldValues> = data => {};
  const socialAction = (action: string) => {};
  const toggleVariant = () => {
    setVariant(variant == "LOGIN" ? "REGISTER" : "LOGIN");
  };
  const test = () => {
    const emailRegexp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    console.log(emailRegexp.test("godzz733@nddaver.com"));
  };
  return (
    <div
      className="
    mt-8
    sm:mx-auto
    sm:w-full
    sm:max-w-md"
    >
      <button onClick={test}>awdawdawdawdawd</button>
      <div
        className="
        bg-white
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
        "
      >
        <form
          className="space-y-6"
          onSubmit={() => {
            console.log(1);
          }}
        >
          {variant == "REGISTER" && <Input label="이름" id="name" />}
          <Input label="이메일" id="email" />
          <Input label="비밀번호" id="password" />
          <div>
            <Button fullWidth type="submit">
              {variant == "LOGIN" ? "로그인" : "회원가입"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                    absolute
                    inset-0
                    flex
                    items-center
                "
            >
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">또는</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={RiKakaoTalkFill} onClick={() => console.log("kakaologin")} />
          </div>
        </div>
        <div
          className="flex
            gap-2
            justify-center
            text-sm
            mt-6
            px-2
            text-gray-500
            "
        >
          <div>{variant == "LOGIN" ? "새로운 회원이신가요?" : "이미 계정이 있나요?"}</div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant == "LOGIN" ? "회원가입" : "로그인"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
