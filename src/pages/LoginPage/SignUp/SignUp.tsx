import Form from "../../../components/form/Form";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useState } from "react";
import { useUserStore } from "../../../store/user/user.store";
const SignUp = () => {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");
  const {setUser} = useUserStore();
  const handleSignupAndLogin = async (email: string, password: string) => {
    try {
      
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser({
        email: userCredential.user.email??"",
        token: userCredential.user.refreshToken??"",
        id: userCredential.user.uid??"",
      });
      navigate("/");
    } catch (error) {
      return (
        error && setFirebaseError("이메일 또는 비밀번호가 잘못되었습니다.")
      );
    }
  };
  return (
    <Form
      title="가입하기"
      getDataForm={handleSignupAndLogin}
      firebaseError={firebaseError}
    ></Form>
  );
};

export default SignUp;
