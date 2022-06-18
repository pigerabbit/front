import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  groupType,
  groupState,
  returnBgColor,
  returnFontColor,
  formatDate,
  formatParticipateDate,
} from "../MyPageModule";

const MyPurchaseListCard = ({
  type,
  images,
  objId,
  groupId,
  productId,
  userId,
  state,
  title,
  price,
  remained,
  participants,
  deadline,
  isOpenTab,
  setIsOpenPopUpCard,
  setCancelDataId,
}) => {
  const navigate = useNavigate();
  const myInfo = participants.filter((p) => p.userId === userId);

  const handleClick = () => {
    setIsOpenPopUpCard(true);
    setCancelDataId(groupId);
  };

  const moveToQRCode = () => {
    navigate(`/qrcode`, {
      state: {
        data: { groupObjId: objId },
      },
    });
  };

  return (
    <CardContainer>
      {!isOpenTab && <p>{formatParticipateDate(myInfo[0].participantDate)}</p>}
      <CardWrapper>
        <CardImageWrapper>
          <CardImage images={images} />
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
          <State
            bgColor={() => returnBgColor(state)}
            fontColor={() => returnFontColor(state)}
          >
            {groupState[state][0]}
          </State>
          {state === 0 && <span>{`${remained}개 남음`}</span>}
          {isOpenTab ? (
            <Message>{formatDate(deadline)}</Message>
          ) : (
            <Message>{`${myInfo[0].quantity}개 ${(
              myInfo[0].quantity * price
            ).toLocaleString()}원`}</Message>
          )}
        </CardContent>
      </CardWrapper>
      {state === 0 && (
        <CardButton bgColor="#A0A0A0" onClick={() => handleClick()}>
          {isOpenTab ? "공구 중지" : "참여 취소"}
        </CardButton>
      )}
      {state === 1 && type === "coupon" && (
        <CardButton bgColor="#ff9b2f" onClick={moveToQRCode}>
          QR 코드
        </CardButton>
      )}
      {state === 5 && myInfo[0].review === true && (
        <CardButton bgColor="#A0A0A0">후기 완료</CardButton>
      )}
      {state === 5 && myInfo[0].review === false && (
        <CardButton
          bgColor="#FFB564"
          onClick={() => navigate(`products/${productId}`)}
        >
          후기 작성
        </CardButton>
      )}
      {isOpenTab && state === -1 && (
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
  background-color: #c4c4c4;
  background-image: url(${(props) => props.images});
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
  color: ${(props) => props.fontColor};
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
