import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    // 로그인 성공 시
    if (token) {
      console.log("로그인 상태, 토큰:", token);
      navigate("/");
    } 
    // 토큰 상태가 변경되거나 에러가 발생하면 로딩 종료
    if (token || error) {
      setIsLoading(false);
    }
  }, [token, error, navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    dispatch(login({ email: email, password: password }));
  }

  return (
    // ⭐️ 전체 컨테이너: 모바일에서 화면 높이를 꽉 채우고(min-h-screen), PC에서는 중앙에 고정됩니다.
    // bg-gray-900을 bg-slate-900으로 변경하여 더 세련된 다크톤을 사용했습니다.
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
      
      {/* ⭐️ 로그인 카드: max-w-sm으로 너비를 제한하고, PC에서는 더 큰 패딩을 사용합니다. */}
      <div className="bg-gray-800 p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700 transform transition duration-500 hover:shadow-blue-500/20">
        
        {/* 로고/헤더 */}
        <div className="text-center mb-8">
          {/* 폰트 크기 조정: sm:text-5xl로 모바일과 웹 중간 크기에서도 잘 보이게 설정 */}
          <p className="text-4xl sm:text-5xl font-extrabold text-blue-400">Memo AI</p>
          <h1 className="text-xl text-gray-300 mt-2 font-light">로그인</h1>
          
          {/* 에러 메시지 출력 */}
          {error && (
            <p className="text-red-400 text-sm mt-4 bg-gray-700 p-3 rounded-lg border border-red-500 animate-pulse">
              {/* API key 오류 필터링 로직 유지 */}
              {typeof error === "string" && (error.includes("API key") || error.includes("No API key"))
                ? "인증 시스템 연결에 실패했습니다. 다시 시도해 주세요."
                : (typeof error === "string" ? error : "로그인 또는 로그아웃 처리 중 오류가 발생했습니다.")
              }
            </p>
          )}
        </div>
        
        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 입력 필드 스타일 통일 */}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600 focus:border-blue-500"
            type="email"
            value={email}
            placeholder="이메일을 입력하세요"
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          {/* 비밀번호 입력 필드 */}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600 focus:border-blue-500"
            type="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          
          {/* ⭐️ 로그인 버튼: 로딩 상태에 따라 색상과 그림자 변경 */}
          <input
            className={`w-full text-white font-bold p-3 rounded-lg cursor-pointer transition duration-300 shadow-lg 
              ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed shadow-gray-700/50"
                : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:scale-[1.01]"
            }`}
            type="submit"
            value={isLoading ? "로그인 중..." : "로그인"}
            disabled={isLoading}
          />
        </form>
        
        {/* 링크 컨테이너 */}
        <div className="mt-8 text-center space-y-3">
          
          {/* 회원가입 링크 */}
          <p className="text-gray-400 text-sm">
            계정이 없으신가요?
            <Link
              to="/Signup"
              className="text-blue-400 font-semibold ml-1 hover:text-blue-300 transition duration-200 underline hover:no-underline"
            >
              회원가입
            </Link>
          </p>
          
          {/* 홈으로 이동하는 Link: 디자인을 버튼 형태로 유지하면서 크기 조정 */}
          <Link
            to="/"
            className="
              inline-block 
              w-full 
              px-4 py-3 
              bg-gray-700 
              text-gray-300 
              font-medium 
              rounded-lg 
              shadow-md 
              hover:bg-gray-600 
              hover:text-white
              transition duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-500
              text-sm mt-3
              hover:shadow-lg
            "
          >
            🏠 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}