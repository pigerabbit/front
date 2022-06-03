import { useState } from "react";
import styled from "styled-components";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OpenGroupDetailInfo = ({ minCount, maxCount, type }) => {
  const date = new Date();

  const getFormatDate = (date) => {
    const year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    let day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return `${year}-${month}-${day}`;
  };

  const [count, setCount] = useState(minCount);
  const [address, setAddress] = useState("");
  const [dueDate, setDueDate] = useState(`${getFormatDate(date)}T00:00`);
  return (
    <>
      <DetailInfoContainer>
        <p>공구 세부 정보</p>
        <Content>
          <Line>
            <h3>공구 제목</h3>
            <input type="text" />
          </Line>
          <Line>
            <h3>공구 개수</h3>
            <CounterWrapper>
              <Counter>
                <button
                  disabled={count <= minCount}
                  onClick={() => setCount((prev) => prev - 1)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{minCount}</span>
                <button
                  disabled={count > maxCount}
                  onClick={() => setCount((prev) => prev + 1)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </Counter>
              <span>{`최대 ${maxCount}개 가능`}</span>
            </CounterWrapper>
          </Line>
          <Line>
            <h3>공구 주소</h3>
            <input type="text" />
          </Line>
          <Line>
            <h3>마감일</h3>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Line>
        </Content>
      </DetailInfoContainer>
      <ConfirmButton>
        <button>확인</button>
      </ConfirmButton>
    </>
  );
};

export default OpenGroupDetailInfo;

const DetailInfoContainer = styled.div`
  width: 100%;
  height: 35%;
  border: 2px solid #f79831;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 2%;
  > p {
    font-size: 18px;
    color: #f79831;
    font-weight: bold;
  }
`;

const Content = styled.div`
  padding: 3% 0;
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5%;
  box-sizing: border-box;
  padding: 0 5%;
  > h3 {
    width: 100px;
    display: inline-block;
    font-size: 16px;
  }
  > input {
    width: 350px;
  }
  > input[type="text"] {
    border: none;
    border-bottom: 2px solid #f79831;
  }
  @media (max-width: 500px) {
    > h3 {
      font-size: 15px;
    }
    > p {
      font-size: 13px;
    }
  }
`;

const CounterWrapper = styled.div`
  display: inline-block;
  width: 358px;
  > span {
    margin-left: 10px;
    font-size: 13px;
    color: #6c6c6c;
  }
`;

const Counter = styled.div`
  display: inline-block;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 80px;
  text-align: center;
  box-sizing: border-box;
  padding: 1%;
  > button {
    border: none;
    background: transparent;
    margin: 0 3%;
    cursor: pointer;
    color: #767676;
  }
`;

const ConfirmButton = styled.div`
  height: 10%;
  text-align: center;
  margin-top: 5%;
  > button {
    width: 40%;
    height: 80%;
    border: none;
    background: #f79831;
    border-radius: 10px;
    font-size: 25px;
    color: #fff;
  }
`;
