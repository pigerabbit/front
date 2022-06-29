import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// import SelectBox from "components/SeletBox";
// import { options } from "../GroupModule";
import DaumPost from "components/DaumPostCode";
import GroupInput from "./GroupInput";

const OpenGroupDetailInfo = ({
  product,
  type,
  hour,
  setHour,
  setIsHourPopup,
}) => {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isDaumPostOpen, setIsDaumPostOpen] = useState(false);
  //const [hour, setHour] = useState(0);
  //const [isOpen, setIsOpen] = useState(false);

  const handleDaumPostOpen = () => setIsDaumPostOpen(true);

  const groupNameValid = groupName.length > 0;
  const locationValid = address.length > 0 && detailAddress.length > 0;
  const countValid = count > 0;
  const hourValid = hour !== "";
  const isValid =
    type === "coupon"
      ? groupNameValid && countValid && hourValid
      : groupNameValid && locationValid && countValid && hourValid;

  useEffect(() => {
    if (product && type === "coupon") {
      setAddress(product.userInfo.business[0].businessLocation);
    }
  }, [product, type]);

  return (
    <>
      <Container>
        <Title>공구 세부 정보</Title>
        <GroupInput
          title="공구 제목"
          type="text"
          value={groupName}
          setValue={setGroupName}
          valueValid={groupNameValid}
          width={70}
          check={true}
        />
        <GroupInput
          title="참여 개수"
          type="counter"
          value={count}
          setValue={setCount}
          valueValid={countValid}
          minPurchaseQty={product.minPurchaseQty}
          check={true}
        />
        {type !== "coupon" && (
          <>
            <GroupInput
              title="공구 주소"
              type="text"
              value={address}
              setValue={setAddress}
              valueValid={locationValid}
              width={70}
              handleClick={handleDaumPostOpen}
              check={true}
            />
            <GroupInput
              title=""
              type="text"
              value={detailAddress}
              setValue={setDetailAddress}
              width={70}
              check={false}
              placeHolder="상세 주소를 입력해주세요."
            />
          </>
        )}
        {isDaumPostOpen && (
          <DaumPost
            setAddress={setAddress}
            setIsDaumPostOpen={setIsDaumPostOpen}
          />
        )}
        <GroupInput
          title="공구 기간"
          type="text"
          value={hour}
          setValue={setHour}
          valueValid={hourValid}
          width={30}
          check={true}
          handleClick={() => setIsHourPopup(true)}
        />
      </Container>
      <ButtonWrapper>
        <Button
          disabled={!isValid}
          valid={isValid}
          onClick={() =>
            navigate("/group/open/pay", {
              state: {
                data: {
                  product,
                  type,
                  groupName,
                  location: `${address} ${detailAddress}`,
                  count,
                  hour,
                },
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

const Container = styled.div`
  box-sizing: border-box;
  margin-top: 10px;
  background-color: #fff;
  width: 100%;
  padding: 30px 10%;
  box-shadow: 0 3px 3px -3px #c7c7c7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  padding-bottom: 10px;
  width: 100%;
  text-align: center;
  color: #ff9b2f;
  margin-bottom: 30px;
  font-size: 3.8vw;
  @media (min-width: 500px) {
    font-size: 20px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 2%;
  margin: 3% 0;
`;

const Button = styled.button`
  width: 40%;
  padding: 2% 0;
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
