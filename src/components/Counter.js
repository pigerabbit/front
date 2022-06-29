import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const Counter = ({ count, setCount, minPurchaseQty }) => {
  return (
    <CounterContainer>
      <CounterWrapper>
        <button
          disabled={count <= 0}
          onClick={() => setCount((prev) => prev - 1)}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span>{count}</span>
        <button
          disabled={count >= minPurchaseQty}
          onClick={() => setCount((prev) => prev + 1)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </CounterWrapper>
      <span>{`최대 ${minPurchaseQty}개 가능`}</span>
    </CounterContainer>
  );
};

export default Counter;

const CounterContainer = styled.div`
  display: inline-block;
  width: 358px;
  > span {
    margin-left: 10px;
    font-size: 13px;
    color: #6c6c6c;
  }
  @media (max-width: 500px) {
    width: auto;
  }
`;

const CounterWrapper = styled.div`
  display: inline-block;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 90px;
  text-align: center;
  box-sizing: border-box;
  padding: 1% 0;
  > button {
    border: none;
    background: transparent;
    margin: 0 5%;
    cursor: pointer;
    color: #767676;
  }
`;
