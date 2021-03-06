import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { groupTypes, productTypes } from "../GroupModule";

const SelectGroupTypes = ({ type, product, isChecked }) => {
  const navigate = useNavigate();
  return (
    <Container>
      {Object.entries(groupTypes).map(([key, value]) => (
        <ButtonContainer
          key={key}
          isActive={productTypes[type].includes(key) && isChecked}
          onClick={() =>
            navigate(`/group/open?type=${value[1]}`, {
              state: product,
            })
          }
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
  @media (max-width: 500px) {
    margin-top: 0;
  }
`;

const ButtonContainer = styled.button`
  display: inline-block;
  width: 80%;
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
