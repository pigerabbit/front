import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "redux/userSlice";
import * as Api from "api";

const KakaoRedirectHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    const res = await Api.get("users/current");
    const userData = res.data.payload.resultUser;

    dispatch(login(userData));
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    sessionStorage.setItem("userToken", token);

    fetchUser();

    navigate("/");
  }, []);

  return <div>redirect page</div>;
};

export default KakaoRedirectHandler;
