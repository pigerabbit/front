import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import * as Api from "../../api";

const KakaoRedirectHandler = () => {
  return <div>redirect page</div>;
};

export default KakaoRedirectHandler;
