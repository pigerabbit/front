import { useLocation, useNavigate } from "react-router-dom";

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  sessionStorage.setItem("userToken", token);
  navigate("/");

  return <div>redirect page</div>;
};

export default KakaoRedirectHandler;
