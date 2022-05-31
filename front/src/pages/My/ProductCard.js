import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const ProductCard = () => {
  const [isControllerOpen, setIsControllerOpen] = useState(false);

  return (
    <Container>
      <Content>
        <Image />

        <Information>
          <Title>
            <span>[자연농장]</span>
            <span>강원도산 햇감자</span>
          </Title>
          <Price>
            <span>10000원</span>
            <div>
              <span>10%</span>
              <span>9000원</span>
            </div>
          </Price>
        </Information>

        <FontAwesomeIcon
          icon={faEllipsisVertical}
          onClick={() => {
            setIsControllerOpen(true);
          }}
        />
      </Content>

      {isControllerOpen && (
        <UpdateController>
          <ControllerButton>편집하기</ControllerButton>
          <ControllerButton>판매중지</ControllerButton>
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={() => {
              setIsControllerOpen(false);
            }}
          />
        </UpdateController>
      )}
    </Container>
  );
};

export default ProductCard;

const Container = styled.div`
  background-color: white;
  position: relative;
  margin-top: 5px;
  box-shadow: 0 3px 3px -3px #c7c7c7;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  cursor: pointer;
  position: relative;
  width: 90%;
  max-width: 550px;
  margin: 3vw 0;
  @media (min-width: 770px) {
    margin: 22px 0;
  }
  display: flex;

  > svg {
    width: 5%;
    color: #aaaaaa;
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 3vw;
    transition: color 0.4s;

    &:hover {
      color: #ffb564;
    }
  }
`;

const Image = styled.div`
  margin-right: 10px;
  width: 18vw;
  height: 18vw;
  @media (min-width: 620px) {
    width: 112px;
    height: 112px;
  }
  border-radius: 10px;
  background-image: url(${({ url }) => url});
  background-image: url("https://post-phinf.pstatic.net/MjAxODAxMDNfMTkg/MDAxNTE0OTQwOTExMzE2.xrXUnUWpJLkKxnPPKO0j5i9oIdfJgSsdg-Rl1tWzm3Eg.Wc9UVWfKdk4P-T4_qZUwFU3Rw97HWDjWAc0X-qgolmAg.JPEG/2015-05-19-10%3B53%3B24.jpg?type=w1200");
  background-size: cover;
  background-position: center;
`;

const Information = styled.div`
  box-sizing: border-box;
  padding: 5px 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 3.3vw;
  @media (min-width: 620px) {
    font-size: 21px;
  }

  > span {
    margin-bottom: 5px;
  }
`;

const Price = styled.div`
  font-size: 2.9vw;
  @media (min-width: 620px) {
    font-size: 18px;
  }

  > span {
    font-size: 2.5vw;
    text-decoration-line: line-through;
    color: #b1b1b1;
    margin-bottom: 5px;
    @media (min-width: 620px) {
      font-size: 16px;
    }
  }

  > div > span:first-child {
    color: #ffb564;
    margin-right: 5px;
  }
`;

const UpdateController = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(253, 253, 253, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    cursor: pointer;
    position: absolute;
    top: 8%;
    right: 3%;
    color: #9f9f9f;
    font-size: 3.5vw;
    @media (min-width: 770px) {
      font-size: 27px;
    }
  }
`;

const ControllerButton = styled.div`
  cursor: pointer;
  width: 30%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #949494;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  font-size: 3.2vw;
  @media (min-width: 620px) {
    font-size: 20px;
  }

  & + div {
    margin-left: 3%;
  }
`;
