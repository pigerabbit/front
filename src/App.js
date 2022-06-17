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
import SelectGroupPage from "./pages/Group/selectGroup/SelectGroupPage";
import OpenGroupPage from "./pages/Group/openGroup/OpenGroupPage";
import ProductDetailPage from "./pages/ProductDetail/ProductDetailPage";
import ProductRegisterPage from "pages/My/Market/ProductRegisterPage";
import GroupDetailPage from "pages/Group/joinGroup/GroupDetailPage";
import OpenGroupPaymentPage from "pages/Group/payGroup/OpenGroupPaymentPage";
import JoinGroupPaymentPage from "pages/Group/payGroup/JoinGroupPaymentPage";
import PaymentDetailPage from "pages/Group/payGroup/PaymentDetailPage";

import ScrollToTop from "ScrollToTop";
import FetchCurrentUser from "FetchCurrentUser";
import MyWishListPage from "pages/My/MyWishList/MyWishListPage";
import MyPurchaseListPage from "pages/My/MyPurchaseList/MyPurchaseListPage";
import SearchPage from "./pages/Search/SearchPage";
import QRcode from "./components/QRcode";

function App() {
  const wrapFetchUser = (child) => {
    return <FetchCurrentUser>{child}</FetchCurrentUser>;
  };

  const mainPage = wrapFetchUser(<MainPage />);
  const productsPage = wrapFetchUser(<ProductsPage />);
  const myPage = wrapFetchUser(<MyPage />);
  const reviewsPage = wrapFetchUser(<ReviewsPage />);
  const inquiresPage = wrapFetchUser(<InquiresPage />);
  const marketPage = wrapFetchUser(<MarketPage />);
  const businessAuthPage = wrapFetchUser(<BusinessAuthPage />);
  const mywishlistPage = wrapFetchUser(<MyWishListPage />);
  const mypurchaselistPage = wrapFetchUser(<MyPurchaseListPage />);
  const searchPage = wrapFetchUser(<SearchPage />);
  const selectgrouPage = wrapFetchUser(<SelectGroupPage />);
  const opengroupPage = wrapFetchUser(<OpenGroupPage />);
  const productDetailPage = wrapFetchUser(<ProductDetailPage />);
  const productRegisterPage = wrapFetchUser(<ProductRegisterPage />);
  const groupDetailPage = wrapFetchUser(<GroupDetailPage />);
  const openpaymentPage = wrapFetchUser(<OpenGroupPaymentPage />);
  const joinpaymentPage = wrapFetchUser(<JoinGroupPaymentPage />);
  const paymentDetailPage = wrapFetchUser(<PaymentDetailPage />);

  return (
    <Router>
      <ScrollToTop />
      <Container>
        <Routes>
          <Route path="/" element={mainPage} />
          <Route path="/products" element={productsPage} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/email" element={<EmailLoginPage />} />
          <Route path="/register/user" element={<RegisterPage />} />
          <Route path="/register/product" element={productRegisterPage} />
          <Route path="/businessauth" element={businessAuthPage} />
          <Route path="/mypage" element={myPage} />
          <Route path="/mypage/reviews" element={reviewsPage} />
          <Route path="/mypage/inquires" element={inquiresPage} />
          <Route path="/markets/:id" element={marketPage} />
          <Route path="/wishlist" element={mywishlistPage} />
          <Route path="/purchaselist" element={mypurchaselistPage} />
          <Route path="/search" element={searchPage} />
          <Route path="/group/select" element={selectgrouPage} />
          <Route path="/group/open" element={opengroupPage} />
          <Route path="/products/:id" element={productDetailPage} />
          <Route path="/groups/:id" element={groupDetailPage} />
          <Route path="/group/open/pay" element={openpaymentPage} />
          <Route path="/group/join/pay" element={joinpaymentPage} />
          <Route path="/group/payment/:groupId" element={paymentDetailPage} />
          <Route path="/qrcode" element={<QRcode />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;

  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;
