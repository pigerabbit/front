import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import * as Api from "api";

import {
  faUser,
  faHome,
  faHeart as fullHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductDetailTop from "./GroupInfoTop";
import CommentsArea from "./CommentsArea";

const GroupDetailPage = () => {
  const [group, setGroup] = useState({});
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [wish, setWish] = useState(false);

  const navigate = useNavigate();

  const groupId = useParams().id;

  const handleToggle = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put(`toggle/group/${group._id}`);
      console.log(res.data);
      setWish((cur) => !cur);
    } catch (e) {
      console.log("공구 찜하기 실패");
    }
  };

  const getGroupDetail = async () => {
    try {
      const res = await Api.get(`groups/groupId/${groupId}`);
      setGroup(res.data.payload[0]);
      setProduct(res.data.payload[0].productInfo);

      const resWish = await Api.get("toggle/groups");
      if (
        resWish.data.filter((v) => v._id === res.data.payload[0]._id).length > 0
      ) {
        console.log(resWish);
        setWish(true);
      } else setWish(false);

      const resUser = await Api.get(
        `users/${res.data.payload[0].productInfo.userId}`
      );
      setSeller(resUser.data.payload);

      setIsFetched(true);
    } catch (e) {
      console.log("group 못 가져옴");
    }
  };

  useEffect(() => {
    getGroupDetail();
  }, []);

  return (
    <Container>
      <Header>
        <Top>
          <GoBack onClick={() => navigate(-1)} />
          <ProductTitle>{product.name}</ProductTitle>
          <ButtonTopContainer>
            <div
              id="home"
              onClick={() => {
                navigate("/");
              }}
            >
              <FontAwesomeIcon
                icon={faHome}
                style={{ fontSize: "20px", color: "#f79831" }}
              />
            </div>
            <div
              id="user"
              onClick={() => {
                navigate("/mypage");
              }}
            >
              <FontAwesomeIcon
                icon={faUser}
                style={{ fontSize: "20px", color: "#f79831" }}
              />
            </div>
          </ButtonTopContainer>
        </Top>
      </Header>
      {isFetched && (
        <>
          <Body>
            <ProductDetailTop group={group} product={product} seller={seller} />
            <CommentsArea group={group} product={product} seller={seller} />
          </Body>

          <ButtonsContainer>
            <LeftButton wish={wish} onClick={handleToggle}>
              <p>
                <FontAwesomeIcon icon={fullHeart} size="1x" />
              </p>
              {!wish ? "찜 하기" : "찜 취소하기"}
            </LeftButton>
            <RightButton>구매하기</RightButton>
          </ButtonsContainer>
        </>
      )}
    </Container>
  );
};

export default GroupDetailPage;

const Container = styled.div`
  position: relative;
  width: 770px;
  min-width: 360px;
  min-height: 100vh;
  height: 100vh;
  background-color: #ffffff;
`;

const Header = styled.header`
  position: fixed;
  width: 100%;
  min-width: 360px;
  max-width: 770px;
  top: 0;
  z-index: 5;
  background-color: #ffffff;
`;

const Body = styled.div`
  padding-bottom: 80px;
`;

const Top = styled.div`
  width: 100%;
  background-color: #ffffff;
  height: 50px;
`;

const GoBack = styled.i`
  border: solid black;
  border-width: 0 1.5px 1.5px 0;
  display: inline-block;
  padding: 5px;
  margin: 20px 0 0 20px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  cursor: pointer;
`;

const ButtonTopContainer = styled.div`
  width: 60px;
  position: absolute;
  top: 18px;
  right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  #home,
  #user {
    cursor: pointer;
  }
`;

const ProductTitle = styled.p`
  margin-left: 10px;
  display: inline-block;
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;

  @media (max-width: 500px) {
    width: 270px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ButtonsContainer = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  max-width: 770px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px 0 10px 0;
  background-color: #ffffff;
  z-index: 5;
`;

const LeftButton = styled.div`
  width: 48%;
  height: 65px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  margin: 0px 10px 0 20px;
  background-color: #ffffff;
  color: #f79831;
  border: 2px solid #f79831;

  > p {
    margin-right: 5px;
    color: ${({ wish }) => (wish ? "#ff0000" : "#f79831")};

    &:hover {
      color: #636363;
      border-color: #636363;
    }
  }

  &:hover {
    color: #636363;
    border-color: #636363;
  }
`;

const RightButton = styled.div`
  width: 48%;
  height: 65px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  margin: 0px 20px 0 10px;
  background-color: #f79831;
  color: #ffffff;

  &:hover {
    background-color: #636363;
  }
`;
