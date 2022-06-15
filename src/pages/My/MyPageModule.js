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
  3: ["결제완료", "배송중"],
  "-3": ["진행중", "결제실패"],
  4: ["결제완료", "배송중"],
  "-4": ["결제완료", "배송 대기중"],
  5: ["결제완료", "배송 완료"],
  "-5": ["결제완료", "교환/반품"],
  "-6": ["공구취소", "공구 중지됨"],
  "-7": ["공구취소", "상품 삭제됨"],
};

export const returnBgColor = (state) => {
  //진행중
  if ([-3, 0, 1, 2].includes(state)) {
    return "#00c75a";
  }
  //결제완료
  else if ([-5, -4, 3, 4, 5].includes(state)) {
    return "#ffb564";
  }
  //기간만료
  else if (state === -1) {
    return "#e8e8e8";
  }
  //공구 취소
  else if ([-6, -7].includes(state)) {
    return "#FF4E4E";
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
