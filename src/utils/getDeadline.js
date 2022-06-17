const getDeadline = (date) => {
  if (!date) return;

  return `${date.substr(0, 4)}년 ${date.substr(5, 2)}월 ${date.substr(
    8,
    2
  )}일 ${date.substr(11, 2)}시까지`;
};

export default getDeadline;
