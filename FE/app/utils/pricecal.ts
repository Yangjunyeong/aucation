export const pricetoString = (price: number) => {
  // 1,000 단위로 숫자를 끊어줍니다.
  const formattedNumber = price.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ",");

  // 만, 억, 조 등의 단위를 설정합니다.
  const units = ["", "만", "억", "조", "경", "해"];

  // 단위 인덱스
  let unitIndex = 0;

  // 천 단위로 나누면서 단위를 증가시킵니다.
  while (price >= 10000) {
    price /= 10000;
    unitIndex++;
  }

  // 소수점 이하는 버립니다.
  price = Math.floor(price);

  // 최종 결과 문자열을 생성합니다.
  const result = price + units[unitIndex] + "원";

  return formattedNumber ? result : "0원";
};
