const game_369 = (num) => {
  if (isNaN(Number(num)) || num === Infinity || num === -Infinity) {
    return "숫자가 아니거나 무한대입니다.";
  }
  const stringifyNum = num.toString();
  if (
    stringifyNum.includes("3") ||
    stringifyNum.includes("6") ||
    stringifyNum.includes("9")
  ) {
    return "박수";
  }
  return Number(num);
};

export default game_369;
