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
  userId,
  group,
  isOpenTab,
  setIsOpenPopUpCard,
  setCancelDataId,
  handleRemoveGroupFromMyList,
  handleDeleteGroup,
}) => {
  const navigate = useNavigate();
  const myInfo = group.participants.filter((p) => p.userId === userId);

  const handleClick = () => {
    setIsOpenPopUpCard(true);
    setCancelDataId(group.groupId);
  };

  const moveToQRCode = () => {
    navigate(`/qrcode`, {
      state: {
        data: { groupObjId: group._id },
      },
    });
  };

  return (
    <CardContainer>
      {!isOpenTab && <p>{formatParticipateDate(myInfo[0].participantDate)}</p>}
      <CardWrapper>
        <CardImageWrapper>
          <CardImage images={group.productInfo.images} />
          {groupState[group.state].length > 1 && (
            <StateMessage>
              <p>{groupState[group.state][1]}</p>
            </StateMessage>
          )}
        </CardImageWrapper>
        <CardContent>
          <Title>
            <strong>{`[${groupType[group.groupType]}] `}</strong>
            {group.groupName}
          </Title>
          <State
            bgColor={() => returnBgColor(group.state)}
            fontColor={() => returnFontColor(group.state)}
          >
            {groupState[group.state][0]}
          </State>
          {group.state === 0 && (
            <span>{`${group.remainedPersonnel}개 남음`}</span>
          )}
          {isOpenTab ? (
            <Message>{formatDate(group.deadline)}</Message>
          ) : (
            <Message>{`${myInfo[0].quantity}개 ${(
              myInfo[0].quantity * group.productInfo.salePrice
            ).toLocaleString()}원`}</Message>
          )}
        </CardContent>
      </CardWrapper>
      {group.state === 0 && (
        <CardButton bgColor="#A0A0A0" onClick={() => handleClick()}>
          {isOpenTab ? "공구 중지" : "참여 취소"}
        </CardButton>
      )}
      {group.state === 1 && group.groupType === "coupon" && (
        <CardButton bgColor="#ff9b2f" onClick={moveToQRCode}>
          QR 코드
        </CardButton>
      )}
      {group.state === 5 && myInfo[0].review === true && (
        <CardButton bgColor="#A0A0A0">후기 완료</CardButton>
      )}
      {group.state === 5 && myInfo[0].review === false && (
        <CardButton
          bgColor="#FFB564"
          onClick={() => navigate(`products/${group.productInfo.productId}`)}
        >
          후기 작성
        </CardButton>
      )}
      {isOpenTab && group.state === -1 && (
        <CardButton
          onClick={() => handleDeleteGroup(group.groupId)}
          bgColor="#A0A0A0"
        >
          공구 삭제
        </CardButton>
      )}
      {(group.state == -6 || group.state == -7) && (
        <CardButton
          onClick={() => handleRemoveGroupFromMyList(group.groupId)}
          bgColor="#A0A0A0"
        >
          공구 삭제
        </CardButton>
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
