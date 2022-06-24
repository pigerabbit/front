const IsPositiveInteger = (num) => {
  const isNumber = typeof num === "number";
  const isFinite = Number.isFinite(num);
  const isPositive = num > 0;
  const isInteger = Number.isInteger(num);

  return isNumber && isFinite && isPositive && isInteger;
};

const game369 = (inputNumber) => {
  const isValidNumber = IsPositiveInteger(inputNumber);
  if (!isValidNumber) return null;

  const stringifyNumber = inputNumber.toString();

  const clap = stringifyNumber.split("").reduce((acc, cur) => {
    if (cur === "3" || cur === "6" || cur === "9") return acc + "짝";
    else return acc;
  }, "");

  if (clap.length > 0) return clap;
  else return inputNumber;
};

export default game369;
