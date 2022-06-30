import styled, { css } from "styled-components";

const AddressInfo = ({ name, contact, address, type, isComplete }) => {
  return (
    <Container isComplete={isComplete}>
      <h3>{type === "coupon" ? "이용권 정보" : "배송지 정보"}</h3>
      <Content>
        <Info>
          <h3>받는 사람</h3>
          {isComplete ? (
            <p>{name}</p>
          ) : (
            <InfoInput type="text" value={name} disabled />
          )}
        </Info>
        <Info>
          <h3>연락처</h3>
          {isComplete ? (
            <p>{contact}</p>
          ) : (
            <InfoInput type="text" value={contact} disabled />
          )}
        </Info>
        <Info>
          <h3>{type === "coupon" ? "이용권 사용지 주소" : "공구 주소"}</h3>
          {isComplete ? (
            <p>{address}</p>
          ) : (
            <InfoInput type="text" value={address} disabled />
          )}
        </Info>
      </Content>
    </Container>
  );
};

export default AddressInfo;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 25%;
  background: #fff;
  margin-top: 70px;
  padding: 3%;
  box-shadow: 0 3px 3px -3px #c7c7c7;
  ${(props) =>
    props.isComplete &&
    css`
      margin-top: 10px;
    `}
  @media (max-width: 500px) {
    > h3 {
      font-size: 15px;
      margin-bottom: 2%;
    }
  }
`;

const Content = styled.div`
  padding: 2% 2% 0% 2%;
`;

const Info = styled.div`
  > h3 {
    font-size: 15px;
    margin-bottom: 1%;
  }
  margin-bottom: 3%;
  @media (max-width: 500px) {
    > h3 {
      font-size: 13px;
    }
  }
`;

const InfoInput = styled.input`
  width: 100%;
  font-size: 15px;
  border: 1px solid #e6e6e6;
  background: #fbfbfb;
  padding: 5px;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;
