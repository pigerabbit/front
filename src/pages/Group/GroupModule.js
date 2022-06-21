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

export const CalShippingFee = (
  type,
  shippingFee,
  shippingFeeCon,
  price,
  totalPrice,
  minQty
) => {
  //지역 공구일 때
  if (type === "local") {
    if (price * minQty >= shippingFeeCon) {
      return 0;
    } else {
      return Math.floor(shippingFee / minQty);
    }
  } else if (type === "normal") {
    if (totalPrice >= shippingFeeCon) {
      return 0;
    } else {
      return shippingFee;
    }
  } else {
    return 0;
  }
};

export const states = {
  "-7": ["공구취소", "#FF4E4E", "#fff"],
  "-6": ["공구취소", "#FF4E4E", "#fff"],
  "-5": ["모집성공", "#FFB564", "#fff"],
  "-4": ["모집성공", "#FFB564", "#fff"],
  "-3": ["기간마감", "#E8E8E8", "#505050"],
  "-2": ["사용완료", "#E8E8E8", "#505050"],
  "-1": ["기간마감", "#E8E8E8", "#505050"],
  0: ["진행중", "#00C75A", "#fff"],
  1: ["모집성공", "#FFB564", "#fff"],
  2: ["모집성공", "#FFB564", "#fff"],
  4: ["모집성공", "#FFB564", "#fff"],
  5: ["모집성공", "#FFB564", "#fff"],
};

export const subDate = (date) => {
  return date.substring(0, 10).split("-").join(".");
};
