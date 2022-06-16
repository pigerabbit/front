import styled, { css } from "styled-components";

const PaymentInfo = ({ payment, setPayment }) => {
  return (
    <Container>
      <h3>결제수단</h3>
      <Content>
        <Title>
          <h3>결제수단 선택</h3>
          <p>{payment}</p>
        </Title>
        <Buttons>
          <Button
            onClick={() => setPayment("포인트 결제")}
            clicked={payment === "포인트 결제"}
          >
            포인트 결제
          </Button>
          <Button
            onClick={() => setPayment("무통장 입금")}
            clicked={payment === "무통장 입금"}
          >
            무통장 입금
          </Button>
          <Button
            onClick={() => setPayment("카드 결제")}
            clicked={payment === "카드 결제"}
          >
            카드 결제
          </Button>
          <Button
            onClick={() => setPayment("휴대폰 결제")}
            clicked={payment === "휴대폰 결제"}
          >
            휴대폰 결제
          </Button>
        </Buttons>
      </Content>
    </Container>
  );
};

export default PaymentInfo;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 25%;
  background: #fff;
  margin-top: 10px;
  padding: 3%;
  @media (max-width: 500px) {
    > h3 {
      font-size: 15px;
      margin-bottom: 2%;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
`;

const Title = styled.div`
  width: 90%;
  border: 1px solid #c4c4c4;
  border-bottom: none;
  padding: 2%;
  display: flex;
  justify-content: space-between;
  > p {
    color: #ffa849;
    font-weight: bold;
  }
`;

const Buttons = styled.div`
  width: 90%;
  border: 1px solid #c4c4c4;
  padding: 2%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  background: none;
  color: #606060;
  padding: 2%;
  ${(props) =>
    props.clicked &&
    css`
      background: #ffa849;
      color: #fff;
    `}
  font-size: 15px;
  &:hover {
    background: #ffa849;
    color: #fff;
  }
`;
