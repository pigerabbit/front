import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SelectBox = ({ setIsOpen, isOpen, options, setHour, hour }) => {
  const handleClick = (option) => {
    setHour(option);
    setIsOpen(false);
  };
  return (
    <SelectBoxContainer>
      <SelectBoxWrapper>
        <span>{`${hour}시간`}</span>
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
          {`${option} 시간`}
        </Option>
      ))}
    </SelectBoxContainer>
  );
};

export default SelectBox;

const SelectBoxContainer = styled.div`
  position: absolute;
  z-index: 10;
  top: -15px;
  display: inline-block;
  width: 100px;
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
