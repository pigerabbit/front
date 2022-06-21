import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterval } from "pages/Group/joinGroup/hooks";
import styled from "styled-components";

const useResultOfIntervalCalculator = (calculator, delay) => {
  const [result, setResult] = useState(calculator());
  useInterval(() => {
    const newResult = calculator();
    if (newResult !== result) setResult(newResult);
  }, delay);

  return result;
};

const SearchGroupCard = ({ group }) => {
  const navigate = useNavigate();
  const deadline = group.deadline.replace(" ", "T") + ".000Z";

  const remain = new Date(
    useResultOfIntervalCalculator(() =>
      Math.floor((new Date(deadline) - new Date()) / 1000, 10)
    ) * 1000
  );
  let [date, hours, minutes, seconds] = [
    remain.getDate() - 1,
    remain.getHours() - 18,
    `${remain.getMinutes() < 10 ? "0" : ""}${remain.getMinutes()}`,
    `${remain.getSeconds() < 10 ? "0" : ""}${remain.getSeconds()}`,
  ];

  if (hours < 0 && date > 0) {
    date -= 1;
    hours += 24;
  }

  const remainText =
    date > 0
      ? `${date}일 ${hours < 10 ? "0" : ""}${hours}:${minutes}:${seconds}`
      : `${hours < 10 ? "0" : ""}${hours}:${minutes}:${seconds}`;

  return (
    <CardContainer onClick={() => navigate(`/groups/${group.groupId}`)}>
      <CardWrapper>
        <CardImage image={group.productInfo.images} />
        <CardContent>
          <Name>{group.groupName}</Name>
          <Price>{`${group.productInfo.price}원`}</Price>
          <DiscountRate>{`${group.productInfo.discountRate}%`}</DiscountRate>
          <SalePrice>{`${group.productInfo.salePrice}원`}</SalePrice>
          <ImminentInfo>
            <Leftparticipants>{`${group.remainedPersonnel}개 남음`}</Leftparticipants>
            {remain.getFullYear() === 1970 && <Deadline>{remainText}</Deadline>}
          </ImminentInfo>
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
  cursor: pointer;
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
  line-height: 30px;
  @media only screen and (max-width: 400px) {
    width: 65%;
    line-height: 15px;
  }
`;
const Name = styled.p`
  font-size: 25px;
  font-weight: bold;
  @media only screen and (max-width: 400px) {
    font-size: 15px;
  }
`;

const Price = styled.p`
  font-size: 18px;
  text-decoration: line-through;
  color: #b1b1b1;
  margin-top: 8px;
  @media only screen and (max-width: 400px) {
    font-size: 10px;
  }
`;

const DiscountRate = styled.span`
  font-size: 20px;
  color: #ffb564;
  @media only screen and (max-width: 400px) {
    font-size: 13px;
  }
`;

const SalePrice = styled.span`
  font-size: 18px;
  margin-left: 5px;
  @media only screen and (max-width: 400px) {
    font-size: 13px;
  }
`;

const ImminentInfo = styled.div`
  display: flex;
`;

const Leftparticipants = styled.p`
  font-size: 20px;
  color: #ff6a6a;
  margin-right: 3%;
  @media only screen and (max-width: 400px) {
    font-size: 10px;
  }
`;

const Deadline = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #ff6a6a;
  @media only screen and (max-width: 400px) {
    font-size: 10px;
  }
`;
