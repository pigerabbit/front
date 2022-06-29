import styled from "styled-components";

const ProductInfo = ({ image, title, price, count }) => {
  return (
    <Container>
      <h3>주문 상품</h3>
      <Content>
        <Image image={image} />
        <Info>
          <h3>{title}</h3>
          <p>{price.toLocaleString()}원</p>
          <p>
            구매수량 <span>{count}개</span>
          </p>
        </Info>
      </Content>
    </Container>
  );
};

export default ProductInfo;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 15%;
  background: #fff;
  margin-top: 10px;
  padding: 3%;
  box-shadow: 0 3px 3px -3px #c7c7c7;
  @media (max-width: 500px) {
    > h3 {
      font-size: 15px;
      margin-bottom: 2%;
    }
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3%;
`;

const Image = styled.div`
  width: 150px;
  height: 150px;
  background: #c4c4c4;
  background-image: url(${(props) => props.image});
  background-size: cover;
  border-radius: 10px;
  @media (max-width: 500px) {
    width: 100px;
    height: 100px;
    align-self: center;
  }
`;

const Info = styled.div`
  width: 70%;
  line-height: 50px;
  align-self: center;
  > h3 {
    font-size: 20px;
  }
  > p {
    > span {
      font-weight: bold;
    }
  }
  @media (max-width: 500px) {
    width: 60%;
    line-height: 30px;
    > h3,
    > p {
      font-size: 15px;
    }
  }
`;
