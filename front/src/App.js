import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./reset.css";
import styled from "styled-components";

import MainPage from "./pages/Main/MainPage";
import LoginPage from "pages/User/LoginPage";
import EmailLoginPage from "pages/User/EmailLoginPage";
import RegisterPage from "pages/User/RegisterPage";
import BusinessAuthPage from "pages/User/BusinessAuthPage";
import MyPage from "pages/My/MyPage/MyPage";
import MarketPage from "pages/My/Market/MarketPage";
import ReviewsPage from "pages/My/MyReviews/ReviewsPage";
import InquiresPage from "pages/My/MyInquires/InquiresPage";
import ProductsPage from "./pages/Search/ProductsPage";

import ScrollToTop from "ScrollToTop";
import FetchCurrentUser from "FetchCurrentUser";
import MyWishListPage from "pages/My/MyWishList/MyWishListPage";
import MyPurchaseListPage from "pages/My/MyPurchaseList/MyPurchaseListPage";
import SearchPage from "./pages/Search/SearchPage";

function App() {
  const wrapFetchUser = (child) => {
    return <FetchCurrentUser>{child}</FetchCurrentUser>;
  };

  const mainPage = wrapFetchUser(<MainPage />);
  const myPage = wrapFetchUser(<MyPage />);
  const reviewsPage = wrapFetchUser(<ReviewsPage />);
  const inquiresPage = wrapFetchUser(<InquiresPage />);
  const marketPage = wrapFetchUser(<MarketPage />);
  const businessAuthPage = wrapFetchUser(<BusinessAuthPage />);
  const productPage = wrapFetchUser(<ProductsPage />);
  const mywishlistPage = wrapFetchUser(<MyWishListPage />);
  const mypurchaselistPage = wrapFetchUser(<MyPurchaseListPage />);
  const searchPage = wrapFetchUser(<SearchPage />);

  return (
    <Router>
      <ScrollToTop />
      <Container>
        <Routes>
          <Route path="/" element={mainPage} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/email" element={<EmailLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/businessauth" element={businessAuthPage} />
          <Route path="/mypage" element={myPage} />
          <Route path="/mypage/reviews" element={reviewsPage} />
          <Route path="/mypage/inquires" element={inquiresPage} />
          <Route path="/markets/:id" element={marketPage} />
          <Route path="/products" element={productPage} />
          <Route path="/wishlist" element={mywishlistPage} />
          <Route path="/purchaselist" element={mypurchaselistPage} />
          <Route path="/search" element={searchPage} />
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
