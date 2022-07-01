import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "redux/userSlice";
import * as Api from "api";

const FetchCurrentUser = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const updateUser =
    pathname === "/" ||
    pathname === "/wishlist" ||
    pathname === "/purchaselist" ||
    pathname === "/mypage";

  const fetchUser = async () => {
    if (!user || updateUser) {
      try {
        const res = await Api.get("users/current");
        const userData = res.data.payload.resultUser;

        dispatch(login(userData));
      } catch {
        navigate("/login");
      }
    }
  };

  useLayoutEffect(() => {
    fetchUser();
  }, [pathname]);

  return <>{children}</>;
};

export default FetchCurrentUser;
