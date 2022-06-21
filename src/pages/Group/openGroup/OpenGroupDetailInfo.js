import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectBox from "../../../components/SeletBox";
import { options } from "../GroupModule";

const OpenGroupDetailInfo = ({ product, type }) => {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [location, setLocation] = useState("");
  const [hour, setHour] = useState(12);
  const [isOpen, setIsOpen] = useState(false);

  const groupNameValid = groupName.length > 0;
  const locationValid = location.length > 0;
  const isValid =
    type === "coupon" ? groupNameValid : groupNameValid && locationValid;

  useEffect(() => {
    if (product && type === "coupon") {
      setLocation(product.userInfo.business[0].businessLocation);
    }
  }, [product]);

  return (
    <>
      <DetailInfoContainer>
        <p>공구 세부 정보</p>
        <Content>
          <Line>
            <h3>공구 제목</h3>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Line>
          <Line>
            <h3>참여 개수</h3>
            <CounterWrapper>
              <Counter>
                <button
                  disabled={count <= 0}
                  onClick={() => setCount((prev) => prev - 1)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{count}</span>
                <button
                  disabled={count >= product.minPurchaseQty}
                  onClick={() => setCount((prev) => prev + 1)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </Counter>
              <span>{`최대 ${product.minPurchaseQty}개 가능`}</span>
            </CounterWrapper>
          </Line>
          {type !== "coupon" && (
            <Line>
              <h3>공구 주소</h3>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Line>
          )}
          <Line>
            <h3>공구 기간</h3>
            <SelectBoxContainer>
              <SelectBox
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                options={options}
                setHour={setHour}
                hour={hour}
              />
            </SelectBoxContainer>
          </Line>
        </Content>
      </DetailInfoContainer>
      <ButtonWrapper>
        <Button
          disabled={!isValid}
          valid={isValid}
          onClick={() =>
            navigate("/group/open/pay", {
              state: {
                data: { product, type, groupName, location, count, hour },
              },
            })
          }
        >
          확인
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default OpenGroupDetailInfo;

const DetailInfoContainer = styled.div`
  width: 100%;
  height: 38%;
  border: 2px solid #f79831;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 4%;
  > p {
    font-size: 18px;
    color: #f79831;
    font-weight: bold;
  }
`;

const Content = styled.div`
  margin-top: 15px;
  padding: 3% 0;
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 5%;
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
      margin-right: 5px;
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

const ButtonWrapper = styled.div`
  height: 10%;
  text-align: center;
  margin-top: 2%;
`;

const Button = styled.button`
  width: 40%;
  height: 80%;
  border: none;
  border-radius: 10px;
  font-size: 25px;
  color: #fff;
  cursor: ${(props) => (props.valid ? "pointer" : "")};
  background-color: ${(props) => (props.valid ? "#FFB564" : "#D0D0D0")};
  @media (max-width: 500px) {
    margin-top: 6px;
    height: 70%;
    font-size: 20px;
  }
`;

const SelectBoxContainer = styled.div`
  width: 355px;
  position: relative;
`;
