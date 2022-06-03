import styled from "styled-components";
const OpenGroupDetailInfo = ({ product, type }) => {
  return (
    <>
      <DetailInfoContainer>
        <p>공구 세부 정보</p>
      </DetailInfoContainer>
      <ConfirmButton>
        <button>확인</button>
      </ConfirmButton>
    </>
  );
};

export default OpenGroupDetailInfo;

const DetailInfoContainer = styled.div`
  width: 100%;
  height: 35%;
  border: 2px solid #f79831;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 2%;
  > p {
    font-size: 18px;
    color: #f79831;
    font-weight: bold;
  }
`;

const ConfirmButton = styled.div`
  height: 10%;
  text-align: center;
  margin-top: 5%;
  > button {
    width: 40%;
    height: 80%;
    border: none;
    background: #f79831;
    border-radius: 10px;
    font-size: 25px;
    color: #fff;
  }
`;
