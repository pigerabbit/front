import styled from "styled-components";
import MyWishListCard from "./MyWishListCard";

const ProductWishListTab = ({ products }) => {
  return (
    <Container>
      <Count>
        총 <strong>{products.length}</strong>개
      </Count>
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
        {products.length === 0 && (
          <NoWishListContainer>
            <img
              src={`${process.env.PUBLIC_URL}/images/noWishList.svg`}
              alt="no wishlist"
            />
            찜 내역이 없습니다.
          </NoWishListContainer>
        )}
      </ProductWishListWrapper>
    </Container>
  );
};

export default ProductWishListTab;

const Container = styled.div`
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 100vh;
  margin-top: 10px;
`;

const Count = styled.p`
  margin: 2%;
`;

const ProductWishListWrapper = styled.div`
  width: 100%;
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
