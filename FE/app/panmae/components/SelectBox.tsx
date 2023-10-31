import React from "react";
interface OwnProps {
  categoryHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox: React.FC<OwnProps> = ({ categoryHandler }) => {
  const CategoryNameList = [
    "여성의류",
    "남성의류",
    "신발",
    "가방/지갑",
    "시계/쥬얼리",
    "패션 엑서서리",
    "디지털",
    "가전제품",
    "스포츠/레저",
    "차량/오토바이",
    "스타굿즈",
    "장난감",
    "예술/희귀/수집품",
    "음반/악기",
    "도서/티켓/문구",
    "뷰티/미용",
    "가구/인테러이",
    "식품",
    "유아/출산",
    "반려동물용품",
    "기타",
  ];
  return (
    <div className="w-4/5 flex">
      <label htmlFor="category" className="mr-10">
        <h1 className="text-2xl font-semibold my-3 mr-2">
          카테고리 <span className="text-red-500">*</span>
        </h1>
      </label>
      <select
        name="category"
        id="category"
        onChange={categoryHandler}
        className="w-1/5 h-12 border-2
              border-gray-300
              rounded-md
              px-4
              py-2
              mt-1
              text-gray-700
              focus:outline-none
              focus:border-sky-500
              focus:ring-2
              focus:ring-sky-200
              focus:ring-opacity-50"
      >
        {CategoryNameList.map((category, idx) => {
          return (
            <option key={idx} value={category}>
              {category}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectBox;
