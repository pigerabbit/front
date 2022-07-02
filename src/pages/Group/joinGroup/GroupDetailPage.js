import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Api from "api";

import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Heart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DetailHeader from "components/DetailHeader";
import GroupInfoTop from "./GroupInfoTop";
import CommentsArea from "./CommentsArea";
import BuyingProductWindow from "./BuyingProductWindow";
import useShowComfirmationIcon from "hooks/useShowConfirmationIcon";

const GroupDetailPage = () => {
  const { user } = useSelector((state) => state.user);
  const showConfirmationIcon = useShowComfirmationIcon();

  const [group, setGroup] = useState({});
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});
  const [wish, setWish] = useState(false);
  const [joinedGroup, setJoinedGroup] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [showBuyingProduct, setShowBuyingProduct] = useState(false);

  const groupId = useParams().id;

  const handleWish = async () => {
    try {
      await Api.put(`toggle/group/${group._id}`);

      showConfirmationIcon({
        icon: fullHeart,
        color: "#fff",
        backgroundColor: wish ? "#ababab" : "#ff6a6a",
        text: wish ? "찜 취소" : "찜",
      });

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
      setIsSeller(user.id === res.data.payload[0].productInfo.userId);

      const resWish = await Api.get("toggle/groups");
      setWish(
        resWish.data.filter((v) => v._id === res.data.payload[0]._id).length > 0
          ? true
          : false
      );

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
  }, [user]);

  return (
    <Container>
      {isFetched && (
        <>
          <DetailHeader headerTitle={group.groupName} />
          <Body state={group.state} isSeller={isSeller}>
            <GroupInfoTop group={group} product={product} seller={seller} />
            <CommentsArea
              user={user}
              group={group}
              isSeller={isSeller}
              setJoinedGroup={setJoinedGroup}
              joinedGroup={joinedGroup}
              setShowBuyingProduct={setShowBuyingProduct}
            />
          </Body>

          {showBuyingProduct && (
            <div id="buyingProductWindow">
              <BuyingProductWindow
                group={group}
                salePrice={product.salePrice}
                remainedPersonnel={group.remainedPersonnel}
                setShowBuyingProduct={setShowBuyingProduct}
              />
            </div>
          )}

          <ButtonsContainer state={group.state} isSeller={isSeller}>
            <LeftButton wish={wish} onClick={handleWish}>
              <span>
                {wish ? (
                  <FontAwesomeIcon icon={fullHeart} size="1x" />
                ) : (
                  <FontAwesomeIcon icon={Heart} size="1x" />
                )}
              </span>
              {!wish ? "찜 하기" : "찜 취소하기"}
            </LeftButton>
            {joinedGroup ? (
              <RightButton joinedGroup={joinedGroup} disabled>
                주문완료
              </RightButton>
            ) : (
              <RightButton onClick={() => setShowBuyingProduct(true)}>
                구매하기
              </RightButton>
            )}
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

  #buyingProductWindow {
    position: relative;
    z-index: 15;
  }
`;

const Body = styled.div`
  background-color: #ffffff;
  padding-bottom: ${({ state, isSeller }) =>
    state === 0 && !isSeller ? "90px" : "20px"};
`;

const ButtonsContainer = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  max-width: 770px;
  width: 100%;
  display: ${({ state, isSeller }) =>
    state === 0 && !isSeller ? "flex" : "none"};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px 0 20px 0;
  background-color: #ffffff;
  z-index: 10;
`;

const LeftButton = styled.button`
  width: 48%;
  height: 65px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  font-size: 17px;
  font-weight: bold;
  margin: 0px 10px 0 20px;
  background-color: #ffffff;
  color: #f79831;
  border: 2px solid #f79831;

  > span {
    margin-right: 5px;
  }

  &:hover {
    color: #636363;
    border-color: #636363;
  }
`;

const RightButton = styled.button`
  width: 48%;
  height: 65px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: ${({ joinedGroup }) => (joinedGroup ? "normal" : "pointer")};
  font-size: 17px;
  font-weight: bold;
  margin: 0px 20px 0 10px;
  background-color: ${({ joinedGroup }) =>
    joinedGroup ? "#636363" : "#f79831"};
  color: #ffffff;
  border: ${({ joinedGroup }) =>
    joinedGroup ? "2px solid #636363" : "2px solid #f79831"};

  &:hover {
    background-color: #636363;
    border-color: #636363;
  }
`;
