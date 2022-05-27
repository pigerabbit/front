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

import { useNavigate } from "react-router-dom";

const Category = () => {
  const category = [
    { eng: "fruitVegetable", kor: "과일·채소", icon: faCarrot },
    { eng: "cereal", kor: "견과·쌀", icon: faWheatAwn },
    { eng: "seafood", kor: "수산·해산·건어물", icon: faFish },
    { eng: "meatEgg", kor: "정육·달걀", icon: faEgg },
    { eng: "noddleSpice", kor: "면·양념·오일", icon: faCubesStacked },
    { eng: "drink", kor: "생수·음료·우유", icon: faBottleDroplet },
    { eng: "coffeeAlcohol", kor: "커피·주류", icon: faWineGlass },
    { eng: "living", kor: "생활용품·리빙", icon: faFaceSmile },
    { eng: "kitchen", kor: "주방용품", icon: faUtensils },
    { eng: "other", kor: "기타", icon: faCircleExclamation },
  ];

  const navigate = useNavigate();

  return (
    <Container>
      {category.map(({ eng, kor, icon }, idx) => (
        <span
          key={idx}
          onClick={() => {
            navigate(`/products?category=${eng}`);
          }}
        >
          <FontAwesomeIcon icon={icon} />
          {kor}
        </span>
      ))}
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
