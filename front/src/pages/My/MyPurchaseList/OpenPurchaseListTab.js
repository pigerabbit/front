import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import MyPurchaseListCard from "./MyPurchaseListCard";

const options = ["전체보기", "진행중", "결제완료", "기간마감", "공구취소"];

const OpenPurchaseListTab = ({ openedData, userId }) => {
  const [option, setOption] = useState("전체보기");
  const [totalData, setTotalData] = useState(openedData);
  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopUpCard, setIsOpenPopUpCard] = useState(false);
  //공구 중지 버튼 눌렀을 때 cancelDataId에 해당 공구 id가 저장됨 - handleStopGroupClick에서 이용하면 됨
  const [cancelDataId, setCancelDataId] = useState("");

  useEffect(() => {
    setTotalData(openedData);
    if (option === "전체보기") {
      setFilteredData(totalData);
    } else if (option === "진행중") {
      const onProgress = totalData.filter((group) =>
        [-3, 0, 1, 2].includes(group.state)
      );
      setFilteredData(onProgress);
    } else if (option === "결제완료") {
      const completed = totalData.filter((group) =>
        [-5, -4, 3, 4, 5].includes(group.state)
      );
      setFilteredData(completed);
    } else if (option === "기간마감") {
      const stopped = totalData.filter((group) => group.state === -1);
      setFilteredData(stopped);
    } else if (option === "공구취소") {
      const canceled = totalData.filter((group) =>
        [-7, -6].includes(group.state)
      );
      setFilteredData(canceled);
    }
  }, [option, totalData]);

  const handleOptionClick = (option) => {
    setOption(option);
    setIsOpen(false);
  };

  const handleStopGroupClick = async () => {};
  return (
    <Container>
      <InfoWrapper>
        <p>
          총 <strong>{filteredData.length}</strong>개
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
              onClick={() => handleOptionClick(option)}
              open={isOpen ? "block" : "none"}
            >
              {option}
            </Option>
          ))}
        </SelectBoxContainer>
      </InfoWrapper>
      <PurchaseListWrapper>
        {filteredData.length !== 0 &&
          filteredData.map((group) => (
            <MyPurchaseListCard
              key={group.groupId}
              groupId={group.groupId}
              userId={userId}
              type={group.groupType}
              images={group.productInfo.images}
              state={group.state}
              title={group.groupName}
              remained={group.remainedPersonnel}
              participants={group.participants}
              deadline={group.deadline}
              isOpenTab={true}
              setIsOpenPopUpCard={setIsOpenPopUpCard}
              setCancelDataId={setCancelDataId}
            />
          ))}
        {filteredData.length === 0 && (
          <PurchaseMessage>
            <p>공구내역이 없습니다</p>
          </PurchaseMessage>
        )}
      </PurchaseListWrapper>
      {isOpenPopUpCard && (
        <PopUpCard>
          <h3>공동구매를 정말 중지하시겠습니까?</h3>
          <ButtonWrapper>
            <Button bgColor="#FFB564" onClick={() => handleStopGroupClick()}>
              공구 중지하기
            </Button>
            <Button bgColor="#D0D0D0" onClick={() => setIsOpenPopUpCard(false)}>
              닫기
            </Button>
          </ButtonWrapper>
        </PopUpCard>
      )}
    </Container>
  );
};

export default OpenPurchaseListTab;

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
  position: relative;
  justify-content: space-between;
  margin: 0 2%;
  > p {
    padding: 10px 0;
  }
`;

const SelectBoxContainer = styled.div`
  position: absolute;
  z-index: 10;
  width: 100px;
  right: 0px;
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

const PurchaseMessage = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 25%;
  > p {
    color: #c4c4c4;
    font-size: 30px;
  }
`;
