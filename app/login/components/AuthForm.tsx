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
  const [isLoding, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant == "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);
    if (variant == "REGISTER") {
      // axios
      //   .post("/api/register", data)
      //   .then(() => {
      //     signIn("credentials", data);
      //   })
      //   .catch(() => {
      //     toast.error("Failed to register");
      //   })
      //   .finally(() => setIsLoading(false));
    }

    if (variant == "LOGIN") {
      // signIn("credentials", {
      //   ...data,
      //   redirect: false,
      // })
      //   .then(callback => {
      //     if (callback?.error) {
      //       toast.error("Invalid credentials");
      //     }
      //     if (callback?.ok && !callback?.error) {
      //       toast.success("Logged in!");
      //       router.push("/users");
      //     }
      //   })
      //   .finally(() => setIsLoading(false));
    }
  };
  const socialAction = (action: string) => {
    setIsLoading(true);

    // signIn(action, { redirect: false })
    //   .then(callback => {
    //     if (callback?.error) {
    //       toast.error("Failed to login");
    //     }

    //     if (callback?.ok && !callback?.error) {
    //       toast.success("Logged in!");
    //     }
    //   })
    //   .finally(() => setIsLoading(false));
  };
  return (
    <div
      className="
    mt-8
    sm:mx-auto
    sm:w-full
    sm:max-w-md"
    >
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
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant == "REGISTER" && (
            <Input label="이름" register={register} id="name" errors={errors} disabled={isLoding} />
          )}
          <Input
            label="이메일"
            register={register}
            id="email"
            errors={errors}
            type="email"
            disabled={isLoding}
          />
          <Input
            label="비밀번호"
            register={register}
            id="password"
            errors={errors}
            type="password"
            disabled={isLoding}
          />
          <div>
            <Button disabled={isLoding} fullWidth type="submit">
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
