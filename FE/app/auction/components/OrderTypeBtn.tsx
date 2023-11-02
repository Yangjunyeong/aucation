import React from "react";
import { orderType } from "./type";
import clsx from "clsx";
interface OwnProps {
  orderType: orderType;
  selectedOrderType: boolean;
  setOrderType: (order: orderType) => void;
}

const OrderTypeBtn: React.FC<OwnProps> = ({ orderType, selectedOrderType, setOrderType }) => {
  return (
    <div
      onClick={() => {
        setOrderType(orderType);
      }}
      className={clsx(
        "text-xl font-semibold",
        "border-2",
        "border-customGray",
        "rounded-3xl px-4 py-2",
        "hover:cursor-pointer",
        { "text-white bg-custom-btn-gradient": selectedOrderType },
        { " text-black bg-cutomBasic hover:bg-customBgLightBlue": !selectedOrderType }
      )}
    >
      {orderType.typeName}
    </div>
  );
};

export default OrderTypeBtn;
