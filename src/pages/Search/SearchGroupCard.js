import styled from "styled-components";

const SearchGroupCard = ({
  group
}) => {
  return (
    <CardContainer>
      <CardWrapper>
        <CardImage image={group.productInfo.images} />
        <CardContent>
          <Name>{group.groupName}</Name>
          <Price>{`${group.productInfo.price}원`}</Price>
          <DiscountRate>{`${group.productInfo.discountRate}%`}</DiscountRate>
          <SalePrice>{`${group.productInfo.salePrice}원`}</SalePrice>
          <Leftparticipants>{`${group.remainedPersonnel}개 남음`}</Leftparticipants>
          <Deadline>{`${group.deadline}까지`}</Deadline>
        </CardContent>
      </CardWrapper>
    </CardContainer>
  );
};

export default SearchGroupCard;

const CardContainer = styled.div`
  width: 100%;
  background: transparent;
  margin: 10px 0px;
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
  width: 150px;
  height: 150px;
  border-radius: 10px;
  background-image: url(${(props) => props.image});
  background-size: 150px 150px;
  @media only screen and (max-width: 400px) {
    width: 100px;
    height: 100px;
    background-size: 100px 100px;
  }
`;

const CardContent = styled.div`
  width: 75%;
  line-height: 20px;
  @media only screen and (max-width: 400px) {
    width: 65%;
    line-height: 15px;
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
  @media only screen and (max-width: 400px) {
    font-size: 10px;
  }
`;

const Deadline = styled.p`
  font-size: 13px;
  color: #969696;
  @media only screen and (max-width: 400px) {
    font-size: 10px;
  }
`;
