import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const ProductCard = () => {
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

        <FontAwesomeIcon icon={faEllipsisVertical} />
      </Content>
    </Container>
  );
};

export default ProductCard;

const Container = styled.div`
  background-color: white;
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
