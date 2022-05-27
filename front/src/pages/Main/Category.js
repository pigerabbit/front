import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarrot,
  faWheatAwn,
  faFish,
  faEgg,
  faCubesStacked,
  faBottleDroplet,
  faWineGlass,
  faFaceSmile,
  faUtensils,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const Category = () => {
  return (
    <Container>
      <span>
        <FontAwesomeIcon icon={faCarrot} />
        과일·채소
      </span>
      <span>
        <FontAwesomeIcon icon={faWheatAwn} />
        견과·쌀
      </span>
      <span>
        <FontAwesomeIcon icon={faFish} />
        수산·해산·건어물·
      </span>
      <span>
        <FontAwesomeIcon icon={faEgg} />
        정육·계란
      </span>
      <span>
        <FontAwesomeIcon icon={faCubesStacked} />
        면·양념·오일
      </span>
      <span>
        <FontAwesomeIcon icon={faBottleDroplet} />
        생수·음료·우유
      </span>
      <span>
        <FontAwesomeIcon icon={faWineGlass} />
        커피·주류
      </span>
      <span>
        <FontAwesomeIcon icon={faFaceSmile} />
        생활용품·리빙
      </span>
      <span>
        <FontAwesomeIcon icon={faUtensils} />
        주방용품
      </span>
      <span>
        <FontAwesomeIcon icon={faCircleExclamation} />
        기타
      </span>
    </Container>
  );
};

export default Category;

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 90vh;
  box-sizing: border-box;
  padding: 10vh 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  @media (min-width: 500px) {
    font-size: 24px;
  }
  @media (min-width: 770px) {
    font-size: 28px;
  }

  > span {
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: #ffb564;
    }

    > svg {
      margin-right: 10px;
    }
  }
`;
