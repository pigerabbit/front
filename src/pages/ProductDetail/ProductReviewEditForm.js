import React, { useState } from "react";
import styled from "styled-components";
import * as Api from "api";

import encodeFileToBase64 from "utils/encodeFileToBase64";

const ProductReviewEditForm = ({}) => {
  return <Container>후기편집</Container>;
};

export default ProductReviewEditForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  margin: 2px auto;
  min-height: 350px;
  background-color: #ffffff;
`;
