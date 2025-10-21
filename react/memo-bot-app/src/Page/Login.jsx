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

  const navigate = useNavigate();

  const token = useSelector((state) => {
    return state.auth.token;
  });

  useEffect(() => {
    if (token) {
      // alert("로그인 상태입니다.");
      console.log("로그인 상태, 토큰:", token);
      navigate("/");
    } else !token;
  }, [token]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login({ email: email, password: password }));
  }

  return (
    // ⭐️ 전체 컨테이너: 화면 꽉 채우기, 다크 배경, 중앙 정렬
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* ⭐️ 로그인 카드: 어두운 배경, 둥근 모서리, 그림자, 최대 너비 설정 */}
      <div className="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700">
        {/* 로고/헤더 */}
        <div className="text-center mb-8">
          <p className="text-4xl font-extrabold text-blue-400">Memo AI</p>
          <h1 className="text-xl text-gray-300 mt-2">로그인</h1>
        </div>

        {/* 로그인 폼 */}
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="space-y-6"
        >
          {/* 이메일 입력 필드 */}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 
						focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600"
            type="email"
            value={email}
            placeholder="이메일을 입력하세요"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          {/* 비밀번호 입력 필드 */}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 
						focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600"
            type="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />

          {/* 로그인 버튼 */}
          <input
            className="w-full bg-blue-600 text-white font-bold p-3 rounded-lg cursor-pointer 
						hover:bg-blue-700 transition duration-200 shadow-lg shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            type="submit"
            value="로그인"
          />
        </form>

        {/* 링크 컨테이너 */}
        <div className="mt-6 text-center space-y-3"> 
          {/* 회원가입 링크 */}
          <p className="text-gray-400 text-sm">
            계정이 없으신가요?
            <Link
              to="/Signup"
              className="text-blue-400 font-semibold ml-1 hover:text-blue-300 transition duration-200"
            >
              회원가입
            </Link>
          </p>

          {/* 홈으로 이동하는 Link (버튼 스타일) */}
          <Link
            to="/"
            // 🚀 새로운 스타일: 카드 디자인에 어울리는 보조 버튼 스타일
            className="
              inline-block 
              w-full 
              px-4 py-2 
              bg-gray-700 
              text-gray-300 
              font-semibold 
              rounded-lg 
              shadow-md 
              hover:bg-gray-600 
              hover:text-white
              transition duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-500
              text-sm mt-3
            "
          >
            🏠 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}