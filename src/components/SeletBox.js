import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SelectBox = ({ setIsOpen, isOpen, options, setValue, value, isHour }) => {
  const handleClick = (option) => () => {
    setValue(option);
    setIsOpen(false);
  };
  return (
    <SelectBoxContainer isHour={isHour}>
      <SelectBoxWrapper>
        <span>{isHour ? `${value}시간` : value}</span>
        <OpenButton onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faCaretDown} />
        </OpenButton>
      </SelectBoxWrapper>
      {options.map((option) => (
        <Option
          key={option}
          onClick={handleClick(option)}
          open={isOpen ? "block" : "none"}
        >
          {isHour ? `${option}시간` : option}
        </Option>
      ))}
    </SelectBoxContainer>
  );
};

export default SelectBox;

const SelectBoxContainer = styled.div`
  position: absolute;
  z-index: 10;
  display: inline-block;
  width: 100px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 5px 0 5px 5px;
  line-height: 25px;
  background: #fff;
  ${(props) =>
    props.isHour
      ? css`
          top: -15px;
        `
      : css`
          right: 0px;
        `}
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
