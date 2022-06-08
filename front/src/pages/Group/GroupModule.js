export const formatDate = (hour) => {
  const date = new Date();
  date.setHours(date.getHours() + hour);
  const dueDate = `${date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })} `
    .split(". ")
    .join("-")
    .slice(0, -1);
  const dueTime = date.toLocaleTimeString("ko-KR", {
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return `${dueDate} ${dueTime}`;
};

export const options = [12, 24, 36, 48, 60, 72];

export const headerTitle = {
  local: "지역 공구",
  normal: "택배 공구",
  coupon: "이용권 공구",
};

export const groupTypes = {
  "지역 공구": ["동네로 보내드립니다.(동네에서 픽업)", "local"],
  "택배 공구": ["택배로 보내드립니다.(주소지로 배송)", "normal"],
  "이용권 공구": ["이용권을 공동 구매하여 사용합니다.", "coupon"],
};

export const productTypes = {
  post: ["지역 공구", "택배 공구"],
  coupon: ["이용권 공구"],
};
