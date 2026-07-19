import { Link } from "react-router-dom";
import SignIn from "./SignIn/SignIn";

const LoginPage = () => {
  return (
    <div className="page">
      <div className="form_container">
        <h1>로그인</h1>
        <p className="form_lead">이메일로 Shop에 로그인하세요.</p>
        <SignIn />
        <p className="form_switch">
          계정이 없으신가요? <Link to="/register">가입하기</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
