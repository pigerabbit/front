import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./reset.css";
import styled from "styled-components";

import * as Api from "./api";
import { login } from "./redux/userSlice";

import MainPage from "./pages/Main/MainPage";
import LoginPage from "pages/User/LoginPage";
import EmailLoginPage from "pages/User/EmailLoginPage";
import RegisterPage from "pages/User/RegisterPage";
import MyPage from "pages/My/MyPage/MyPage";
import MarketPage from "pages/My/Market/MarketPage";
import ReviewsPage from "pages/My/MyReviews/ReviewsPage";
import InquiresPage from "pages/My/MyInquires/InquiresPage";

import ScrollToTop from "ScrollToTop";
import FetchCurrentUser from "FetchCurrentUser";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  const wrapFetchUser = (child) => {
    return <FetchCurrentUser>{child}</FetchCurrentUser>;
  };

  const mainPage = wrapFetchUser(<MainPage />);
  const myPage = wrapFetchUser(<MyPage />);
  const reviewsPage = wrapFetchUser(<ReviewsPage />);
  const inquiresPage = wrapFetchUser(<InquiresPage />);
  const marketPage = wrapFetchUser(<MarketPage />);

  return (
    <Router>
      <ScrollToTop />
      <Container>
        <Routes>
          <Route path="/" element={mainPage} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/email" element={<EmailLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mypage" element={myPage} />
          <Route path="/mypage/reviews" element={reviewsPage} />
          <Route path="/mypage/inquires" element={inquiresPage} />
          <Route path="/markets/:id" element={marketPage} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  width = 100vw;
  min-height: 100vh;
  background-color: #F2F2F2;
  display: flex;
  justify-content: center;
`;
