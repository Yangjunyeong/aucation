import React, { useEffect } from "react";
import Image from "next/image";
import Star from "@/app/images/Star.png";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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

  const onBackGruondClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onBackGruondClick}
    >
      <div className="bg-white p-8 w-[30%] h-[60%] rounded-md shadow-lg z-50">
        <div className="w-full text-4xl font-extrabold flex space-x-4 mb-10">
          <Image src={Star} alt={"별"} className="h-8 w-auto" />
          <p>옥케머니 충전하기</p>
        </div>
        <div className="w-full text-2xl font-extrabold flex space-x-4">
          {/* <Image src={"assets/images/kakaoPay.png"} alt={"카카오페이"} className="h-8 w-auto" /> */}
          <p>카카오 페이로</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
