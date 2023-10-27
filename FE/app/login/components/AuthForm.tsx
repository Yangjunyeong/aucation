"use client";

import { useState, useCallback, useEffect } from "react";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/inputs/Button";
import AuthSocialButton from "./AuthSocialButton";
import { RiKakaoTalkFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const signUp = () => {
    const data = {
      memberId: id,
      memberPw: password,
      memberEmail: email,
      memberNickname: nickname,
    };
    axios({
      method: "post",
      url: "/api/v1/members/signup",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
        console.log(123);
      });
    console.log(JSON.stringify(data, null, 2));
    // fetch("/api/v1/members/signup", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // })
    //   .then(res => {
    //     if (res.ok) {
    //       toast.success("회원가입 성공");
    //       // router.push("/login");
    //       console.log(res.json());
    //     } else {
    //       toast.error("회원가입 실패");
    //       console.log(JSON.stringify(res, null, 2));
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };
  const socialAction = (action: string) => {};
  const toggleVariant = () => {
    setVariant(variant == "LOGIN" ? "REGISTER" : "LOGIN");
  };

  const onChangeId = useCallback((value: string) => {
    setId(value);
  }, []);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onChangeNickname = useCallback((value: string) => {
    setNickname(value);
  }, []);

  const onChangeEmail = useCallback((value: string) => {
    setEmail(value);
  }, []);

  return (
    <div
      className="
    mt-8
    w-full
    "
    >
      <div
        className="
        bg-white
        px-4
        py-8
        shadow
        flex-col
        justify-center
        items-center
        "
      >
        {variant == "REGISTER" && (
          <div className="flex">
            <Input label="아이디" id="name" change={onChangeId} value={id} />
            <button onClick={() => {}} className="bg-[var(--c-sky)] hover:border-2">
              중복 체크
            </button>
          </div>
        )}
        {variant == "REGISTER" && (
          <Input label="닉네임" id="nickname" change={onChangeNickname} value={nickname} />
        )}
        <Input label="이메일" id="email" change={onChangeEmail} value={email} />
        <Input label="비밀번호" id="password" change={onChangePassword} value={password} />
        <div>
          <Button fullWidth onClick={signUp}>
            {variant == "LOGIN" ? "로그인" : "회원가입"}
          </Button>
        </div>
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
