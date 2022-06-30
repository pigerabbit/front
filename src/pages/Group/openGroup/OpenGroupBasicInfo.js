import styled from "styled-components";

const OpenGroupBasicInfo = ({ product, type }) => {
  const { businessLocation, businessName } = product.userInfo.business[0];

  return (
    <Container>
      <Title>공구 기본 정보</Title>
      <Image image={product.images} />
      <Line>
        <h3>상품명</h3>
        <p>{`[${businessName}] ${product.name}`}</p>
      </Line>
      <Line>
        <h3>정가</h3>
        <p>{product.price}원</p>
      </Line>
      <Line>
        <h3>할인가</h3>
        <p>{product.salePrice}원</p>
      </Line>
      <Line>
        <h3>사업장 주소</h3>
        <p>{businessLocation}</p>
      </Line>
      {type === "local" && (
        <Line>
          <h3>배송비</h3>
          <p>{product.shippingFee}원</p>
        </Line>
      )}
      <Line>
        <h3>공구 개수</h3>
        <p>{product.minPurchaseQty}개</p>
      </Line>
    </Container>
  );
};

export default OpenGroupBasicInfo;

const Container = styled.div`
  box-sizing: border-box;
  margin-top: 70px;
  background-color: #fff;
  width: 100%;
  padding: 30px 5%;
  box-shadow: 0 3px 3px -3px #c7c7c7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  width: 100%;
  color: #ff9b2f;
  margin-bottom: 30px;
  font-size: 3.8vw;
  @media (min-width: 500px) {
    font-size: 20px;
  }
`;

const Image = styled.div`
  background-image: url(${(props) => props.image});
  background-size: 350px 200px;
  width: 350px;
  height: 200px;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    width: 250px;
    height: 150px;
    background-size: 250px 150px;
  }
`;

const Line = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3%;
  box-sizing: border-box;
  padding: 0 10%;
  font-size: 13px;
  > h3 {
    font-weight: 400;
    display: inline-block;
    flex: 2;
  }
  > p {
    display: inline-block;
    flex: 3;
    word-break: keep-all;
  }
`;
