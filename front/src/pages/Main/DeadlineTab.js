import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";

import CardContainer from "./CardsContainer";
import ConfirmationIcon from "components/ConfirmationIcon";

const DeadlineTab = () => {
  const [personGroupList, setPersonGroupList] = useState([]);
  const [timeGroupList, setTimeGroupList] = useState([]);
  const [confirmationIcon, setConfirmationIcon] = useState({
    show: false,
    backgroundColor: "#70BD86;",
    color: "",
    icon: "",
    text: "",
  });
  const productDeadlineTitle = "달성 인원이 얼마 남지 않았어요!";
  const timeDeadlineTitle = "24시간 이내 마감되는 공동구매에요!";

  const getGroupPurchaseData = async () => {
    const getPersonGroupList = Api.get("groups/sort/remainedPersonnel");
    const getTimeGroupList = Api.get("groups/sort/remainedTime");

    const [personRes, timeRes] = await Promise.all([
      getPersonGroupList,
      getTimeGroupList,
    ]);

    setPersonGroupList(personRes.data.payload);
    setTimeGroupList(timeRes.data.payload);
  };

  useEffect(() => {
    getGroupPurchaseData();
  }, []);

  return (
    <Container>
      {confirmationIcon.show && <ConfirmationIcon style={confirmationIcon} />}

      <CardContainer
        title={productDeadlineTitle}
        groupPurchaseList={personGroupList}
        setConfirmationIcon={setConfirmationIcon}
      ></CardContainer>

      <CardContainer
        title={timeDeadlineTitle}
        groupPurchaseList={timeGroupList}
        setConfirmationIcon={setConfirmationIcon}
      ></CardContainer>
    </Container>
  );
};

export default DeadlineTab;

const Container = styled.div`
  padding-bottom: 100px;
`;
