import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  groupTypes,
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
}) => {
  const navigate = useNavigate();
  const myInfo = group.participants.filter((p) => p.userId === userId);

  const { groupId, state, groupType, groupName, remainedPersonnel, deadline } =
    group;
  const { id: productId, images, salePrice } = group.productInfo;
  const isVoucherRemained = myInfo[0].payment.voucher !== 0;
  const isReviewWritable =
    (groupType !== "coupon" ||
      (groupType === "coupon" && !isVoucherRemained)) &&
    (state === 1 || state === 5) &&
    !myInfo[0].review;

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

  const moveToPaymentPage = (groupId) => (e) => {
    e.stopPropagation();
    navigate(`/group/payment/${groupId}`);
  };

  const moveToGroupPage = (groupId) => () => navigate(`/groups/${groupId}`);

  return (
    <CardContainer>
      <p>{formatParticipateDate(myInfo[0].participantDate)}</p>
      <CardWrapper>
        <CardImageWrapper>
          <CardImage images={images} onClick={moveToGroupPage(groupId)} />
          {groupState[state].length > 1 && state !== 5 && (
            <StateMessage>
              <p>{groupState[state][1]}</p>
            </StateMessage>
          )}
          {state === 5 && groupType !== "coupon" && (
            <StateMessage>
              <p>{groupState[state][1]}</p>
            </StateMessage>
          )}
        </CardImageWrapper>
        <CardContent>
          <Title>
            <p onClick={moveToGroupPage(groupId)}>
              <strong>{`[${groupTypes[groupType]}] `}</strong>
              {groupName}
            </p>

            <span onClick={moveToPaymentPage(groupId)}>?????? ?????????</span>
          </Title>
          <State
            bgColor={returnBgColor(state)}
            fontColor={returnFontColor(state)}
          >
            {!isVoucherRemained ? "????????????" : groupState[group.state][0]}
          </State>
          {group.state === 0 && <span>{`${remainedPersonnel}??? ??????`}</span>}
          {isOpenTab ? (
            <Message>{formatDate(deadline)}</Message>
          ) : (
            <Message>{`${myInfo[0].quantity}??? ${(
              myInfo[0].quantity * salePrice
            ).toLocaleString()}???`}</Message>
          )}
        </CardContent>
      </CardWrapper>
      {group.state === 0 && (
        <CardButton onClick={handleClick} bgColor="#A0A0A0" cursor="pointer">
          {isOpenTab ? "?????? ??????" : "?????? ??????"}
        </CardButton>
      )}
      {(state === 1 || state === 5) && groupType === "coupon" && (
        <CardButton
          onClick={moveToQRCode}
          disabled={!isVoucherRemained}
          bgColor={!isVoucherRemained ? "#A0A0A0" : "#f79831"}
          cursor={!isVoucherRemained ? "auto" : "pointer"}
        >
          QR ??????
        </CardButton>
      )}
      {myInfo[0].review && (
        <CardButton bgColor="#A0A0A0" cursor="auto">
          ?????? ??????
        </CardButton>
      )}
      {isReviewWritable && (
        <CardButton
          onClick={() =>
            navigate(`/products/${productId}`, {
              state: {
                data: {
                  tab: "review",
                  groupId,
                },
              },
            })
          }
          bgColor="#FFB564"
          cursor="pointer"
        >
          ?????? ??????
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
  margin-right: 10px;
  @media only screen and (max-width: 450px) {
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
  cursor: pointer;
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
  @media only screen and (max-width: 450px) {
    width: 68%;
  }
`;

const Title = styled.div`
  line-height: 20px;
  padding: 1% 0;
  > p {
    display: inline-block;
    cursor: pointer;
  }
  > span {
    margin-left: 1%;
    font-size: 13px;
    font-weight: bold;
    color: #ffa849;
    cursor: pointer;
    &:hover {
      color: #ffd3a4;
    }
  }
  @media only screen and (max-width: 400px) {
    > span {
      display: block;
    }
  }
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
  cursor: ${(props) => props.cursor};
  @media only screen and (max-width: 400px) {
    bottom: 35px;
  }
`;
