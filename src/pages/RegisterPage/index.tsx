import { Link } from "react-router-dom";
import SignUp from "../LoginPage/SignUp/SignUp";

const RegisterPage = () => {
  return (
    <div className="page">
      <div className="form_container">
        <h1>회원가입</h1>
        <p className="form_lead">계정을 만들고 주문을 관리하세요.</p>
        <SignUp />
        <p className="form_switch">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
