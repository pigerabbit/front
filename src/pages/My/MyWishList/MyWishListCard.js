import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { formatDate } from "../MyPageModule";

const MyWishListCard = ({
  id,
  title,
  images,
  price,
  salePrice,
  discountRate,
  leftParticipants,
  deadline,
  isGroup,
}) => {
  const navigate = useNavigate();

  const goToDetailPage = (isGroup, id) => () => {
    const route = isGroup ? `/groups/${id}` : `/products/${id}`;
    return navigate(route);
  };

  return (
    <CardContainer>
      <CardWrapper>
        <CardImage images={images} onClick={goToDetailPage(isGroup, id)} />
        <CardContent>
          <Name onClick={goToDetailPage(isGroup, id)}>{title}</Name>
          <Price>{`${price.toLocaleString()}원`}</Price>
          <DiscountRate>{`${discountRate}%`}</DiscountRate>
          <SalePrice>{`${salePrice.toLocaleString()}원`}</SalePrice>
          {isGroup && (
            <GroupInfo>
              <Deadline>{`${formatDate(deadline)}`}</Deadline>
              {leftParticipants > 0 ? (
                <Left>{`${leftParticipants}개 남음`}</Left>
              ) : (
                <Left>마감 완료</Left>
              )}
            </GroupInfo>
          )}
        </CardContent>
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
  background-color: #c0c0c0;
  background-image: url(${(props) => props.images});
  background-size: 150px 110px;
  width: 150px;
  height: 110px;
  border-radius: 10px;
  cursor: pointer;
  @media only screen and (max-width: 400px) {
    background-size: 100px 100px;
    width: 100px;
    height: 100px;
  }
`;

const CardContent = styled.div`
  width: 73%;
  line-height: 20px;
  @media only screen and (max-width: 400px) {
    line-height: 15px;
    width: 68%;
  }
`;
const Name = styled.p`
  font-size: 18px;
  cursor: pointer;
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

const GroupInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.p`
  font-size: 13px;
  color: #ff6a6a;
  align-self: flex-end;
  font-weight: bold;
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
