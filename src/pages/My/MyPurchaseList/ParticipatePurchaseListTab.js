import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import MyPurchaseListCard from "./MyPurchaseListCard";
import SelectBox from "components/SeletBox";
import * as Api from "api";
import { options } from "../MyPageModule";
import LoadingSpinner from "components/LoadingSpinner";

const ParticipatePurchaseListTab = ({ participatedData, userId }) => {
  const [option, setOption] = useState("전체보기");
  const [totalData, setTotalData] = useState(participatedData);
  const [filteredData, setFilteredData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopUpCard, setIsOpenPopUpCard] = useState(false);
  const [cancelDataId, setCancelDataId] = useState("");

  const handleCancelGroupClick = async () => {
    try {
      await Api.put(`groups/${cancelDataId}/participate/out`);
      const data = filteredData.filter((data) => data.groupId !== cancelDataId);
      setFilteredData(data);
      setIsOpenPopUpCard(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClosePopUpCard = () => setIsOpenPopUpCard(false);

  useEffect(() => {
    const sortedData = participatedData.sort((a, b) => {
      const myInfoA = a.participants.filter((p) => p.userId === userId);
      const myInfoB = b.participants.filter((p) => p.userId === userId);
      return (
        new Date(myInfoB[0].participantDate) -
        new Date(myInfoA[0].participantDate)
      );
    });
    setTotalData(sortedData);
    if (option === "전체보기") {
      setFilteredData(sortedData);
    } else if (option === "진행중") {
      const onProgress = totalData.filter((group) => group.state === 0);
      setFilteredData(onProgress);
    } else if (option === "모집성공") {
      const completed = totalData.filter((group) =>
        [-5, -4, 4, 5, 1].includes(group.state)
      );
      setFilteredData(completed);
    } else if (option === "사용완료") {
      const completed = totalData.filter((group) => {
        const myInfo = group.participants.filter((p) => p.userId === userId);
        return myInfo[0].payment.voucher === 0;
      });
      setFilteredData(completed);
    }
  }, [participatedData, option, totalData, userId]);

  if (!filteredData) {
    return <LoadingSpinner />;
  }

  console.log(filteredData);
  return (
    <Container>
      <Count>
        총 <strong>{filteredData.length}</strong>개
      </Count>
      <SelectBoxWrapper>
        <SelectBox
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          options={options}
          setValue={setOption}
          value={option}
        />
      </SelectBoxWrapper>
      <PurchaseListContainer>
        <PurchaseListWrapper>
          {filteredData.length !== 0 &&
            filteredData.map((group) => (
              <MyPurchaseListCard
                key={group.groupId}
                userId={userId}
                group={group}
                isOpenTab={false}
                setIsOpenPopUpCard={setIsOpenPopUpCard}
                setCancelDataId={setCancelDataId}
              />
            ))}
        </PurchaseListWrapper>
      </PurchaseListContainer>
      {filteredData.length === 0 && (
        <NoPurchaseListContainer>
          <img
            src={`${process.env.PUBLIC_URL}/images/noProduct.svg`}
            alt="no openedPurchaseList"
          />
          공구 내역이 없습니다.
        </NoPurchaseListContainer>
      )}
      {isOpenPopUpCard && (
        <PopUpCard>
          <h3>공동구매 참여를 정말 취소하시겠습니까?</h3>
          <ButtonWrapper>
            <Button bgColor="#FFB564" onClick={handleCancelGroupClick}>
              참여 취소하기
            </Button>
            <Button bgColor="#D0D0D0" onClick={handleClosePopUpCard}>
              닫기
            </Button>
          </ButtonWrapper>
        </PopUpCard>
      )}
    </Container>
  );
};

export default ParticipatePurchaseListTab;

const PopupAnimation = keyframes`
  from{
    transform: translateY(100%);
  }
  to{
    transform: none;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 100%;
  margin-top: 105px;
`;

const Count = styled.div`
  position: absolute;
  top: 80px;
  left: 20px;
`;

const SelectBoxWrapper = styled.div`
  position: absolute;
  top: 70px;
  right: 10px;
`;

const PurchaseListContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 113px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PurchaseListWrapper = styled.div`
  position: relative;
  padding-bottom: 300px;
`;

const PopUpCard = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  bottom: 0;
  height: 40%;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  animation: ${PopupAnimation} 1s ease-in-out;
  > h3 {
    margin-top: 10%;
    font-size: 30px;
    @media only screen and (max-width: 400px) {
      font-size: 20px;
      margin-top: 18%;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 5%;
  width: 100%;
`;

const Button = styled.button`
  width: 35%;
  height: 50px;
  border: none;
  color: #fff;
  cursor: pointer;
  background-color: ${(props) => props.bgColor};
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  @media only screen and (max-width: 400px) {
    height: 40px;
    font-size: 15px;
  }
`;

const NoPurchaseListContainer = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  > img {
    width: 50%;
    margin-bottom: 5%;
  }
  @media only screen and (max-width: 500px) {
    margin-top: 25%;
  }
`;
