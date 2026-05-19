import React, { useState } from "react";
import Form from "../../../components/form/Form";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { setUser } from "../../../store/user/user.slice";
import { setUserId } from "../../../store/cart/cart.slice";
import { useAppDispatch } from "../../../hooks/reduct";

const SignIn = () => {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      dispatch(
        setUser({
          email: userCredential.user.email,
          token: userCredential.user.refreshToken,
          id: userCredential.user.uid,
        }),
      );
      dispatch(setUserId(userCredential.user.uid));
      navigate("/");
    } catch (error) {
      return (
        error && setFirebaseError("이메일 또는 비밀번호가 잘못되었습니다.")
      );
    }
  };
  return (
    <Form
      title={"로그인"}
      getDataForm={handleLogin}
      firebaseError={firebaseError}
    ></Form>
  );
};

export default SignIn;
