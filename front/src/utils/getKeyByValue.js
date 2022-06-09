// 객체의 value에 해당하는 key를 찾는 함수

const getKeyByValue = (obj, value) => {
  return Object.keys(obj).find((key) => obj[key] === value);
};

export default getKeyByValue;
