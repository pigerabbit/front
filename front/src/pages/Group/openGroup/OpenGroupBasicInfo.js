import styled from "styled-components";

const OpenGroupBasicInfo = ({ product, type }) => {
  return (
    <Container>
      <p>공구 기본 정보</p>
      <Wrapper>
        <Image image={product.images} />
        <Content>
          <Line>
            <h3>상품명</h3>
            <p>{product.name}</p>
          </Line>
          <Line>
            <h3>정가</h3>
            <p>{product.price}원</p>
          </Line>
          <Line>
            <h3>할인가</h3>
            <p>{product.salePrice}원</p>
          </Line>
          {/* <Line>
                <h3>이름</h3>
                <p>{}</p>
            </Line> */}
          {/* <Line>
            <h3>사업자명</h3>
            <p>{product.businessName}</p>
          </Line> */}
          {/* <Line>
                <h3>사업장 주소</h3>
                <p>{}</p>
            </Line> */}
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
        </Content>
      </Wrapper>
    </Container>
  );
};

export default OpenGroupBasicInfo;

const Container = styled.div`
  width: 100%;
  height: 40%;
  border: 2px solid #f79831;
  margin-bottom: 3%;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 4% 0% 4% 4%;
  > p {
    font-size: 18px;
    color: #f79831;
    font-weight: bold;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 3%;
  @media (max-width: 500px) {
    margin-top: 30px;
  }
`;

const Image = styled.div`
  background-image: url(${(props) => props.image});
  background-size: 200px 200px;
  width: 200px;
  height: 200px;
  @media (max-width: 500px) {
    width: 150px;
    height: 150px;
    background-size: 150px 150px;
  }
`;

const Content = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7%;
  box-sizing: border-box;
  padding: 0 10%;
  > h3 {
    width: 200px;
    display: inline-block;
    font-size: 18px;
  }
  > p {
    width: 150px;
    display: inline-block;
  }
  @media (max-width: 500px) {
    > h3 {
      width: 140px;
      font-size: 15px;
    }
    > p {
      font-size: 13px;
    }
  }
`;
