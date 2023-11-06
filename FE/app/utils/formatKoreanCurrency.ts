const formatKoreanCurrency = (price: number): string => {
  let formattedPrice: number = price;
  let remain: number = 0;

  if (formattedPrice >= 10000) {
    remain = formattedPrice % 10000; // 만 단위로 나눈 나머지를 저장
    formattedPrice = Math.floor(formattedPrice / 10000); // 만 단위로 나눈 값을 다시 저장
    let remainString: string = remain ? `${remain}` : "";
    let formattedString: string = remain
      ? `${formattedPrice}만 ${remainString}`
      : `${formattedPrice}만`;

    return `${formattedString}원`.trim();
  } else {
    return `${formattedPrice}원`.trim();
  }
};

export default formatKoreanCurrency;
