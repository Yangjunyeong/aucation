import React, { useState, useRef, useEffect } from "react";
import { LuTriangle } from "react-icons/lu";
import clsx from "clsx";
interface Props {
  options: string[]; // 드롭 박스에 들어갈 문자열 배열
  selectedOption: string; // 드롭 박스에서 내가 선택한 요소
  setSelectedOption: (option: string) => void; // 드롭박스 안에서 요소를 선택할 때 선택한 값을 저장하기 위한 세터함수
  size?: "big" | "small" | "medium"; // big은 3줄 medium은 두줄 small은 한 줄로 박스를 만듦
}

const DropdownButton: React.FC<Props> = ({ options, selectedOption, setSelectedOption, size }) => {
  const [isShowToggle, setIsShowToggle] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsShowToggle(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsShowToggle(false);
  };

  return (
    <div
      onClick={() => setIsShowToggle(!isShowToggle)}
      ref={dropdownRef}
      className="text-xl font-semibold border-2 border-customGray rounded-3xl px-4 py-2 hover:cursor-pointer flex flex-row items-center space-x-2 relative"
    >
      <p>{selectedOption}</p>
      <LuTriangle
        className={`transition-transform duration-300 ease-in-out transform ${
          isShowToggle ? "rotate-180" : ""
        }`}
        size={20}
      />
      {isShowToggle && (
        <div
          className={clsx(
            `absolute top-full left-0 mt-2  rounded-md shadow-lg bg-white divide-y divide-gray-100`,
            {
              "w-[600px]": size === "big",
              "w-[400px]": size === "medium",
              "w-[200px]": size === "small",
            }
          )}
        >
          <div
            className={clsx(`p-2 grid gap-2`, {
              "grid-cols-3": size === "big",
              "grid-cols-2": size === "medium",
              "grid-cols-1": size === "small",
            })}
          >
            {options.map((option, idx) => (
              <div
                key={idx}
                className="hover:bg-gray-200 hover:text-customBlue font-medium rounded cursor-pointer px-1 py-1"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;

{
  /* <div
            onClick={() => setIsShowToggle(!isShowToggle)}
            ref={dropdownRef}
            className={clsx(
              "text-xl font-semibold",
              "border-2",
              "border-customGray",
              "rounded-3xl px-4 py-2",
              "hover:cursor-pointer",
              "flex flex-row items-center space-x-2",
              "relative"
            )}
          >
            <p>{selectedCategory}</p>
            <LuTriangle
              className={`transition-transform duration-300 ease-in-out transform ${
                isShowToggle ? "rotate-180" : ""
              }`}
              size={20}
            />
            {isShowToggle && (
              <div className="absolute top-full left-0 mt-2 w-[600px] rounded-md shadow-lg bg-white divide-y divide-gray-100">
                <div className="grid grid-cols-3 gap-2 p-2">
                  {localCategoryList.map((category, idx) => (
                    <span
                      key={idx}
                      className="hover:bg-gray-200 hover:text-customBlue font-medium rounded cursor-pointer px-1 py-1"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {orderTypeList.map(orderType => (
            <OrderTypeBtn
              key={orderType.id}
              orderType={orderType}
              selectedOrderType={selectedOrderType.typeName === orderType.typeName}
              setOrderType={setSelectedOrderType}
            />
          ))} */
}
