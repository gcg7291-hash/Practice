import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ⭐️ 로딩 상태 추가

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error); // ⭐️ 에러 상태 가져오기

  useEffect(() => {
    if (token) {
      console.log("로그인 상태, 토큰:", token);
      navigate("/");
    }

    // ⭐️ 토큰 상태가 변경되거나 에러가 발생하면 로딩 종료
    if (token || error) {
      setIsLoading(false);
    }
  }, [token, error, navigate]); // 의존성 배열에 error 추가

  function handleSubmit(e) {
    e.preventDefault();

    if (isLoading) return; // 로딩 중 중복 클릭 방지

    setIsLoading(true); // ⭐️ 로딩 시작
    dispatch(login({ email: email, password: password }));
  }

  return (
    // 전체 컨테이너
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            {/* 로그인 카드 */}     {" "}
      <div className="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700">
                {/* 로고/헤더 */}       {" "}
        <div className="text-center mb-8">
                   {" "}
          <p className="text-4xl font-extrabold text-blue-400">Memo AI</p>     
              <h1 className="text-xl text-gray-300 mt-2">로그인</h1>
          {/* ⭐️ 에러 메시지 출력 */}           {" "}
          {error && (
            <p className="text-red-400 text-sm mt-3 bg-gray-700 p-2 rounded-md border border-red-500">
                             {" "}
              {typeof error === "string" ? error : "로그인에 실패했습니다."}   
                       {" "}
            </p>
          )}
                 {" "}
        </div>
                {/* 로그인 폼 */}       {" "}
        <form
          onSubmit={handleSubmit} // 인라인 함수 제거하고 handleSubmit 직접 연결 (더 깔끔)
          className="space-y-6"
        >
                    {/* 이메일 입력 필드 */}
                   {" "}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600"
            type="email"
            value={email}
            placeholder="이메일을 입력하세요"
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
                    {/* 비밀번호 입력 필드 */}
                   {" "}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600"
            type="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
                    {/* 로그인 버튼 */}
                   {" "}
          <input
            className={`w-full text-white font-bold p-3 rounded-lg cursor-pointer transition duration-200 
                ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                }`}
            type="submit"
            value={isLoading ? "로그인 중..." : "로그인"} // ⭐️ 로딩 상태에 따른 텍스트 변경
            disabled={isLoading} // ⭐️ 로딩 중 버튼 비활성화
          />
                 {" "}
        </form>
                {/* 링크 컨테이너 */}       {" "}
        <div className="mt-6 text-center space-y-3">
                    {/* 회원가입 링크 */}         {" "}
          <p className="text-gray-400 text-sm">
                        계정이 없으신가요?            {" "}
            <Link
              to="/Signup"
              className="text-blue-400 font-semibold ml-1 hover:text-blue-300 transition duration-200"
            >
                            회원가입            {" "}
            </Link>
                     {" "}
          </p>
                    {/* 홈으로 이동하는 Link */}         {" "}
          <Link
            to="/"
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
                        🏠 홈으로 돌아가기          {" "}
          </Link>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
}
