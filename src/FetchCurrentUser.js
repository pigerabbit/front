import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "redux/userSlice";
import * as Api from "api";

const FetchCurrentUser = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      if (!user) {
        const res = await Api.get("users/current");
        const currentUser = res.data.payload;

        dispatch(login(currentUser));
      }
    } catch {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <>{children}</>;
};

export default FetchCurrentUser;
