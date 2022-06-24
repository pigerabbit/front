const isPositiveInteger = (number) => {
  const num = Number(number);

  const isNumber = !Number.isNaN(Number(num));
  const isFinite = num !== Infinity && num !== -Infinity;
  const isPositive = num > 0;
  const isInteger = Number.isInteger(num);

  return isNumber && isFinite && isPositive && isInteger;
};

const game_369 = (num) => {
  if (!isPositiveInteger(num)) return "게임을 진행할 수 없습니다";

  if (!!String(num).match(/[369]+/g)) {
    return "박수";
  }
  return num;
};

export default game_369;
