export const groupType = {
  normal: "택배공구",
  local: "지역공구",
  pickup: "픽업공구",
  ticket: "이용권공구",
};

export const groupState = {
  0: ["진행중"],
  1: ["진행중", "모집성공"],
  "-1": ["기간만료"],
  2: ["진행중", "결제대기중"],
  "-2": ["진행중", "결제실패"],
  3: ["결제완료", "배송중"],
  "-3": ["결제완료", "배송대기중"],
  4: ["결제완료", "배송완료"],
  "-4": ["결제완료", "교환/반품"],
};

export const returnBgColor = (state) => {
  //진행중
  if ([-2, 0, 1, 2].includes(state)) {
    return "#00c75a";
  }
  //결제완료
  else if ([-4, -3, 3, 4].includes(state)) {
    return "#ffb564";
  }
  //기간만료
  else if (state === -1) {
    return "#e8e8e8";
  }
};

export const returnFontColor = (state) => {
  if (state === -1) {
    return "#505050";
  } else {
    return "#fff";
  }
};

export const formatDate = (deadline) => {
  const dates = deadline.split(" ");
  const date = dates[0].split("-");
  const time = dates[1].substring(0, 2);

  return `${date[0]}년 ${date[1]}월 ${date[2]}일 ${time}시까지`;
};

export const formatParticipateDate = (date) => {
  const dates = date.split(" ");
  const formatDate = dates[0].split("-").join("/");

  return formatDate;
};
