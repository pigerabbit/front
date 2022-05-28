import styled from "styled-components";
const MyPurchaseListCard = ({
  type,
  state,
  title,
  cnt,
  price,
  participants,
  required,
  date,
  review,
}) => {
  const groupType = type == "normal" ? "택배공구" : "지역공구";
  const groupState = ["진행중", "결제완료", "기간마감"];
  const stateBGColor = ["#00c75a", "#ffb564", "#e8e8e8"];
  const stateColor = ["#fff", "#fff", "#505050"];

  return (
    <CardContainer>
      <p>{date}</p>
      <CardWrapper>
        <CardImage />
        <CardContent>
          <Title>
            <strong>{`[${groupType}] `}</strong>
            {title}
          </Title>
          <State bgColor={stateBGColor[state]} color={stateColor[state]}>
            {groupState[state]}
          </State>
          {(state === 0 || state == 2) && (
            <span>{`${participants} / ${required} 개`}</span>
          )}
          <Quantitiy>{`${cnt}개 ${price}원`}</Quantitiy>
        </CardContent>
      </CardWrapper>
      {state == 0 && <CardButton bgColor="#A0A0A0">참여 취소</CardButton>}
      {state == 1 && review == true && (
        <CardButton bgColor="#A0A0A0">후기 완료</CardButton>
      )}
      {state == 1 && review == false && (
        <CardButton bgColor="#FFB564">후기 작성</CardButton>
      )}
    </CardContainer>
  );
};

export default MyPurchaseListCard;

const CardContainer = styled.div`
  background: #fff;
  margin: 10px 0px;
  padding: 25px 20px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.06);
  position: relative;
  > p {
    font-size: 15px;
  }
`;

const CardWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
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
  width: 75%;
  line-height: 30px;
  > span {
    font-size: 14px;
  }
  @media only screen and (max-width: 400px) {
    width: 68%;
  }
`;

const Title = styled.p`
  line-height: 20px;
`;

const State = styled.div`
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  width: 70px;
  height: 25px;
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  border-radius: 5px;
  text-align: center;
  line-height: 25px;
  margin-right: 10px;
`;

const Quantitiy = styled.p`
  font-size: 13px;
  color: #5e5e5e;
  font-weight: 600;
`;

const CardButton = styled.button`
  background: ${(props) => props.bgColor};
  color: #fff;
  position: absolute;
  right: 20px;
  bottom: 40px;
  padding: 8px 10px;
  border: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  @media only screen and (max-width: 400px) {
    bottom: 35px;
  }
`;
