import { useState } from "react";
import styled from "styled-components";
import { FakeParticipategroupList } from "../MyMockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const options = ["전체보기", "진행중", "결제완료"];

const ParticipatePurchaseListTab = () => {
  const [option, setOption] = useState("전체보기");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <InfoWrapper>
        <p>
          총 <strong>{FakeParticipategroupList.length}</strong>개
        </p>
        <SelectBox>
          <span>{option}</span>
          <OpenButton onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faCaretDown} />
          </OpenButton>
          {options.map((option) => (
            <Option
              key={option}
              onClick={() => setOption(option)}
              open={isOpen ? "block" : "none"}
            >
              {option}
            </Option>
          ))}
        </SelectBox>
      </InfoWrapper>
    </Container>
  );
};

export default ParticipatePurchaseListTab;

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
  align-items: center;
  margin: 0 2%;
`;

const SelectBox = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 5px 0 5px 5px;
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
