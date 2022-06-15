import styled from "styled-components";

const PaymentInfo = () => {
  return (
    <Container>
      <h3>결제수단</h3>
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
