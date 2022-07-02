import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SearchProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <CardContainer>
      <CardWrapper>
        <CardImage image={product.images} />
        <CardContent>
          <Name>{product.name}</Name>
          <DescriptionWrapper>
            <Description>
              <Price>{`${product.price.toLocaleString()}원`}</Price>
              <DiscountRate>{`${product.discountRate}%`}</DiscountRate>
              <SalePrice>{`${product.salePrice.toLocaleString()}원`}</SalePrice>
            </Description>
            <InfoButton onClick={() => navigate(`/products/${product.id}`)}>
              보러가기
            </InfoButton>
          </DescriptionWrapper>
        </CardContent>
      </CardWrapper>
    </CardContainer>
  );
};

export default SearchProductCard;

const CardContainer = styled.div`
  width: 100%;
  height: 80px;
  background: #fafafa;
  margin: 10px 0;
  padding: 10px;
`;

const CardWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardImage = styled.div`
  background: #c0c0c0;
  background-image: url(${(props) => props.image});
  background-size: 70px 70px;
  width: 70px;
  height: 70px;
  border-radius: 10px;
`;
const CardContent = styled.div`
  width: 70%;
`;

const Name = styled.p`
  font-size: 15px;
`;

const DescriptionWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const Description = styled.div`
  line-height: 15px;
`;

const Price = styled.p`
  font-size: 10px;
  text-decoration: line-through;
  color: #b1b1b1;
  margin-top: 8px;
`;

const DiscountRate = styled.span`
  font-size: 13px;
  color: #ffb564;
`;

const SalePrice = styled.span`
  font-size: 13px;
  margin-left: 5px;
`;

const InfoButton = styled.button`
  height: 30px;
  background: #ffb564;
  color: #fff;
  border: none;
  border-radius: 5px;
  align-self: flex-end;
  cursor: pointer;
`;
