import React, { useState } from "react";
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
  faBowlFood,
  faMugSaucer,
  faDumbbell,
  faGem,
  faHotel,
  faDog,
  faPencil,
  faHand,
  faGamepad,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

const parcelCategory = [
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

const subscribeCategory = [
  { eng: "food", kor: "음식", icon: faBowlFood },
  { eng: "cafe", kor: "카페·디저트", icon: faMugSaucer },
  { eng: "health", kor: "운동·헬스", icon: faDumbbell },
  { eng: "beauty", kor: "미용·뷰티·네일", icon: faGem },
  { eng: "stay", kor: "숙박·펜션·모텔", icon: faHotel },
  { eng: "pet", kor: "애견·반려동물", icon: faDog },
  { eng: "study", kor: "스터디·학원·교육", icon: faPencil },
  { eng: "class", kor: "공방·클래스", icon: faHand },
  { eng: "game", kor: "오락·여가·레저", icon: faGamepad },
  { eng: "culture", kor: "문화·예술", icon: faTicket },
  { eng: "other", kor: "기타", icon: faCircleExclamation },
];

const options = [
  { eng: "parcel", kor: "택배", categoryType: parcelCategory },
  { eng: "subscribe", kor: "이용권", categoryType: subscribeCategory },
];

const Category = ({ setIsOpenSideBar, setProducts, setPage }) => {
  const [option, setOption] = useState("parcel");
  const [category, setCategory] = useState(parcelCategory);

  const navigate = useNavigate();

  const handleClick = (eng) => {
    return () => {
      if (setIsOpenSideBar) {
        setIsOpenSideBar(false);
        setProducts([]);
        setPage(0);
      }
      navigate(`/products?category=${eng}`);
    };
  };

  return (
    <Container>
      <TabContainer>
        {options.map(({ eng, kor, categoryType }) => (
          <Tab
            key={eng}
            selected={eng === option}
            onClick={() => {
              setOption(eng);
              setCategory(categoryType);
            }}
          >
            {kor}
          </Tab>
        ))}
      </TabContainer>

      <CategoryContainer>
        {category.map(({ eng, kor, icon }, idx) => (
          <span key={idx} onClick={handleClick(eng)}>
            <FontAwesomeIcon icon={icon} />
            {kor}
          </span>
        ))}
      </CategoryContainer>
    </Container>
  );
};

export default Category;

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 90vh;
  box-sizing: border-box;

  font-size: 20px;
  @media (min-width: 500px) {
    font-size: 22px;
  }
  @media (min-width: 770px) {
    font-size: 24px;
  }
`;

const TabContainer = styled.div`
  top: 0;
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Tab = styled.div`
  cursor: pointer;
  color: ${({ selected }) => (selected ? "#F79831;" : "#ABABAB;")};
  border-bottom: ${({ selected }) =>
    selected ? "3px solid #F79831;" : "3px solid white;"};

  & + div {
    margin-left: 2vw;
  }
`;

const CategoryContainer = styled.div`
  width: 100%;
  height: 72vh;
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  > span {
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: #ffb564;
    }

    > svg {
      margin-right: 15px;
    }
  }
`;
