import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // const navigate = useNavigate();
  const token = useSelector((state) => {
    return state.auth.token;
  });

  useEffect(() => {
    if (token) {
      alert("로그인 상태입니다.");
      console.log(token);
    }
  }, [token]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login({ email: email, password: password }));
  }

  return (
    <div>
      {" "}
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
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input className="border-2" type="submit" value="로그인" />
        <Link to="/Signup">회원가입</Link>
      </form>
    </div>
  );
}
