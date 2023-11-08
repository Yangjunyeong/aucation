import React, { useEffect, useState } from "react";
import Image from "next/image";
import Star from "@/app/images/Star.png";
import { MdCancel } from "react-icons/md";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<number>(0);
  const [formattedAmount, setFormattedAmount] = useState<string>("");
  const buttonNum = [
    { formatNum: "+1천원", num: 1000 },
    { formatNum: "+5천원", num: 5000 },
    { formatNum: "+1만원", num: 10000 },
    { formatNum: "+5만원", num: 50000 },
    { formatNum: "+10만원", num: 100000 },
  ];
  const onBackGruondClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const addButtonHandler = (addedValue: number) => {
    setAmount(prevAmount => {
      const newAmount = prevAmount + addedValue;

      return newAmount;
    });
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.

    const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    setFormattedAmount(value); // 사용자 입력을 그대로 반영
    setAmount(numericValue);
  };
  const onBlurHandler = () => {
    setFormattedAmount(amount === 0 ? "" : `${new Intl.NumberFormat("ko-KR").format(amount)}원`);
  };

  const onFocusHandler = () => {
    setFormattedAmount(amount.toString());
  };

  useEffect(() => {
    setFormattedAmount(amount === 0 ? "" : `${new Intl.NumberFormat("ko-KR").format(amount)}원`);
  }, [amount]);

  useEffect(() => {
    const onPressEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onPressEsc);
    return () => window.removeEventListener("keydown", onPressEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onBackGruondClick}
    >
      <div className="bg-white p-8 w-[30%] h-[60%] rounded-md shadow-lg z-50">
        <div className="w-full text-4xl font-extrabold flex justify-center space-x-4 mb-16">
          <Image src={Star} alt={"별"} className="h-8 w-auto" />
          <p>옥케머니 충전하기</p>
        </div>
        <div className="w-full h-10 text-3xl font-extrabold flex items-center space-x-4 mb-16">
          <div className="h-12 w-12">
            <Image
              layout="responsive"
              width={10}
              height={10}
              src={"/assets/images/kakaoPay.png"}
              alt={"카카오페이"}
              className="h-8 w-auto"
            />
          </div>

          <p>
            카카오 페이<span className="text-customLightTextColor">로 결제하기</span>{" "}
          </p>
        </div>

        <div className="pr-5 flex">
          <input
            type="text"
            value={formattedAmount}
            onChange={inputHandler}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            placeholder="금액을 입력하세요"
            className="text-2xl focus:outline-none focus:border-blue-500 border-b-2 border-customGray w-full"
          />
          <div onClick={() => setAmount(0)} className="w-5 h-full ml-2 text-3xl cursor-pointer">
            <MdCancel />
          </div>
        </div>

        <div className=" w-full mt-12 grid grid-cols-5">
          {buttonNum.map(item => (
            <div
              key={item.num}
              onClick={() => addButtonHandler(item.num)}
              className="flex justify-center items-center border-2 py-5 cursor-pointer hover:border-none hover:border-sky-500 hover:ring-8 hover:ring-sky-200 hover:ring-opacity-100"
            >
              {item.formatNum}
            </div>
          ))}
        </div>

        <div className="flex mt-10 justify-evenly">
          <div className="flex items-center justify-center w-[30%] border-2 text-3xl cursor-pointer text-white bg-custom-btn-gradient hover:bg-custom-btn-gradient-hover py-6">
            결제
          </div>
          <div
            onClick={onClose}
            className="flex items-center justify-center w-[30%] border-2 text-3xl cursor-pointer text-white bg-custom-btn-gradient-red hover:bg-custom-btn-gradient-red-hover py-6"
          >
            취소
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
