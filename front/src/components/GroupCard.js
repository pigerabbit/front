import styled from "styled-components";

const GroupCard = ({
  name,
  price,
  salePrice,
  discountRate,
  leftParticipants,
  deadline,
}) => {
  return (
    <CardContainer>
      <CardWrapper>
        <CardImage />
        <CardContent>
          <Name>{name}</Name>
          <Price>{`${price}원`}</Price>
          <DiscountRate>{`${discountRate}%`}</DiscountRate>
          <SalePrice>{`${salePrice}원`}</SalePrice>
          <Leftparticipants>{`${leftParticipants}개 남음`}</Leftparticipants>
          <Deadline>{`${deadline}까지`}</Deadline>
        </CardContent>
      </CardWrapper>
    </CardContainer>
  );
};

export default GroupCard;

const CardContainer = styled.div`
  width: 100%;
  height: 80px;
  background: transparent;
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
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const CardContent = styled.div`
  width: 70%;
  line-height: 15px;
`;
const Name = styled.p`
  font-size: 15px;
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

const Leftparticipants = styled.p`
  font-size: 10px;
  color: #ff6a6a;
`;

const Deadline = styled.p`
  font-size: 10px;
  color: #969696;
`;
