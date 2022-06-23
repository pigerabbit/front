const game369 = (value) => {
  const numberedValue = Number(value);

  if (isNaN(numberedValue)) {
    throw new Error("value는 숫자여야 합니다.");
  }

  if (numberedValue === Infinity || numberedValue === -Infinity) {
    throw new Error("value는 유한한 숫자여야 합니다.");
  }

  if (numberedValue <= 0) {
    throw new Error("value는 0보다 큰 숫자여야 합니다.");
  }

  if (!Number.isInteger(numberedValue)) {
    throw new Error("value는 정수여야 합니다.");
  }

  const stringifiedValue = String(value);
  if (
    stringifiedValue.includes("3") ||
    stringifiedValue.includes("6") ||
    stringifiedValue.includes("9")
  ) {
    return "박수";
  }

  return numberedValue;
};

export default game369;
