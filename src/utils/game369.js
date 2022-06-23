const game369 = (inputNumber) => {
  const isNumber = typeof inputNumber === "number";
  const isFinite = Number.isFinite(inputNumber);
  const isPositive = inputNumber > 0;
  const isInteger = Number.isInteger(inputNumber);

  const validNumber = isNumber && isFinite && isPositive && isInteger;
  if (!validNumber) return "type이 number인 양의 정수를 입력해주세요.";

  const stringifyNumber = inputNumber.toString();
  const includes3 = stringifyNumber.includes("3");
  const includes6 = stringifyNumber.includes("6");
  const includes9 = stringifyNumber.includes("9");

  if (includes3 || includes6 || includes9) return "박수";
  else return inputNumber;
};

export default game369;
