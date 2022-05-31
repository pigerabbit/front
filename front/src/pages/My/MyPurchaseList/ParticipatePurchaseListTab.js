import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FakeParticipategroupList } from "../MyMockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import MyPurchaseListCard from "./MyPurchaseListCard";

const options = ["전체보기", "진행중", "결제완료", "기간마감"];

const ParticipatePurchaseListTab = () => {
  const [option, setOption] = useState("전체보기");
  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopUpCard, setIsOpenPopUpCard] = useState(false);

  const handleClick = (option) => {
    setOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (option === "전체보기") {
      setFilteredData(FakeParticipategroupList);
    } else if (option === "진행중") {
      const onProgress = FakeParticipategroupList.filter(
        (group) => group.state === 0
      );
      setFilteredData(onProgress);
    } else if (option === "결제완료") {
      const completed = FakeParticipategroupList.filter(
        (group) => group.state === 1
      );
      setFilteredData(completed);
    } else if (option === "기간마감") {
      const stopped = FakeParticipategroupList.filter(
        (group) => group.state === 1
      );
      setFilteredData(stopped);
    }
  }, [option]);

  return (
    <Container>
      <InfoWrapper>
        <p>
          총 <strong>{FakeParticipategroupList.length}</strong>개
        </p>
        <SelectBoxContainer>
          <SelectBoxWrapper>
            <span>{option}</span>
            <OpenButton onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon={faCaretDown} />
            </OpenButton>
          </SelectBoxWrapper>
          {options.map((option) => (
            <Option
              key={option}
              onClick={() => handleClick(option)}
              open={isOpen ? "block" : "none"}
            >
              {option}
            </Option>
          ))}
        </SelectBoxContainer>
      </InfoWrapper>
      <PurchaseListWrapper>
        {filteredData.map((group, idx) => (
          <MyPurchaseListCard
            key={idx}
            type={group.groupType}
            state={group.state}
            title={group.title}
            cnt={group.cnt}
            price={group.price}
            participants={group?.participants}
            required={group?.requiredParticipants}
            date={group.purchaseDate}
            review={group?.review}
            isOpenTab={false}
            setIsOpenPopUpCard={setIsOpenPopUpCard}
          />
        ))}
      </PurchaseListWrapper>
      {isOpenPopUpCard && (
        <PopUpCard>
          <h3>공동구매 참여를 정말 취소하시겠습니까?</h3>
          <ButtonWrapper>
            <Button bgColor="#FFB564">참여 취소하기</Button>
            <Button bgColor="#D0D0D0" onClick={() => setIsOpenPopUpCard(false)}>
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
  margin-top: 10px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 2%;
  > p {
    padding: 10px 0;
  }
`;

const SelectBoxContainer = styled.div`
  position: absolute;
  width: 100px;
  position: relative;
  display: inline-block;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 5px 0 5px 5px;
  line-height: 25px;
  background: #fff;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  > span {
    font-weight: bold;
  }
`;

const Option = styled.div`
  display: ${(props) => props.open};
  postion: abosolute;
  cursor: pointer;
`;

const OpenButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const PurchaseListWrapper = styled.div`
  width: 100%;
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
