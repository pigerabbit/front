import styled from "styled-components";

const PriceInfo = ({ price, totalPrice, shippingPrice }) => {
  return (
    <Container>
      <h3>최종 결제금액</h3>
      <Content>
        <Info>
          <p>개당 상품 금액</p>
          <p>{price.toLocaleString()}원</p>
        </Info>
        <Info>
          <p>총 상품 금액</p>
          <p>{totalPrice.toLocaleString()}원</p>
        </Info>
        <Info>
          <p>배송비</p>
          <p>{shippingPrice.toLocaleString()}원</p>
        </Info>
        <Info>
          <h3>최종 결제금액</h3>
          <h3>{(totalPrice + shippingPrice).toLocaleString()}원</h3>
        </Info>
      </Content>
    </Container>
  );
};

export default PriceInfo;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 15%;
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
  padding: 3% 3% 0% 3%;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  > h3 {
    color: #f79831;
  }
`;
