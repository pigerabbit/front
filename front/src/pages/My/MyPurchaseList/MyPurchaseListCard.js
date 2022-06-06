import styled from "styled-components";

const groupType = {
  normal: "택배공구",
  local: "지역공구",
  pickup: "픽업공구",
  ticket: "이용권공구",
};

const groupState = {
  0: ["진행중"],
  1: ["진행중", "모집성공"],
  "-1": ["기간만료"],
  2: ["진행중", "결제대기중"],
  "-2": ["진행중", "결제실패"],
  3: ["결제완료", "배송중"],
  "-3": ["결제완료", "배송대기중"],
  4: ["결제완료", "배송완료"],
  "-4": ["결제완료", "교환/반품"],
};

const MyPurchaseListCard = ({
  type,
  userId,
  state,
  title,
  remained,
  participants,
  deadline,
  isOpenTab,
  setIsOpenPopUpCard,
}) => {
  const returnBgColor = () => {
    //진행중
    if ([-2, 0, 1, 2].includes(state)) {
      return "#00c75a";
    }
    //결제완료
    else if ([-4, -3, 3, 4].includes(state)) {
      return "#ffb564";
    }
    //기간만료
    else if (state === -1) {
      return "#e8e8e8";
    }
  };

  const returnColor = () => {
    if (state === -1) {
      return "#505050";
    } else {
      return "#fff";
    }
  };

  const myInfo = participants.filter((p) => p.userId === userId);

  return (
    <CardContainer>
      {!isOpenTab && <p>{myInfo[0].participantDate}</p>}
      <CardWrapper>
        <CardImageWrapper>
          <CardImage />
          {groupState[state].length > 1 && (
            <StateMessage>
              <p>{groupState[state][1]}</p>
            </StateMessage>
          )}
        </CardImageWrapper>
        <CardContent>
          <Title>
            <strong>{`[${groupType[type]}] `}</strong>
            {title}
          </Title>
          <State bgColor={() => returnBgColor()} color={() => returnColor()}>
            {groupState[state][0]}
          </State>
          {(state === 0 || state === 2) && <span>{`${remained}명 남음`}</span>}
          {isOpenTab ? (
            <Message>{deadline}</Message>
          ) : (
            <Message>{`${myInfo[0].quantity}개`}</Message>
          )}
        </CardContent>
      </CardWrapper>
      {state === 0 && isOpenTab && (
        <CardButton bgColor="#A0A0A0" onClick={() => setIsOpenPopUpCard(true)}>
          {isOpenTab ? "공구 중지" : "참여 취소"}
        </CardButton>
      )}
      {state === 4 && myInfo[0].review === true && (
        <CardButton bgColor="#A0A0A0">후기 완료</CardButton>
      )}
      {state === 4 && myInfo[0].review === false && (
        <CardButton bgColor="#FFB564">후기 작성</CardButton>
      )}
      {isOpenTab && state === 2 && (
        <CardButton bgColor="#A0A0A0">공구 삭제</CardButton>
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

const CardImageWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 110px;
  @media only screen and (max-width: 400px) {
    width: 100px;
    height: 100px;
  }
`;

const CardImage = styled.div`
  background-image: url("./원두.jpeg");
  background-size: cover;
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;

const StateMessage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #a0a0a0;
  border-radius: 10px;
  background-color: rgba(160, 160, 160, 0.6);
  > p {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
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

const Message = styled.p`
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
  cursor: pointer;
  @media only screen and (max-width: 400px) {
    bottom: 35px;
  }
`;
