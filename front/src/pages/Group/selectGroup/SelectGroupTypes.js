import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

const groupTypes = {
  "지역 공구": ["동네로 보내드립니다.(동네에서 픽업)", "local"],
  "택배 공구": ["택배로 보내드립니다.(주소지로 배송)", "normal"],
  "픽업 공구": ["상품의 판매처에서 직접 픽업합니다.", "pickup"],
  "이용권 공구": ["이용권을 공동 구매하여 사용합니다.", "ticket"],
};

const productTypes = {
  normal: ["지역 공구", "택배 공구"],
  pickup: ["픽업 공구"],
  ticket: ["이용권 공구"],
};

const SelectGroupTypes = ({ type, productId }) => {
  const navigate = useNavigate();
  return (
    <Container>
      {Object.entries(groupTypes).map(([key, value]) => (
        <ButtonContainer
          key={key}
          isActive={productTypes[type].includes(key)}
          onClick={() => navigate(`/group/open/${productId}?type=${value[1]}`)}
        >
          <Title>{key}</Title>
          <Description>{value[0]}</Description>
        </ButtonContainer>
      ))}
    </Container>
  );
};

export default SelectGroupTypes;

const Container = styled.div`
  width: 100%;
  padding: 0 10%;
  margin-top: 5%;
  @media (max-width: 500px) {
    margin-top: 0;
  }
`;

const ButtonContainer = styled.button`
  display: inline-block;
  width: 38%;
  margin-right: 5%;
  background: #d9d9d9;
  color: #969696;
  pointer-events: none;
  border-radius: 10px;
  border: none;
  text-align: left;
  padding: 30px;
  margin-bottom: 30px;
  font-weight: bold;
  line-height: 40px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: 500px) {
    line-height: 20px;
    padding: 20px;
  }
  ${(props) =>
    props.isActive &&
    css`
      pointer-events: auto;
      cursor: pointer;
      background: #ffb564;
      color: #000;
    `}
`;

const Title = styled.p`
  font-size: 25px;
  @media (max-width: 500px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;
const Description = styled.p`
  font-size: 15px;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;
