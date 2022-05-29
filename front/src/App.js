import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./reset.css";
import styled from "styled-components";

import * as Api from "./api";
import { login } from "./redux/userSlice";

import MainPage from "./pages/Main/MainPage";
import MyPage from "pages/My/MyPage";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  const dispatch = useDispatch();

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await Api.get("user/current");
      const currentUser = res.data;

      dispatch(login(currentUser));
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }

    setIsFetchCompleted(true);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
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
