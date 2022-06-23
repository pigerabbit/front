export const groupTypes = {
  normal: "택배공구",
  local: "지역공구",
  coupon: "이용권공구",
};

export const groupState = {
  0: ["진행중"],
  1: ["모집성공"],
  "-1": ["기간마감", "모집실패"],
  // "-2": ["사용완료"],
  // 2: ["모집성공", "미사용"],
  "-3": ["기간마감", "기간만료"],
  4: ["모집성공", "배송중"],
  "-4": ["모집성공", "배송 대기중"],
  5: ["모집성공", "배송 완료"],
  "-5": ["모집성공", "교환/반품"],
  "-6": ["공구취소", "공구 중지됨"],
  "-7": ["공구취소", "상품 삭제됨"],
};

export const returnBgColor = (state) => () => {
  //진행중
  if (state === 0) {
    return "#00c75a";
  }
  //모집성공
  else if ([-5, -4, 4, 5, 1].includes(state)) {
    return "#ffb564";
  }
  //기간마감 & 사용완료
  else if ([-1, -3].includes(state)) {
    return "#e8e8e8";
  }
  //공구 취소
  else if ([-6, -7].includes(state)) {
    return "#FF4E4E";
  }
};

export const returnFontColor = (state) => () => {
  if ([-1, -3].includes(state)) {
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
