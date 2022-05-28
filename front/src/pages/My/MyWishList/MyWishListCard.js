import styled from "styled-components";

const MyWishListCard = ({
  title,
  price,
  salePrice,
  discountRate,
  leftParticipants,
  deadline,
  contentPercent,
}) => {
  return (
    <CardContainer>
      <CardWrapper>
        <CardImage />
        <CardContent contentPercent={contentPercent}>
          <Name>{title}</Name>
          <Price>{`${price}원`}</Price>
          <DiscountRate>{`${discountRate}%`}</DiscountRate>
          <SalePrice>{`${salePrice}원`}</SalePrice>
          {deadline && <Deadline>{`${deadline}까지`}</Deadline>}
        </CardContent>
        {leftParticipants && (
          <Leftparticipants>{`${leftParticipants}개 남음`}</Leftparticipants>
        )}
      </CardWrapper>
    </CardContainer>
  );
};

export default MyWishListCard;

const CardContainer = styled.div`
  background: #fff;
  margin: 10px 0px;
  padding: 25px 20px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.06);
`;

const CardWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardImage = styled.div`
  background: #c0c0c0;
  width: 150px;
  height: 110px;
  border-radius: 10px;
  @media only screen and (max-width: 400px) {
    width: 100px;
    height: 100px;
  }
`;

const CardContent = styled.div`
  width: ${(props) => props.contentPercent[0]};
  line-height: 20px;
  @media only screen and (max-width: 400px) {
    line-height: 15px;
    width: ${(props) => props.contentPercent[1]};
  }
`;
const Name = styled.p`
  font-size: 18px;
  @media only screen and (max-width: 400px) {
    font-size: 15px;
  }
`;

const Price = styled.p`
  font-size: 13px;
  text-decoration: line-through;
  color: #b1b1b1;
  margin-top: 8px;
  @media only screen and (max-width: 400px) {
    font-size: 10px;
  }
`;

const DiscountRate = styled.span`
  font-size: 15px;
  color: #ffb564;
  @media only screen and (max-width: 400px) {
    font-size: 13px;
  }
`;

const SalePrice = styled.span`
  font-size: 15px;
  margin-left: 5px;
  @media only screen and (max-width: 400px) {
    font-size: 13px;
  }
`;

const Leftparticipants = styled.p`
  font-size: 13px;
  color: #ff6a6a;
  align-self: flex-end;
  padding: 20px;
  font-weight: bold;
  @media only screen and (max-width: 400px) {
    font-size: 10px;
    padding: 0 0 20px 0;
  }
`;

const Deadline = styled.p`
  font-size: 13px;
  color: #969696;
  @media only screen and (max-width: 400px) {
    font-size: 10px;
  }
`;
