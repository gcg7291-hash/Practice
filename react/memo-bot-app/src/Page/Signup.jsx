import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signup, resetIsSignup } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isSignup = useSelector((state) => state.auth.isSignup);

  const error = useSelector((state) => state.auth.error);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(signup({ email: email, password: password }));
  }

  useEffect(() => {
    if (isSignup === true) {
      alert("회원가입을 성공했습니다. 메일함을 이용해주세요");
      dispatch(resetIsSignup);
      navigate("/home");
    }
  }, [isSignup, dispatch]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className="border-2"
          type="email"
          value={email}
          placeholder="이메일을 입력하세요"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="border-2"
          type="password"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className="border-2"
          type="password"
          value={password}
          placeholder="비밀번호 확인"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input className="border-2" type="submit" value="회원가입" />
        <Link to="/" className="border-2">
          처음으로
        </Link>
      </form>
    </div>
  );
}
