import styled from "styled-components";
import Counter from "components/Counter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const GroupInput = ({
  title,
  type,
  value,
  setValue,
  valueValid,
  minPurchaseQty,
  width,
  check,
  handleClick,
  placeHolder,
}) => {
  return (
    <InputContainer onClick={handleClick}>
      <Title>{title}</Title>
      {type !== "counter" ? (
        <Input
          width={width}
          type={type}
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeHolder}
        />
      ) : (
        <Counter
          count={value}
          setCount={setValue}
          minPurchaseQty={minPurchaseQty}
        />
      )}

      {check && (
        <CheckIcon valid={valueValid} width={width}>
          <FontAwesomeIcon icon={faCircleCheck} />
        </CheckIcon>
      )}
    </InputContainer>
  );
};

export default GroupInput;

const InputContainer = styled.div`
  position: relative;
  width: 85%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  height: 7vw;
  max-height: 35px;
  font-size: 3vw;
  @media (min-width: 500px) {
    font-size: 15px;
  }
`;

const Title = styled.div`
  width: 29%;
  height: 7vw;
  max-height: 35px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Input = styled.input`
  padding: 5px;
  width: ${({ width }) => width + "%;"};
  background-color: #fbfbfb;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  font-size: 2.5vw;
  @media (min-width: 500px) {
    font-size: 13px;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

const CheckIcon = styled.div`
  position: absolute;
  left: -22px;
  top: 1.6vw;
  @media (min-width: 500px) {
    top: 9px;
  }

  color: ${({ valid }) => {
    if (valid === "again") return "#FF6A6A;";
    else if (valid) return "#70BD86;";
    else return "#E9E9E9;";
  }};
  transition: color 0.4s;
`;
