import styled from "styled-components";
import MyWishListCard from "./MyWishListCard";

const ProductWishListTab = ({ products }) => {
  return (
    <Container>
      <CountWrapper>
        <Count>
          총 <strong>{products.length}</strong>개
        </Count>
      </CountWrapper>
      <ProductWishListContainer>
        <ProductWishListWrapper>
          {products.map((product) => (
            <MyWishListCard
              key={product.id}
              id={product.id}
              images={product.images}
              title={product.name}
              price={product.price}
              salePrice={product.salePrice}
              discountRate={product.discountRate}
            />
          ))}
        </ProductWishListWrapper>
      </ProductWishListContainer>
      {products.length === 0 && (
        <NoWishListContainer>
          <img
            src={`${process.env.PUBLIC_URL}/images/noWishList.svg`}
            alt="no wishlist"
          />
          찜 내역이 없습니다.
        </NoWishListContainer>
      )}
    </Container>
  );
};

export default ProductWishListTab;

const Container = styled.div`
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 100%;
  margin-top: 30px;
`;

const CountWrapper = styled.div`
  position: absolute;
  top: 70px;
  padding: 1% 2%;
`;

const Count = styled.p`
  margin: 2%;
  width: 100%;
`;

const ProductWishListContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 100px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductWishListWrapper = styled.div`
  position: relative;
  padding-bottom: 300px;
`;

const NoWishListContainer = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  > img {
    width: 50%;
    margin-bottom: 5%;
  }
  @media only screen and (max-width: 500px) {
    margin-top: 30%;
  }
`;
