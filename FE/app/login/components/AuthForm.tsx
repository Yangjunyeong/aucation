"use client";

import { useState, useCallback, useEffect } from "react";
import AuthSocialButton from "./AuthSocialButton";
import { RiKakaoTalkFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "./Input";
import Button from "./Button";
import tw from "tailwind-styled-components";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailVerify, setEmailVerify] = useState<string>("");

  const signOrlogin = () => {
    if (variant == "LOGIN") {
      login();
    } else {
      register();
    }
  };
  const register = () => {
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
        toast.success("회원가입 성공");
      })
      .catch(err => {
        console.log(err.response.data);
        toast.error(err.response.data.message);
      });
  };

  const login = () => {
    const data = {
      memberId: email,
      memberPw: password,
    };
    console.log(data);
    axios({
      method: "post",
      url: "/api/v1/members/login",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        console.log(res.headers.authorization);
        console.log(res.headers["authorization-refresh"]);
        toast.success("로그인 성공");
        // router.push("/");
      })
      .catch(err => {
        console.log(err.response.data);
        toast.error(err.response.data.message);
      });
  };

  const refresh = () => {
    axios({
      method: "post",
      url: "/api/v1/members/reissue",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        // console.log(res.headers.authorization);
        // console.log(res.headers["authorization-refresh"]);
        console.log(res);
        toast.success("로그인 성공");
        // router.push("/");
      })
      .catch(err => {
        console.log(err.response.data);
        // toast.error(err.response.data.message);
      });
  };

  const idCheck = () => {
    axios({
      method: "get",
      url: `/api/v1/members/verification/id/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        console.log(res.data);
        toast.success("중복된 아이디가 없습니다");
      })
      .catch(err => {
        console.log(err.response.data);
        toast.error(err.response.data.message);
      });
  };

  const socialAction = (action: string) => {};
  const toggleVariant = () => {
    setVariant(variant == "LOGIN" ? "REGISTER" : "LOGIN");
  };

  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const onChangeNickname = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  }, []);

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const onChangeEmailVerify = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailVerify(e.target.value);
  }, []);

  return (
    <div
      className="
    mt-8
    w-full
    "
    >
      <div className="my-5">
        <Label htmlFor="id">아이디</Label>
        <div
          className="
        flex
      "
        >
          <Input id="id" type="text" placeholder={"Ex:auction"} value={id} onChange={onChangeId} />
          <Button onClick={idCheck}>중복확인</Button>
        </div>
      </div>
      {variant == "REGISTER" && (
        <div className="my-5">
          <Label htmlFor="email">이메일</Label>
          <div
            className="
              flex
            "
          >
            <Input
              id="email"
              type="email"
              placeholder={"Ex:abc@example.com"}
              value={email}
              onChange={onChangeEmail}
            />
            <Button onClick={idCheck}>중복확인</Button>
          </div>
        </div>
      )}
      {variant == "REGISTER" && (
        <div className="my-5">
          <Label htmlFor="emailVerify">이메일 인증번호 입력</Label>
          <div
            className="
              flex
            "
          >
            <Input
              id="emailVerify"
              type="text"
              placeholder={""}
              value={emailVerify}
              onChange={onChangeEmailVerify}
            />
            <Button onClick={idCheck}>확인</Button>
          </div>
        </div>
      )}

      <button onClick={toggleVariant}>회원가입 버튼</button>
    </div>
  );
};
export default AuthForm;

const Label = tw.label`
block
text-sm
font-medium
leading-6
text-gray-900"
`;
